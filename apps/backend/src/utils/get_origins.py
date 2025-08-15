import os


def get_cors_origins() -> list[str]:
    """Parses CORS origins from env.
    Args:
        None
    Returns:
        List of origins allowed by CORS.
    """
    raw = os.getenv("CORS_ORIGINS", "http://localhost:3000")
    return [x.strip() for x in raw.split(",") if x.strip()]
