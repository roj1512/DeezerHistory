from httpx import AsyncClient
from aiogram.types import Message, ParseMode

from ..access import get_history
from .. import get
from ..errors import errors
from ..strings import get_string

httpx = AsyncClient()


@errors
async def handler(message: Message):
    if message.chat.type == "private":
        await message.reply(get_string("status_1"))
    else:
        track: dict = (await get_history(message.from_user.id))[get.indent(message)]

        if "album" in track:
            await message.reply_photo(
                photo=track["album"]["cover_xl"],
                caption=get.lt_text(track, message.from_user),
                parse_mode=ParseMode.HTML,
                reply_markup=get.lt_reply_markup(track),
            )
        else:
            await message.reply(
                text=get.lt_text(track, message.from_user),
                parse_mode=ParseMode.HTML,
                disable_web_page_preview=True,
                reply_markup=get.lt_reply_markup(track),
            )
