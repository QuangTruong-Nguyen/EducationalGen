from dataclasses import dataclass
from agents.pydantic_models.supervisor import RunTask

@dataclass
class LectureNoteDeps:
    task: RunTask
    data: str