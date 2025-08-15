from contextlib import asynccontextmanager
from fastapi import FastAPI
from src.utils.gemini.configure_model import configure_model


def get_lifespan():
    """Returns FastAPI lifespan handler.
    Args:
        None
    Returns:
        Lifespan context manager callable.
    """
    @asynccontextmanager
    async def lifespan(app: FastAPI):
        """Application lifespan context.
        Args:
            app: FastAPI application instance.
        Returns:
            None
        """
        configure_model()
        yield
    return lifespan
