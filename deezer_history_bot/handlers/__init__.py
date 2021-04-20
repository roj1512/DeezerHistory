from aiogram import Dispatcher

from . import commands
from . import connect
from . import inline
from . import start
from . import status


def register_handlers(dp: Dispatcher):
    # Private
    dp.register_message_handler(start.handler, commands=['start'])
    dp.register_message_handler(commands.handler, commands=['commands'])
    dp.register_message_handler(connect.handler, commands=['connect'])
    # Groups
    dp.register_message_handler(status.handler, commands=['status'])
    # Inline
    dp.register_inline_handler(inline.handler)
