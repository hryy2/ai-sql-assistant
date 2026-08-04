"""
Configuration for the Machine Learning module.
"""

from pathlib import Path

# ============================
# Project Paths
# ============================

# backend/ml/config.py
ML_DIR = Path(__file__).resolve().parent

# backend/
BACKEND_DIR = ML_DIR.parent

# Project root
PROJECT_DIR = BACKEND_DIR.parent

# Database
DATABASE_PATH = PROJECT_DIR / "a3_electricity_weather.db"

# Model Directory
MODEL_DIR = ML_DIR / "models"
MODEL_DIR.mkdir(exist_ok=True)
MODEL_FILE = MODEL_DIR / "electricity_demand_model.pkl"