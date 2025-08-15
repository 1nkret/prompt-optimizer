from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core.config import RATE_LIMIT, WINDOW_SEC
from src.utils.get_origins import get_cors_origins
from src.api.improve import router as improve_router
from src.middlewares.rate_limiter import RateLimitMiddleware
from src.lifecycle.lifespan import get_lifespan


def create_app() -> FastAPI:
    """Builds and configures FastAPI application.
    Args:
        None
    Returns:
        Configured FastAPI application.
    """
    app = FastAPI(title="Prompt Optimizer API", lifespan=get_lifespan())

    origins = get_cors_origins()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(RateLimitMiddleware, rate_limit=RATE_LIMIT, window_sec=WINDOW_SEC)

    app.include_router(improve_router)
    return app
