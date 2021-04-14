import typing
from uuid import uuid4

from aiogram import types

from .database.lang import get_lang
from .strings import get_string


def lt_text(track: dict, user: types.User, lang: str) -> str:
    return get_string(lang, "get_1").format(
        user=user.full_name,
        artist=track["artist"]["name"],
        title=track["title"],
    )


def lt_reply_markup(track: dict, lang: str):
    inline_keyboard = [
        [
            types.InlineKeyboardButton(
                text=get_string(lang, "get_2"),
                url=track["link"]
            )
        ],
        [
            types.InlineKeyboardButton(
                get_string(lang, "get_3"),
                f"https://t.me/share/url?url={track['link']}"
            ),
        ]
    ]

    return types.InlineKeyboardMarkup(
        inline_keyboard=inline_keyboard
    )


def indent(status_command_message: types.Message) -> int:
    _ = 0

    try:
        _ = int(status_command_message.text.split()[1]) - 1
    except IndexError:
        pass
    except ValueError:
        pass

    return _


def input_message_content(track: dict, user: types.User) -> types.InputTextMessageContent:
    return types.InputTextMessageContent(
        message_text=lt_text(track, user),
        parse_mode=types.ParseMode.HTML,
        disable_web_page_preview=True
    )


async def inline_results(query: types.InlineQuery, history: typing.List[dict]):
    results = []
    lang = await get_lang(query.from_user.id)

    for track in history:
        if "album" in track:
            results.append(
                types.InlineQueryResultPhoto(
                    id=str(uuid4()),
                    photo_url=track["album"]["cover_xl"],
                    thumb_url=track["album"]["cover"],
                    title=track["title"],
                    description=track["artist"]["name"],
                    caption=lt_text(track, query.from_user, lang),
                    parse_mode=types.ParseMode.HTML,
                    reply_markup=lt_reply_markup(track, lang),
                )
            )
        else:
            results.append(
                types.InlineQueryResultArticle(
                    id=str(uuid4()),
                    title=track["title"],
                    input_message_content=types.InputTextMessageContent(
                        message_text=lt_text(track, query.from_user, lang),
                        parse_mode=types.ParseMode.HTML,
                        disable_web_page_preview=True
                    ),
                    reply_markup=lt_reply_markup(track, lang),
                    description=track["artist"]["name"],
                )
            )

    return results


def preview_data(query: types.CallbackQuery):
    text, entities = (
        (
            query.message.text or query.message.caption
        ).split("\n")[-1].replace("\xad", "")[:-1].split("—"),
        query.message.caption_entities or query.message.entities
    )
    text = text

    return {
        "url": entities[-1].url,
        "title": text[0].rstrip(),
        "artist": text[1],
    }
