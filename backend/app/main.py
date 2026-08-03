# 此文件负责接收HTTP请求
from fastapi import FastAPI
from app.crud import get_locations, execute_sql
from app.services.ai_service import generate_sql
from app.models import QueryRequest
from fastapi.middleware.cors import CORSMiddleware
# 创建一个 FastAPI 应用
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 装饰器（Decorator），告诉 FastAPI：如果有人访问：/，就运行下面的函数
@app.get("/")
def root():
    return {
        "message": "AI SQL Assistant API is running!"
    }

@app.get("/locations")
def locations():
    return get_locations()

@app.post("/query")
def query(request: QueryRequest):

    sql = generate_sql(request.question)

    query_result = execute_sql(sql)

    return {
        "question": request.question,
        "sql": sql,
        **query_result
    }