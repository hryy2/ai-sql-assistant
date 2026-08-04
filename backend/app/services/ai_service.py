from dotenv import load_dotenv
from openai import OpenAI

from app.prompts import SYSTEM_PROMPT

import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def generate_sql(question: str) -> str:

    print("System Prompt Loaded")

    try:

        response = client.responses.create(

            model="gpt-4.1-mini",

            input=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT,
                },
                {
                    "role": "user",
                    "content": question,
                },
            ],

            temperature=0,

        )

        sql = response.output_text.strip()
        sql = sql.replace("```sql", "")
        sql = sql.replace("```", "")
        sql = sql.strip()

        return sql

    except Exception as e:

        print(e)

        return "-- Unable to generate SQL."