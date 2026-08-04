from pydantic import BaseModel
from typing import Any

class QueryRequest(BaseModel):
    question: str

class ReportRequest(BaseModel):

    question: str

    sql: str

    results: list[dict[str, Any]]

    summary: dict