# Receive HTTP requests

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.crud import get_locations, execute_sql
from app.models import (
    QueryRequest,
    ReportRequest,
)

from app.services.ai_service import generate_sql
from app.services.openai_service import generate_ai_analysis

from fastapi.responses import StreamingResponse
from app.services.report_service import generate_report

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root
@app.get("/")
def root():
    return {
        "message": "AI Data Insights API is running!"
    }

# Locations
@app.get("/locations")
def locations():
    return get_locations()


# Natural Language → SQL
@app.post("/query")
def query(request: QueryRequest):
    # Step 1
    sql = generate_sql(request.question)
    # Step 2
    query_result = execute_sql(sql)
    # Step 3
    analysis = {
        "summary": "",
        "key_findings": [],
        "business_insight": "",
        "recommended_chart_type": "",
        "recommended_chart_reason": "",
    "x_axis": "",
    "y_axis": "",
    }

    if query_result.get("success"):
        analysis = generate_ai_analysis(
        question=request.question,
        sql=sql,
        results=query_result["results"],
    )

    # Step 4
    return {

    "question": request.question,

    "sql": sql,

    "results": query_result["results"],

    "success": query_result["success"],

    "message": query_result.get("message"),

    "summary": analysis,
}

@app.post("/report")
def export_report(
    request: ReportRequest,
):

    pdf = generate_report(
        question=request.question,
        sql=request.sql,
        results=request.results,
        analysis=request.summary,
    )

    return StreamingResponse(
        pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
            'attachment; filename="AI_Executive_Report.pdf"'
        },
    )