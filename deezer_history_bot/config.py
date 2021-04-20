from os import getenv

from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = getenv('BOT_TOKEN')
DB_URI = getenv('DB_URI')
