from pydantic_ai import Agent, RunContext
from .pydantic_models.clarify import Objective

import os

os.environ["GEMINI_API_KEY"] = "API"

clarify_agent = Agent(
    'google-gla:gemini-2.0-flash',
    deps_type=Objective,
    result_type = Objective
)

@clarify_agent.system_prompt
def system_prompt(ctx: RunContext) -> str:
     return f"""
        You are in charge of understanding the user query and extracting information from: "{ctx.deps.user_query}".
        Given the current course objective details:
        - Subject: {ctx.deps.subject}
        - Level: {ctx.deps.level}
        - Target Audience: {ctx.deps.target_audience}
        - Entire Course: {ctx.deps.entire_course}
        - Chapters (if applicable): {ctx.deps.chapters}

        Your goal is to identify any missing or unclear information required to fully understand the user's intent.
        If you are unsure about any aspect of the objective based on the initial user query, use the 'get_user_query' tool to ask the user for a clear and concise clarification question.

        Focus on asking ONE specific question at a time to avoid overwhelming the user.
        Make sure the question directly addresses the ambiguity or missing detail.
        Avoid vague or open-ended questions. Be precise about what information you need.
        Do not assume information. Always ask for clarification if there's any doubt.
        Return user's objective clear and concise.
        """

@clarify_agent.tool
def get_user_query(ctx: RunContext, question: str) -> str:
    answer = input(question)
    return f"User answer: {answer}"

if __name__ == "__main__":
    deps = Objective(
        user_query = "Can you help me create a learning material for Introduction to Artificial Intelligence course",
        subject = "",
        level = "",
        target_audience = "",
        entire_course = False,
        chapters = []
    )

    result = clarify_agent.run_sync(
        "", deps=deps, 
        model_settings={'temperature': 0.0}
    )

    print(result)