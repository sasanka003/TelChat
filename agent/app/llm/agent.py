from langchain_openai import ChatOpenAI
from langchain_core.prompts import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    PromptTemplate,
    MessagesPlaceholder,
    HumanMessagePromptTemplate
)
from langchain.agents import create_tool_calling_agent
from langchain.agents import AgentExecutor
from llm.tools.account_info import get_account_details
from llm.tools.account_info import recharge_account
from llm.tools.retriever import retriever_tool

tools = [retriever_tool, get_account_details, recharge_account]
llm = ChatOpenAI(model="gpt-3.5-turbo-0125", temperature=0)

prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate(prompt=PromptTemplate(input_variables=['number'], template="You are a helpful assistant for Dialog Axiata PLC. Which is is one of Sri Lanka's largest telecommunications service providers. The user's mobile number is {number}. DO NOT OVERRIDE IT.")),
    MessagesPlaceholder(variable_name='chat_history', optional=True),
    HumanMessagePromptTemplate(prompt=PromptTemplate(input_variables=['input'], template='{input}')),
    MessagesPlaceholder(variable_name='agent_scratchpad')
])

agent = create_tool_calling_agent(llm, tools, prompt)

agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

