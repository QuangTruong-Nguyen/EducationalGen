from dataclasses import dataclass
from pydantic_ai import Agent, RunContext
from typing import List, Literal, Dict, Any
from typing_extensions import TypedDict
from pydantic import BaseModel, Field


class Task(BaseModel):
    task_id: int = Field(description="Task ID")
    agent: Literal["collect_data_agent", "lecture_note_gen_agent", "presentation_gen_agent", "quiz_gen_agent", "evaluator_agent", "end"]
    description: str = Field(description="Short description about task include: chapter, ...")
    status: Literal["pending", "done"]
    module_id: str = Field(description="ID or name of the module/topic that this task belongs to")

class TODOList(BaseModel):
    tasks: List[Task] = Field(description="List of tasks")

class RunTask(BaseModel):
    task_id: int = Field(description="Task ID")
    agent: Literal["collect_data_agent", "lecture_note_gen_agent", "presentation_gen_agent", "quiz_gen_agent", "evaluator_agent", "end"]
    description: str = Field(description="Short description about task include: chapter, ...")

@dataclass
class SupervisorDeps:
    curriculum: str
    todo_list: TODOList

class SupervisorResult(BaseModel):
    todo_list: TODOList = Field(description = "List of tasks")
    next_action: RunTask