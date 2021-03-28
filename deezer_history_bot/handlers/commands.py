from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton
)

from ..strings import get_string


async def handler(message: Message):
    if message.chat.type == "private":
        await message.reply(
            get_string("commands_1"),
            reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[
                    [
                        InlineKeyboardButton(
                            text=get_string("commands_2"),
                            switch_inline_query=""
                        )
                    ]
                ]
            )
        )
