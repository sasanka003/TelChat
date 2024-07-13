from langchain.agents import tool
import requests

@tool 
def get_account_info(mobile_number: str) -> dict:
    """Returns the user's account details connection number , user details(name,nic,address), account type etc."""
    url = f"http://localhost:3000/users/{mobile_number}"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()

@tool
def get_account_balance(mobile_number: str) -> dict:
    """Returns the user's account balance."""
    url = f"http://localhost:3000/users/{mobile_number}/balance"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()
        
@tool
def get_data_packages() -> dict:
    """Return the details of data packages offered by the service provider."""
    url = "http://localhost:3000/data"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()
        
@tool 
def get_voice_packages() -> dict:
    """Return the details of voice packages offered by the service provider."""
    url = "http://localhost:3000/voice"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()
        
@tool
def get_my_active_data_packages(mobile_number: str) -> dict:
    """Return the details of data packages that are currently active for the user and details like remianing data balance and validity period."""
    url = f"http://localhost:3000/users/{mobile_number}/data_packages/active"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()
        
@tool
def get_my_expired_data_packages(mobile_number: str) -> dict:
    """Return the details of data packages that have expired for the user."""
    url = f"http://localhost:3000/users/{mobile_number}/data_packages/expired"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()
        
@tool 
def get_my_active_voice_packages(mobile_number: str) -> dict:
    """Return the details of voice packages that are currently active for the user and details like remianing voice balance and validity period."""
    url = f"http://localhost:3000/users/{mobile_number}/voice_packages/active"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()
        
@tool 
def get_my_expired_voice_packages(mobile_number: str) -> dict:
    """Return the details of voice packages that have expired for the user."""
    url = f"http://localhost:3000/users/{mobile_number}/voice_packages/expired"
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