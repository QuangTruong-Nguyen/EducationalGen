from pydantic import BaseModel, Field
from typing import Optional
from agents.pydantic_models.presentation import Presentation
from agents.pydantic_models.quiz import QuizOutput


class LectureNoteEvaluation(BaseModel):
    completeness: int = Field(ge=1, le=5, description="The completeness of the lecture content")
    logical_flow: int = Field(ge=1, le=5, description="The logical flow and structure of the lecture")
    scientific_accuracy: int = Field(ge=1, le=5, description="The scientific accuracy of the lecture content")
    clarity: int = Field(ge=1, le=5, description="The clarity and understandability of the lecture")
    reference_quality: int = Field(ge=1, le=5, description="The quality and validity of cited references")
    comment: Optional[str] = Field(description="General comments on the lecture note")

class QuizEvaluation(BaseModel):
    difficulty: int = Field(ge=1, le=5, description="The difficulty level of the quiz questions")
    question_clarity: int = Field(ge=1, le=5, description="The clarity and comprehensibility of the questions")
    answer_correctness: int = Field(ge=1, le=5, description="The correctness and appropriateness of the answers")
    explanation_quality: int = Field(ge=1, le=5, description="The quality and clarity of the answer explanations")
    topic_variety: int = Field(ge=1, le=5, description="The diversity of topics covered by the quiz")
    comment: Optional[str] = Field(description="General comments on the quiz")

class SlideEvaluation(BaseModel):
    layout_quality: int = Field(ge=1, le=5)
    aesthetic: int = Field(ge=1, le=5)
    visual_support: int = Field(ge=1, le=5)
    information_accuracy: int = Field(ge=1, le=5)
    readability: int = Field(ge=1, le=5)
    comment: Optional[str]

class EvaluationOutput(BaseModel):
    lecture_note_eval: Optional['LectureNoteEvaluation']
    quiz_eval: Optional['QuizEvaluation']
    slide_eval: Optional['SlideEvaluation']

class EvaluationInput(BaseModel):
    lecture_note: Optional[str]
    quiz: Optional[QuizOutput]
    slide: Optional[Presentation]

