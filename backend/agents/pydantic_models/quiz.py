from pydantic import BaseModel, Field
from typing import List


class Question(BaseModel):
    question: str = Field(description="Question of multichoice")
    option: List[str] = Field(description="List of multiple")
    answer: str = Field(description="Answer of question from option, not A/B/C/D")
    explain: str = Field(description="Explain the correct answer")
    source: str = Field(description="Extract questions from database or web")

class QuizOutput(BaseModel):
    questions: List[Question]

class QuizInput(BaseModel):
    data: str

