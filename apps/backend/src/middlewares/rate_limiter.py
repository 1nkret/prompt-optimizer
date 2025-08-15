import time
from typing import Dict
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request


class RateLimitMiddleware(BaseHTTPMiddleware):
    """IP-based rate limiter middleware.
    Args:
        app: ASGI application.
        rate_limit: Max requests per window.
        window_sec: Window size in seconds.
    Returns:
        JSONResponse 429 on limit, otherwise next handler response.
    """
    def __init__(self, app, rate_limit: int, window_sec: int):
        super().__init__(app)
        self.rate_limit = rate_limit
        self.window_sec = window_sec
        self._bucket: Dict[str, Dict[str, int]] = {}

    async def dispatch(self, request: Request, call_next):
        ip = request.headers.get("x-forwarded-for", "").split(",")[0].strip() or request.client.host
        now = int(time.time())
        window = self._bucket.get(ip)

        if not window or now - window["ts"] >= self.window_sec:
            self._bucket[ip] = {"ts": now, "count": 1}
        else:
            if window["count"] >= self.rate_limit:
                return JSONResponse({"detail": "Too many requests"}, status_code=429)
            window["count"] += 1

        return await call_next(request)
