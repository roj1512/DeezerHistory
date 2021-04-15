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
            s("commands_1"),
            reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[
                    [
                        InlineKeyboardButton(
                            text=s("commands_2"),
                            switch_inline_query=""
                        )
                    ]
                ]
            )
        )
