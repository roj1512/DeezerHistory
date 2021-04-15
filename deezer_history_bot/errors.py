from typing import Callable

from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton
)

from .database.lang import get_lang
from .strings import get_string


class Error(Exception):
    pass


def errors(func: Callable) -> Callable:
    async def decorator(message: Message):
        try:
            return await func(message)
        except Error as e:
            error = str(e)

            if error in ("AccessError: Not authorized", "OAuthException: Invalid OAuth access token.",):
                await message.reply(
                    get_string(get_lang(message.from_user.id), "errors_1"),
                    reply_markup=InlineKeyboardMarkup(
                        inline_keyboard=[
                            [
                                InlineKeyboardButton(
                                    get_string(get_lang(message.from_user.id), "errors_2"),
                                    f"https://t.me/{(await message.bot.me).username}"
                                )
                            ]
                        ]
                    )
                )
                return

            await message.reply(str(e))

    return decorator
