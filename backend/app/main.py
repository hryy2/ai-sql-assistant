from fastapi import FastAPI
# 创建一个 FastAPI 应用
app = FastAPI()

# 装饰器（Decorator），告诉 FastAPI：如果有人访问：/，就运行下面的函数
@app.get("/")
def root():
    return {
        "message": "AI SQL Assistant API is running!"
    }