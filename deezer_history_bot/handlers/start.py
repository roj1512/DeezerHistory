from aiogram.types import InlineKeyboardButton
from aiogram.types import InlineKeyboardMarkup
from aiogram.types import Message
from aiogram.types import ParseMode

from ..database.access import set_access


async def handler(message: Message):
    if message.chat.type == 'private':
        if (
                len(message.text.split()) == 2
                and message.text.split()[1].startswith('sak')
                and len(message.text.split()[1][3:].strip().rstrip()) != 0
        ):
            set_access(message.from_user.id, message.text.split()[1][3:].strip().rstrip())
            await message.reply('Credentials updated!')
        else:
            await message.reply(
                text="""
I can let others know what you were listening to on Deezer.

Use /connect for steps on connecting your account or /commands to know my commands.
                """,
                parse_mode=ParseMode.HTML,
                reply_markup=InlineKeyboardMarkup(
                    inline_keyboard=[
                        [
                            InlineKeyboardButton(
                                'Use me inline',
                                switch_inline_query='',
                            ),
                        ],
                        [
                            InlineKeyboardButton(
                                'Add me to a group',
                                f'https://t.me/{(await message.bot.me).username}?startgroup=start',
                            ),
                        ],
                    ],
                ),
            )
    elif message.chat.type in ('group', 'supergroup'):
        await message.reply('I’m on the go.')
