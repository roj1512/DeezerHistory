from aiogram import executor

from . import dp

executor.start_polling(dp, skip_updates=True)
