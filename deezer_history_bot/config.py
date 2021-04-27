from os import getenv

from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = getenv('BOT_TOKEN')
DB_URI = getenv('DB_URI')
IMAGE_SERVER_ADDRESS = f'http://127.0.0.1:{getenv("IMAGE_SERVER_PORT")}/image'
CACHE_CHAT_ID = int(getenv('CACHE_CHAT_ID'))
