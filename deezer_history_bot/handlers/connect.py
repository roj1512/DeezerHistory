from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton
)

from ..strings import multilingual


@multilingual
async def handler(message: Message, s):
    if message.chat.type == "private":
        await message.reply(
            s("connect_1"),
            reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[
                    [
                        InlineKeyboardButton(
                            text=s("connect_2"),
                            url="https://tgcalls.net/deezer",
                        )
                    ]
                ]
            )
        )
