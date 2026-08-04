"""
PDF Report generation service.

Generate an executive PDF report for the AI Data Insights Platform.
"""

from io import BytesIO
from datetime import datetime
from reportlab.lib.pagesizes import A4

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

# Styles
styles = getSampleStyleSheet()

title_style = styles["Heading1"]
title_style.alignment = TA_CENTER
title_style.spaceAfter = 20

heading_style = styles["Heading2"]
heading_style.spaceBefore = 14
heading_style.spaceAfter = 8

normal_style = styles["BodyText"]
normal_style.leading = 18

# Helper Functions
def add_title(story):
    """
    Add report title and generated time.
    """

    story.append(
        Paragraph(
            "AI Data Insights Platform",
            title_style,
        )
    )

    story.append(
        Paragraph(
            "<b>Executive Report</b>",
            heading_style,
        )
    )

    generated_time = datetime.now().strftime(
        "%d %B %Y %H:%M"
    )

    story.append(
        Paragraph(
            f"Generated: {generated_time}",
            normal_style,
        )
    )

    story.append(Spacer(1, 0.35 * inch))

def add_question(story, question):
    """
    Add user question.
    """

    story.append(
        Paragraph(
            "<b>Business Question</b>",
            heading_style,
        )
    )

    story.append(
        Paragraph(
            question,
            normal_style,
        )
    )

    story.append(Spacer(1, 0.25 * inch))

def add_sql(story, sql):
    """
    Add generated SQL.
    """

    story.append(
        Paragraph(
            "<b>Generated SQL</b>",
            heading_style,
        )
    )

    story.append(
        Paragraph(
            f"<font face='Courier'>{sql}</font>",
            normal_style,
        )
    )

    story.append(Spacer(1, 0.25 * inch))

# AI Summary
def add_summary(story, analysis):
    """
    Add AI-generated executive summary.
    """

    story.append(
        Paragraph(
            "<b>Executive Summary</b>",
            heading_style,
        )
    )

    summary = analysis.get("summary", "")

    if summary:
        story.append(
            Paragraph(
                summary,
                normal_style,
            )
        )
    else:
        story.append(
            Paragraph(
                "No executive summary available.",
                normal_style,
            )
        )

    story.append(Spacer(1, 0.2 * inch))

# Key Findings
def add_key_findings(story, analysis):
    """
    Add AI key findings.
    """

    story.append(
        Paragraph(
            "<b>Key Findings</b>",
            heading_style,
        )
    )

    findings = analysis.get("key_findings", [])

    if not findings:
        story.append(
            Paragraph(
                "No key findings available.",
                normal_style,
            )
        )
    else:
        for finding in findings:
            story.append(
                Paragraph(
                    f"• {finding}",
                    normal_style,
                )
            )

    story.append(Spacer(1, 0.2 * inch))

# Business Insight
def add_business_insight(story, analysis):
    """
    Add AI business insight.
    """

    story.append(
        Paragraph(
            "<b>Business Insight</b>",
            heading_style,
        )
    )

    insight = analysis.get(
        "business_insight",
        "",
    )

    if insight:
        story.append(
            Paragraph(
                insight,
                normal_style,
            )
        )
    else:
        story.append(
            Paragraph(
                "No business insight available.",
                normal_style,
            )
        )

    story.append(Spacer(1, 0.3 * inch))

# Results Table
def add_results_table(story, results):
    """
    Add SQL query results as a table.
    """

    story.append(
        Paragraph(
            "<b>Query Results</b>",
            heading_style,
        )
    )

    if not results:
        story.append(
            Paragraph(
                "No query results available.",
                normal_style,
            )
        )

        story.append(
            Spacer(
                1,
                0.25 * inch,
            )
        )

        return

    headers = list(results[0].keys())
    table_data = [headers]

    for row in results:

        values = []

        for value in row.values():

            if isinstance(value, float):
                values.append(
                    f"{value:.2f}"
                )
            else:
                values.append(
                    str(value)
                )

        table_data.append(values)

    table = Table(table_data)

    table.setStyle(
        TableStyle(
            [

                (
                    "BACKGROUND",
                    (0, 0),
                    (-1, 0),
                    colors.HexColor("#2563EB"),
                ),

                (
                    "TEXTCOLOR",
                    (0, 0),
                    (-1, 0),
                    colors.white,
                ),

                (
                    "FONTNAME",
                    (0, 0),
                    (-1, 0),
                    "Helvetica-Bold",
                ),

                (
                    "ALIGN",
                    (0, 0),
                    (-1, -1),
                    "CENTER",
                ),

                (
                    "GRID",
                    (0, 0),
                    (-1, -1),
                    0.5,
                    colors.grey,
                ),

                (
                    "BACKGROUND",
                    (0, 1),
                    (-1, -1),
                    colors.whitesmoke,
                ),

                (
                    "BOTTOMPADDING",
                    (0, 0),
                    (-1, 0),
                    10,
                ),

                (
                    "TOPPADDING",
                    (0, 1),
                    (-1, -1),
                    8,
                ),

            ]
        )
    )

    story.append(table)

    story.append(
        Spacer(
            1,
            0.3 * inch,
        )
    )

# Generate Executive Report
def generate_report(
    question,
    sql,
    results,
    analysis,
):
    """
    Generate an executive PDF report.

    Parameters
    ----------
    question : str

    sql : str

    results : list

    analysis : dict

    Returns
    -------
    BytesIO
    """
    buffer = BytesIO()
    document = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=0.6 * inch,
        leftMargin=0.6 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch,
    )

    story = []
    # Cover
    add_title(story)

    # Question
    add_question(
        story,
        question,
    )

    # SQL
    add_sql(
        story,
        sql,
    )

    # AI Summary
    add_summary(
        story,
        analysis,
    )

    # Key Findings
    add_key_findings(
        story,
        analysis,
    )

    # Business Insight
    add_business_insight(
        story,
        analysis,
    )

    # Results Table
    add_results_table(
        story,
        results,
    )

    # Footer
    story.append(
        Spacer(
            1,
            0.5 * inch,
        )
    )

    story.append(
        Paragraph(
            "<font color='#64748B'>"
            "Generated automatically by "
            "<b>AI Data Insights Platform</b>."
            "</font>",
            normal_style,
        )
    )

    # Build PDF
    document.build(story)
    buffer.seek(0)
    return buffer