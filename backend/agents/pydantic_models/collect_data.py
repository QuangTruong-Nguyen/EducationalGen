from dataclasses import dataclass
from agents.pydantic_models.supervisor import RunTask
from pydantic import BaseModel

@dataclass
class CollectDataDeps:
    task: RunTask
    

class ToolOutput(BaseModel):
    result: str