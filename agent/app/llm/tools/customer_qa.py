from langchain.agents import tool
import requests


@tool
def customer_qa(mobile_number: str, query: str) -> str:
    """Send the user's query to a support agent. Use this tool only if all other tools are insufficient to answer the user's query. You should try at least one other tool before using this one.After using this tool, inform the user, 'As an AI agent, I cannot answer the query, so it was forwarded to a support agent.'"""
    print(query) #make api call

    return "query succefully send to the support agent"