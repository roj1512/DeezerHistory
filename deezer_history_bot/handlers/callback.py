from aiogram.types import (
    CallbackQuery,
    ParseMode,
    InlineKeyboardMarkup,
    InlineKeyboardButton
)

from ..database.lang import set_lang, get_lang
from ..strings import get_string as s, get_languages


async def handler(query: CallbackQuery):
    if query.data.startswith("lang"):
        lang = query.data.split("_")
        if len(lang) == 1:
            langs = get_languages()
            await query.message.edit_text("Choose a language below.", reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[[InlineKeyboardButton(langs[lang], callback_data=f"lang_{lang}")] for lang in langs]))
        else:
            set_lang(query.from_user.id, lang[-1])
            await query.message.edit_text(
                text=s(get_lang(query.from_user.id), "start_2"),
                parse_mode=ParseMode.HTML,
                reply_markup=InlineKeyboardMarkup(
                    inline_keyboard=[
                        [
                            InlineKeyboardButton(
                                s(get_lang(query.from_user.id), "start_3"),
                                switch_inline_query=""
                            )
                        ],
                        [
                            InlineKeyboardButton(
                                s(get_lang(query.from_user.id), "start_4"),
                                f"https://t.me/{(await query.bot.me).username}?startgroup=start"
                            )
                        ],
                        [
                            InlineKeyboardButton(
                                "Language",
                                callback_data="lang"
                            )
                        ]
                    ]
                )
            )
