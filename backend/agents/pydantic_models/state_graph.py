from dataclasses import dataclass
from pydantic_ai import Agent, RunContext

from typing import List, Literal, Dict, Any
from typing_extensions import TypedDict
from .supervisor import Task, RunTask
from .clarify import Objective
from fastapi import WebSocket

class State(TypedDict):
    user_query: str
    objective: Objective
    history: str
    thinking: str
    todo_list: Dict[str, Any]
    data: str
    next_action: RunTask
    next_step: Literal["supervisor", "get_user_query", "collect_data_agent", "curriculum_agent", \
                       "lecture_note_gen_agent", "presentation_gen_agent", "quiz_gen_agent", "evaluator_agent", "end"]
    results: Dict[str, Any]
    lecture_notes: Dict[str, str]
    websocket: WebSocket
    modules_result: Dict[str, List[Dict[str, Any]]]
    links_lecture: List[str]
    links_quiz: List[str]