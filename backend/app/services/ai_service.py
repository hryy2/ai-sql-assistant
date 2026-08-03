# 负责Question->GPT->SQL
from dotenv import load_dotenv
from openai import OpenAI
from app.prompts import SYSTEM_PROMPT
import os

# Load environment variables from .env
load_dotenv()

# Create OpenAI client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def generate_sql(question: str) -> str:
    """
    Mock SQL generation.
    This function will later call the OpenAI API.
    """
    print("System Prompt Loaded")

    question = question.lower()

    if "location" in question:
        return """
        SELECT *
        FROM locations;
        """

    return "-- Unable to generate SQL."