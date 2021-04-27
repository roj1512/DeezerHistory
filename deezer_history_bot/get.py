import typing
from uuid import uuid4

from aiogram import Bot
from aiogram.types import InlineKeyboardButton
from aiogram.types import InlineKeyboardMarkup
from aiogram.types import InlineQuery
from aiogram.types import InlineQueryResultCachedPhoto
from aiogram.types import Message

from .image import create_image


async def photo_file_id_from_url(bot: Bot, url: str) -> str:
    return (await bot.send_photo(-1001243271409, url)).photo[1].file_id


def lt_reply_markup(track: dict):
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text='Play on Deezer',
                    url=track['link'],
                ),
            ],
            [
                InlineKeyboardButton(
                    'Share',
                    f"https://t.me/share/url?url={track['link']}",
                ),
            ],
        ],
    )


def indent(status_command_message: Message) -> int:
    _ = 0
    try:
        _ = int(status_command_message.text.split()[1]) - 1
    except IndexError:
        pass
    except ValueError:
        pass
    return _


async def inline_results(query: InlineQuery, history: typing.List[dict], indent: int = 0):
    return [
        InlineQueryResultCachedPhoto(
            id=str(uuid4()),
            photo_file_id=await photo_file_id_from_url(query.bot, await create_image(history[indent], query.from_user)),
            title=history[indent]['title'],
            description=history[indent]['artist']['name'],
            reply_markup=lt_reply_markup(history[indent]),
        ),
    ]
