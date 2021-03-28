from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton
)
from ..strings import get_string


async def handler(message: Message):
    await message.reply(
        get_string("connect_1"),
        reply_markup=InlineKeyboardMarkup(
            inline_keyboard=[
                [
                    InlineKeyboardButton(
                        text=get_string("connect_2"),
                        url="https://tgcalls.net/deezer",
                    )
                ]
            ]
        )
    )
