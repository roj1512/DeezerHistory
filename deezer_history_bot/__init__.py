from aiogram import Bot
from aiogram import Dispatcher

from .config import BOT_TOKEN
from .handlers import register_handlers

bot = Bot(BOT_TOKEN)
dp = Dispatcher(bot)
register_handlers(dp)
