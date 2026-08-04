"""
OpenAI service for AI-powered data analysis.
"""

import json
import os

from dotenv import load_dotenv
from openai import OpenAI

# Load Environment Variables
load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

# Generate AI Analysis
def generate_ai_analysis(question, sql, results):

    # Available Columns
    available_columns = []

    if (
        results
        and isinstance(results, list)
        and len(results) > 0
        and isinstance(results[0], dict)
    ):
        available_columns = list(results[0].keys())

    prompt = f"""
You are an experienced Senior Data Analyst.

The user asked:

{question}

Generated SQL:

{sql}

Query Results:

{results}

Available Columns:

{available_columns}

Return ONLY valid JSON.

The JSON format MUST be:

{{
    "summary":"",

    "key_findings":[
        "...",
        "..."
    ],

    "business_insight":"",

    "recommended_chart_type":"bar",

    "recommended_chart_reason":"",

    "x_axis":"",

    "y_axis":"",

    "chart_insight":{{
        "trend":"",

        "possible_reason":"",

        "business_recommendation":""
    }}
}}

Rules:

- Return ONLY valid JSON.
- Do NOT wrap the response in markdown.
- Do NOT include ```json.
- Base every statement ONLY on Query Results.
- Do NOT invent facts.

Choose ONE chart type ONLY:

bar
line
pie
scatter
map

The values of x_axis and y_axis MUST be selected ONLY from Available Columns.

Preserve column names EXACTLY.

Do NOT rename columns.

The chart_insight section should:

1. Describe the main trend shown in the chart.

2. Explain ONE likely business reason.

3. Give ONE practical business recommendation.

Each field should contain only one or two concise sentences.

Example:

Available Columns:

["season","avg_demand_gwh"]

Correct:

"x_axis":"season"

"y_axis":"avg_demand_gwh"

Incorrect:

"x_axis":"Season"

"y_axis":"Average Demand"

Keep the response concise, professional and business-oriented.
"""
    try:

        response = client.responses.create(
            model="gpt-4.1-mini",
            input=prompt,
            temperature=0.2,
        )

        content = response.output_text.strip()
        analysis = json.loads(content)

        # Default Fields
        analysis.setdefault("summary", "")
        analysis.setdefault("key_findings", [])
        analysis.setdefault("business_insight", "")
        analysis.setdefault("recommended_chart_type", "")
        analysis.setdefault("recommended_chart_reason", "")
        analysis.setdefault("x_axis", "")
        analysis.setdefault("y_axis", "")
        analysis.setdefault(
            "chart_insight",
            {
                "trend": "",
                "possible_reason": "",
                "business_recommendation": "",
            },
        )

        # Validate Axis
        if available_columns:

            if analysis["x_axis"] not in available_columns:
                analysis["x_axis"] = ""

            if analysis["y_axis"] not in available_columns:
                analysis["y_axis"] = ""

        # Validate Chart Insight
        chart_insight = analysis.get("chart_insight", {})

        if not isinstance(chart_insight, dict):
            chart_insight = {}

        chart_insight.setdefault("trend", "")
        chart_insight.setdefault("possible_reason", "")
        chart_insight.setdefault("business_recommendation", "")

        analysis["chart_insight"] = chart_insight

        return analysis

    except Exception as e:

        print("AI Analysis Error:")
        print(e)

        return {
            "summary": "",
            "key_findings": [],
            "business_insight": "",
            "recommended_chart_type": "",
            "recommended_chart_reason": "",
            "x_axis": "",
            "y_axis": "",
            "chart_insight": {
                "trend": "",
                "possible_reason": "",
                "business_recommendation": "",
            },
        }