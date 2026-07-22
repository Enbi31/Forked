import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")


class Settings:
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")


settings = Settings()