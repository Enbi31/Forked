import json
import logging
import re

from groq import Groq, APIError, APITimeoutError

from app.connection import settings
from app.prompt import SYSTEM_PROMPT

logger = logging.getLogger(__name__)

client = Groq(api_key=settings.GROQ_API_KEY)

FALLBACK_PRODUCT = {
    "name": "Product unavailable",
    "price": "N/A",
    "reason": "The AI recommendation service is temporarily unavailable. Please try again.",
    "specs": [],
    "tradeoff": "",
    "category_tier": "balanced",
}

FALLBACK_RESPONSE = {
    "products": [FALLBACK_PRODUCT.copy() for _ in range(3)]
}

MAX_RETRIES = 2


def get_ai_recommendation(user_data: dict) -> dict:
    for attempt in range(MAX_RETRIES + 1):
        try:
            logger.info("Calling LLM (attempt %d/%d)", attempt + 1, MAX_RETRIES + 1)
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
            parsed = _parse_response(content)
            products = parsed.get("products", [])
            if len(products) < 3:
                logger.warning("LLM returned %d products, expected 3", len(products))
                while len(products) < 3:
                    products.append(FALLBACK_PRODUCT.copy())
                parsed["products"] = products
            return parsed
        except APITimeoutError as e:
            logger.warning("LLM timeout on attempt %d: %s", attempt + 1, e)
            if attempt < MAX_RETRIES:
                continue
            return FALLBACK_RESPONSE
        except (json.JSONDecodeError, KeyError, TypeError, ValueError) as e:
            logger.warning("Parse error on attempt %d: %s", attempt + 1, e)
            if attempt < MAX_RETRIES:
                continue
            return FALLBACK_RESPONSE
        except APIError as e:
            logger.error("Groq API error on attempt %d: %s", attempt + 1, e)
            if attempt < MAX_RETRIES:
                continue
            return FALLBACK_RESPONSE


def _parse_response(content: str) -> dict:
    cleaned = content.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned)
    return json.loads(cleaned)

