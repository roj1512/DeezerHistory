from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton
)

from ..database.lang import get_lang
from ..strings import get_string


async def handler(message: Message):
    if message.chat.type == "private":
        await message.reply(
            get_string(await get_lang(message.from_user.id), "commands_1"),
            reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[
                    [
                        InlineKeyboardButton(
                            text=get_string(await get_lang(message.from_user.id), "commands_2"),
                            switch_inline_query=""
                        )
                    ]
                ]
            )
        )
