from aiogram.types import Message
from aiogram.types import ParseMode
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
            await create_image(track['album']['cover'], message.from_user.first_name, track['title'], track['artist']['name']),
            caption=get.lt_text(
                track, message.from_user,
            ),
            parse_mode=ParseMode.HTML,
            reply_markup=get.lt_reply_markup(track),
        )
