from pydantic import BaseModel, Field


class ImproveBody(BaseModel):
    """Request payload for improving a system prompt.
    Args:
        userRequest: Requested changes or creation description
        systemPrompt: Current system prompt
    Returns:
        None
    """
    userRequest: str = Field(min_length=1, max_length=8000)
    systemPrompt: str = Field(min_length=1, max_length=16000)
