def build_user_message(system_prompt: str, user_request: str) -> str:
    """Builds a single user message for Gemini.
    Args:
        system_prompt: Current system prompt text.
        user_request: Requested changes description.
    Returns:
        Combined message string used as model content.
    """
    return (
        "Current SYSTEM PROMPT:\n---\n"
        f"{system_prompt}\n---\n\n"
        "Requested changes:\n---\n"
        f"{user_request}\n---\n\n"
        "Return a single improved SYSTEM PROMPT with no extra text."
    )
