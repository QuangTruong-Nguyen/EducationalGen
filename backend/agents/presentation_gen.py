from pydantic_ai import Agent, RunContext
from agents.pydantic_models.presentation import Content, Presentation


from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai.providers.google_gla import GoogleGLAProvider


llm = GeminiModel(
        'gemini-2.0-flash', 
        provider=GoogleGLAProvider(api_key="API")
    )



presentation_gen_agent = Agent(
    llm,
    deps_type=Content,
    result_type=Presentation,
    model_settings={"temperature": 0.0}
    )

@presentation_gen_agent.system_prompt
def system_prompt(ctx: RunContext) -> str:
    return f"""
    You are assistant agent to help me generate slides for presentation.
    Use provided information {ctx.deps.content} about {ctx.deps.title} to summarize and synthesize content for the presentation.
    Given the following images information. Given each slide have size 1920x1080 px:
    IMAGES:
    """ + "\n".join(
        [f"{image.image_url}: {image.caption} have size {image.width}x{image.height}" for image in ctx.deps.images])
    + """
    Firstly, use given information to summarize and synthesize content for the presentation.
    The first slide is COVER, only include title of the presentation and subtitle.
    The last slide is CLOSING, only include "Thanks for watching".

    Secondly, select approriate image for the slide. If have not the suitable image for the slide, simply return `None`.
    Finally, select the most appropriate layout for this slide, based on whether slide have image and its size.


    MUST USE `only text` for slide which `image_url` is empty.
    USE `only image` for slide which have large image.
    Make sure content brevity BUT clarity and meaningful.

    Create from 10-20 slide.
    """