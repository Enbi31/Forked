import json
import re

from groq import Groq, APIError

from app.connection import settings
from app.prompt import SYSTEM_PROMPT

client = Groq(api_key=settings.GROQ_API_KEY)

FALLBACK_RESPONSE = {
    "products": [
        {
            "name": "Product unavailable",
            "price": "N/A",
            "reason": "The AI recommendation service returned an invalid response. Please try again.",
            "specs": [],
            "tradeoff": "",
            "category_tier": "balanced",
        }
    ]
}

MAX_RETRIES = 2


def get_ai_recommendation(user_data):
    for attempt in range(MAX_RETRIES + 1):
        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": json.dumps(user_data)},
                ],
                max_tokens=1024,
                temperature=0.7,
                timeout=30,
            )
            content = response.choices[0].message.content
            return _parse_response(content)
        except (json.JSONDecodeError, KeyError, TypeError, ValueError) as e:
            if attempt < MAX_RETRIES:
                continue
            return FALLBACK_RESPONSE
        except APIError as e:
            if attempt < MAX_RETRIES:
                continue
            return FALLBACK_RESPONSE


def _parse_response(content: str) -> dict:
    cleaned = content.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned)
    return json.loads(cleaned)

