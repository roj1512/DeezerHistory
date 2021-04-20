from aiogram.types import Message
from aiogram.types import ParseMode
from httpx import AsyncClient

from .. import get
from ..access import get_history
from ..errors import errors

httpx = AsyncClient()


@errors
async def handler(message: Message):
    if message.chat.type == 'private':
        await message.reply('You should send this in a group!')
    else:
        track: dict = (await get_history(message.from_user.id))[get.indent(message)]
        await message.reply_photo(
            photo=track['album']['cover_xl'],
            caption=get.lt_text(track, message.from_user),
            parse_mode=ParseMode.HTML,
            reply_markup=get.lt_reply_markup(track),
        )
