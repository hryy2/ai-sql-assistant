import sqlite3
from pathlib import Path

# 项目根目录
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# 数据库文件路径
DATABASE_PATH = BASE_DIR / "database" / "a3_electricity_weather.db"


def get_connection():
    """Create and return a SQLite connection."""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn