from os import getenv

from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = getenv("BOT_TOKEN")
DB_URI = getenv("DB_URI")
STRINGS = getenv("STRINGS")
ADMINS = list(map(int, getenv("ADMINS").split()))
