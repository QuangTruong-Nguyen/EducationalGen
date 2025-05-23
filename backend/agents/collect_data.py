from pydantic_ai import Agent, RunContext
from pydantic_ai.common_tools.duckduckgo import duckduckgo_search_tool
from agents.pydantic_models.collect_data import CollectDataDeps
from pydantic_ai import Agent
from pydantic_ai.models.anthropic import AnthropicModel
from pydantic_ai.providers.anthropic import AnthropicProvider
from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai.providers.google_gla import GoogleGLAProvider
import time
from tavily import TavilyClient



from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma


llm = GeminiModel(
        'gemini-2.0-flash', 
        provider=GoogleGLAProvider(api_key="API")
    )



collect_data_agent = Agent(
    llm,
    deps_type = CollectDataDeps,
    result_type = str
)

@collect_data_agent.tool
def retrieval(ctx: RunContext, question: str) -> str:
    """Retrieve documents from vector store.
    
    This tool performs semantic search on a vector database to find relevant documents based on the input question.
    It uses the multilingual-e5-base model for embeddings and returns the top 2 most similar documents.
    
    Args:
        question (str): The query/question to search for in the vector store
        
    Returns:
        str: A concatenated string containing the content of the top 2 most relevant documents
    """
    print("---RETRIEVE---")
    
    embedings=HuggingFaceEmbeddings(model_name='intfloat/multilingual-e5-base')
    
    vector_store = Chroma(
        collection_name="example_collection2",
        embedding_function=embedings, 
        persist_directory="./chroma_langchain_db"
    )
    try:
        # Retrieval
        documents = vector_store.similarity_search(
            question,
            k=2
        )
        result = "Result Retrieval: " + documents[0].page_content + documents[1].page_content
        time.sleep(5)
        return result
    except Exception as e:
        print(f"Error retrieving documents: {e}")
        # return ToolOutput(result=f"Simulated retrieval result for question: {question}")

@collect_data_agent.tool
def tavily_search(ctx: RunContext, question: str) -> str:
    """Search the web using Tavily.
    
    This tool performs web searches using the Tavily API to find relevant information from the internet.
    It returns the top 2 most relevant search results for the given query.
    
    Args:
        question (str): The search query to find information about
        
    Returns:
        str: A concatenated string containing the content of the top 2 most relevant search results
    """
    print("---Tavily---")
    try:
        # Tool logic here
        client = TavilyClient('API')
        response = client.search(
            query=question,
            max_results=2
        )
        print(response['results'][0]['content']+  response['results'][1]['content'])
        return "Research Web by Tavily: " + response['results'][0]['content']+  response['results'][1]['content']
    except Exception as e:
        print(f"Error getting related web content: {e}")
        return f"Simulated web search result for question: {question}"
    





@collect_data_agent.system_prompt
def system_prompt(ctx: RunContext) -> str:

    
    

    return f"""    
    First, using `tavily_search` for information about {ctx.deps.task.description}
    
    Second, you will use `retrieval` to perform a database query based on the {ctx.deps.task.description}
    Based on the available data:
    Create a detailed report and get exactly relevance content from searched information for each result pages.
    
    """

