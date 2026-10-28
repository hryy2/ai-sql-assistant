# Executing SQL queries
from app.database import get_connection

def get_locations():
    # Call database.py
    conn = get_connection()

    cursor = conn.cursor()
    # Execute SQL
    cursor.execute("""
        SELECT *
        FROM locations
        ORDER BY location_id;
    """)

    rows = cursor.fetchall()

    conn.close()
    # SQLite returns sqlite3.Row, FastAPI doesn't recognize it, so convert to dict, and FastAPI can automatically convert it to JSON
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