from typing import Callable

from aiogram.types import InlineKeyboardButton
from aiogram.types import InlineKeyboardMarkup
from aiogram.types import Message


class Error(Exception):
    pass


def errors(func: Callable) -> Callable:
    async def decorator(message: Message):
        try:
            return await func(message)
        except Error as e:
            error = str(e)
            if error in ('AccessError: Not authorized', 'OAuthException: Invalid OAuth access token.'):
                await message.reply(
                    'You need to connect your Deezer account first. PM me and use the /connect command.',
                    reply_markup=InlineKeyboardMarkup(
                        inline_keyboard=[
                            [
                                InlineKeyboardButton(
                                    'PM me',
                                    f'https://t.me/{(await message.bot.me).username}',
                                ),
                            ],
                        ],
                    ),
                )
                return
            await message.reply(str(e))
    return decorator
