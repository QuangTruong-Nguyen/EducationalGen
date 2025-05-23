from dataclasses import dataclass
from typing import List, Literal, Dict, Any
from typing_extensions import TypedDict
from pydantic import BaseModel, Field

@dataclass
class CurriculumDeps:
    objective: str
    table_content: str

class Module(BaseModel):
    title: str = Field(description="Module name. For example: 1.1 Introduction to AI")
    content: str = Field(description="Submodules for example: 1.1 Introduction to AI: \n - What is AI? ,... and its description.")

class CurriculumResult(BaseModel):
    title: str = Field(description="Course title")
    overview: str = Field(description="Course description, target audience, prerequisite, course objectives,...")
    modules: List[Module] = Field(description="Course modules")