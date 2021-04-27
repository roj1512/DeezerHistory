import typing
from uuid import uuid4

from aiogram.types import InlineKeyboardButton
from aiogram.types import InlineKeyboardMarkup
from aiogram.types import InlineQuery
from aiogram.types import InlineQueryResultPhoto
from aiogram.types import Message

from .image import create_image


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


async def inline_results(query: InlineQuery, history: typing.List[dict]):
    results = []
    for track in history:
        results.append(
            InlineQueryResultPhoto(
                id=str(uuid4()),
                photo_url=await create_image(track, query.from_user),
                thumb_url=track['album']['cover'],
                title=track['title'],
                description=track['artist']['name'],
                reply_markup=lt_reply_markup(track),
            ),
        )
    return results
