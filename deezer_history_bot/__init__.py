from aiogram import Bot, Dispatcher

from .handlers import register_handlers
from .config import BOT_TOKEN

bot = Bot(BOT_TOKEN)
dp = Dispatcher(bot)
register_handlers(dp)
