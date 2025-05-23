from dataclasses import dataclass
from typing import List, Literal, Dict, Any
from typing_extensions import TypedDict
from pydantic import BaseModel, Field

class Objective(BaseModel):
    user_query: str
    subject: str
    level: str
    target_audience: str
    entire_course: bool
    chapters: List[str]
    thinking: List[str] = Field(description="Thinking steps of agent")