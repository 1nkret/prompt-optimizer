import os
import google.generativeai as genai


def configure_model() -> None:
    """Configures the Gemini SDK with API key from env.
    Args:
        None
    Returns:
        None
    """
    key = os.getenv("GOOGLE_API_KEY", "")
    if not key:
        raise RuntimeError("GOOGLE_API_KEY is missing")
    genai.configure(api_key=key)
