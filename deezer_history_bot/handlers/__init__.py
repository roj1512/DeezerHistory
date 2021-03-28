from aiogram import Dispatcher
from . import (
    start,
    connect,
    commands,
    status,
    reload_strings,
    inline,
)


def register_handlers(dp: Dispatcher):
    dp.register_message_handler(start.handler, commands=["start"])
    dp.register_message_handler(status.handler, commands=["status"])
    dp.register_message_handler(connect.handler, commands=["connect"])
    dp.register_message_handler(commands.handler, commands=["commands"])
    dp.register_message_handler(reload_strings.handler, commands=["reload_strings"])
    dp.register_inline_handler(inline.handler)
