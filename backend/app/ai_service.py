from groq import Groq
import json

from app.connection import settings
from app.prompt import SYSTEM_PROMPT

client = Groq(api_key=settings.GROQ_API_KEY)


def get_ai_recommendation(user_data):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": json.dumps(user_data)},
        ],
    )
    return json.loads(response.choices[0].message.content)

