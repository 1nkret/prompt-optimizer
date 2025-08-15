import logging
import google.generativeai as genai
from fastapi import APIRouter, HTTPException

from src.core.config import SYSTEM_REWRITER_TEMPLATE
from src.models.improve_body import ImproveBody
from src.models.improve_response import ImproveResponse
from src.utils.build_message import build_user_message

router = APIRouter()


@router.post("/improve", response_model=ImproveResponse)
async def improve(body: ImproveBody) -> ImproveResponse:
    """Improves a system prompt via Gemini.
    Args:
        body: Payload with fields `systemPrompt` and `userRequest`.
    Returns:
        ImproveResponse containing `improvedSystemPrompt`.
    """
    try:
        model = genai.GenerativeModel(
            "gemini-2.5-flash",
            system_instruction=SYSTEM_REWRITER_TEMPLATE,
        )
        user_msg = build_user_message(body.systemPrompt, body.userRequest)
        resp = await model.generate_content_async(user_msg)

        cand = (resp.candidates or [None])[0]
        parts = getattr(getattr(cand, "content", None), "parts", None) if cand else None
        text = getattr(parts[0], "text", "").strip() if parts else ""
        if not text:
            raise HTTPException(status_code=502, detail="Empty model response")

        return ImproveResponse(improvedSystemPrompt=text)
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"LLM Error: {e}")
        raise HTTPException(status_code=502, detail="LLM error")
