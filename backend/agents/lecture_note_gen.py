from pydantic_ai import Agent, RunContext
from agents.pydantic_models.lecture_note import LectureNoteDeps
from pydantic_ai.providers.groq import GroqProvider
from pydantic_ai.models.groq import GroqModel


from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai.providers.google_gla import GoogleGLAProvider


llm = GeminiModel(
        'gemini-2.0-flash', 
        provider=GoogleGLAProvider(api_key="API")
    )

lecture_note_gen_agent = Agent(
    # 'google-gla:gemini-2.0-flash',
    llm,
    deps_type = LectureNoteDeps,
    result_type = str
)

@lecture_note_gen_agent.system_prompt
def system_prompt(ctx: RunContext) -> str:
    
    
    return f"""
    You are an educational content specialist. Your task is to create a complete and detailed lecture note based on the following data:
    {ctx.deps.data}

    Create a lecture note for {ctx.deps.task.description}
    Note that the content must be as detailed as possible to serve the purpose of education. The content created must be specific.
    Create up to 1000 words.
    """
    # return f"""
    # Given data {ctx.deps.data}
    # Create a lecture note for {ctx.deps.task.description}
    # """