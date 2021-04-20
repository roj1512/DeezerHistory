from aiogram import Dispatcher

from . import commands
from . import connect
from . import inline
from . import start
from . import status


def register_handlers(dp: Dispatcher):
    dp.register_message_handler(start.handler, commands=['start'])
    dp.register_message_handler(status.handler, commands=['status'])
    dp.register_message_handler(connect.handler, commands=['connect'])
    dp.register_message_handler(commands.handler, commands=['commands'])
    dp.register_inline_handler(inline)
