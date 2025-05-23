from pydantic_ai import Agent, RunContext
from .pydantic_models.supervisor import SupervisorDeps, SupervisorResult
from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai.providers.google_gla import GoogleGLAProvider

import os

os.environ["GEMINI_API_KEY"] = "API"



supervisor_agent = Agent(
    'google-gla:gemini-2.0-flash',
    # llm,
    deps_type = SupervisorDeps,
    result_type = SupervisorResult
)

@supervisor_agent.system_prompt
def system_prompt(ctx: RunContext) -> str:
    # return f"""
    # Given the following information:
    # * Curriculum:
    # {ctx.deps.curriculum}

    # * TODO List include tasks need to act to create learning material:
    # {ctx.deps.todo_list}

    # * Agents Missions:
    # - 'collect_data_agent': Retrieve data from database and search information from the internet.
    # - 'lecture_note_gen_agent': Create lecture note for course.
    # - 'quiz_gen_agent': Create multi-choice question for course.
    # - 'presentation_gen_agent': Create slides for presentation.
    # - 'evaluator_agent': Evaluate generated content from agents.
    # - 'end': Terminate when created course successfully.


    # If TODO List is empty: Planning, create tasks for each curriculum module and return todo_list
    # Else, base on TODO list in order to instruct the others agent to complete tasks by select next_action from TODO List.
    # If all task from TODO List is done, return next_action = 'end'
    # """
    
    return f"""
    Given the following information:
    * Curriculum:
    {ctx.deps.curriculum}

    * TODO List include tasks need to act to create learning material:
    {ctx.deps.todo_list}

    * Agents Missions:
    - 'collect_data_agent': Retrieve data from database and search information from the internet.
    - 'lecture_note_gen_agent': Create lecture note for course.
    - 'quiz_gen_agent': Create multi-choice question for course.
    - 'slide_gen_agent': Create slide for presentation.
    - 'evaluator_agent': Evaluate generated content from agents.



    *Importance*: Remember that the order of performing tasks is very important. After Retrieve data from database and search information from the internet ('collect_data_agent'), that data will be used for Create lecture note for course ('lecture_note_gen_agent') and Create multi-choice question for course ('quiz_gen_agent'),  Create slide for presentation ('slide_gen_agent') and Evaluate generated content from agents ('evaluator_agent').

    Five task 'collect_data_agent','lecture_note_gen_agent', 'quiz_gen_agent', 'slide_gen_agent', 'evaluator_agent' must be consecutive in order with the same description.

    *Example*:
    If TODO List is empty: Planning, create tasks for each curriculum module and return todo_list
    Else, base on TODO list in order to instruct the others agent to complete tasks by select next_action from TODO List.
    If all task from TODO List is done, return next_action = RunTask with agent 'end'
    """