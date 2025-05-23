from agents.clarify_agent import clarify_agent
from agents.pydantic_models.state_graph import State
from agents.pydantic_models.clarify import Objective

from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

def clarify_agent_node(state: State):
    deps = Objective(
      user_query = state.get("user_query"),
      subject = "",
      level = "",
      target_audience = "",
      entire_course = False,
      chapters = [],
      thinking = []
    )

    result = clarify_agent.run_sync(
        "", deps=deps,
        model_settings={'temperature': 0.0}
    )

    state["objective"] = result.data
    state["next_step"] = "curriculum_gen_agent"
    state["thinking"] = result.data.thinking
    return state


def supervisor_agent_node(state: State):
    deps = SupervisorDeps(
        curriculum = state.get("results").get("curriculum"),
        todo_list = state.get("todo_list")
    )

    result = supervisor_agent.run_sync("", deps=deps)
    print(result.output)

    next_action = result.output.next_action
    state["next_action"] = next_action

    # Convert todo_list from list to dictionary
    if not state.get("todo_list"):
        state["todo_list"] = {}
        for task in result.output.todo_list.tasks:
            state["todo_list"][task.task_id] = task

    state["next_step"] = next_action.agent
    state["todo_list"][next_action.task_id].status = "done"

    return state



graph_builder = StateGraph(State)

graph_builder.add_node("clarify_agent", clarify_agent_node)

graph_builder.add_edge(START, "clarify_agent")
graph_builder.add_edge("clarify_agent", END)

graph = graph_builder.compile()

