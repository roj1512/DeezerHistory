from aiogram.types import Message
from httpx import AsyncClient

from .. import get
from ..access import get_history
from ..errors import errors
from ..image import create_image

httpx = AsyncClient()


@errors
async def handler(message: Message):
    if message.chat.type == 'private':
        await message.reply('You should send this in a group!')
    else:
        track: dict = (await get_history(message.from_user.id))[get.indent(message)]
        await message.reply_photo(
            photo=await create_image(track, message.from_user),
            reply_markup=get.lt_reply_markup(track),
        )
