# 此文件负责执行SQL
from app.database import get_connection


def get_locations():
    # 调用database.py
    conn = get_connection()

    cursor = conn.cursor()
    # 执行 SQL
    cursor.execute("""
        SELECT *
        FROM locations
        ORDER BY location_id;
    """)

    rows = cursor.fetchall()

    conn.close()
    # SQLite返回sqlite3.Row, FastAPI 不认识,转成dict，FastAPI就能自动变成JSON
    return [dict(row) for row in rows]


def execute_sql(sql: str):
    """
    Execute SQL and return the query results.
    """

    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(sql)

        rows = cursor.fetchall()

        return {
            "success": True,
            "results": [dict(row) for row in rows]
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }

    finally:
        conn.close()