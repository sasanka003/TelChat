from langchain.agents import tool
import requests

@tool
def get_account_details(mobile_number: str) -> dict:
    """Returns the user's account details such as ownership, account balance and package usages."""
    url = f"http://localhost:3000/users/{mobile_number}/balance"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()

@tool
def recharge_account(mobile_number: str, amount: float) -> dict:
    """
    Recharge the user's account with the specified amount.
    """
    url = f"http://localhost:3000/users/{mobile_number}/recharge"
    payload = {
        "amount": amount
    }
    headers = {
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()