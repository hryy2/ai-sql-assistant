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