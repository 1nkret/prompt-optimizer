from pydantic import BaseModel, Field


class ImproveResponse(BaseModel):
    """Response with the improved system prompt.
    Args:
        improvedSystemPrompt: Final improved prompt text.
    Returns:
        None
    """
    improvedSystemPrompt: str = Field(min_length=1, max_length=32000)
