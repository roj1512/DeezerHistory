from aiogram.types import Message

from ..config import ADMINS
from ..strings import get_string, reload_strings


async def handler(message: Message):
    if message.from_user.id in ADMINS:
        reload_strings()
        await message.reply(get_string("reload_strings_1"))
