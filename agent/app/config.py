from functools import lru_cache
from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
BOT_DATA_DIR = Path(BASE_DIR).parent / 'bot_data'

class Settings(BaseSettings):
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    min_summary_token_limit: int = 400

@lru_cache()
def get_settings():
    return Settings()


# # #

# from functools import lru_cache
# from pydantic_settings import BaseSettings
# import os
# from pathlib import Path

# BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# BOT_DATA_DIR = Path(BASE_DIR).parent / 'bot_data'

# class Settings(BaseSettings):
#     openai_api_key: str = ""
#     min_summary_token_limit: int = 400

# @lru_cache()
# def get_settings():
#     return Settings()