from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    ParseMode
)

from ..database.access import set_access
from ..database.lang import get_lang
from ..strings import get_string


async def handler(message: Message):
    if message.chat.type == "private":
        if (
                len(message.text.split()) == 2
                and message.text.split()[1].startswith("sak")
                and len(message.text.split()[1][3:].strip().rstrip()) != 0
        ):
            await set_access(message.from_user.id, message.text.split()[1][3:].strip().rstrip())
            await message.reply(get_string(await get_lang(message.from_user.id), "start_1"))
        else:
            await message.reply(
                text=get_string(await get_lang(message.from_user.id), "start_2"),
                parse_mode=ParseMode.HTML,
                reply_markup=InlineKeyboardMarkup(
                    inline_keyboard=[
                        [
                            InlineKeyboardButton(
                                get_string(await get_lang(message.from_user.id), "start_3"),
                                switch_inline_query=""
                            )
                        ],
                        [
                            InlineKeyboardButton(
                                get_string(await get_lang(message.from_user.id), "start_4"),
                                f"https://t.me/{(await message.bot.me).username}?startgroup=start"
                            )
                        ],
                        [
                            InlineKeyboardButton(
                                "🏳️‍🌈 Language",
                                callback_data="lang"
                            )
                        ]
                    ]
                )
            )
    elif message.chat.type in ("group", "supergroup",):
        await message.reply(get_string(await get_lang(message.from_user.id), "start_5"))