from aiogram.types import InlineKeyboardButton
from aiogram.types import InlineKeyboardMarkup
from aiogram.types import Message


async def handler(message: Message):
    if message.chat.type == 'private':
        await message.reply(
            """
1. Login to your Deezer account in your browser if you haven’t, otherwise move to the next step.
2. Visit https://tgcalls.net/deezer.
3. Click “Continue”, after that “Accept”.
4. That should return you to Telegram, once you’re there click “Start”.
5. Done, you now can use my /commands!"
            """,
            reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[
                    [
                        InlineKeyboardButton(
                            text='Connect your account',
                            url='https://tgcalls.net/deezer',
                        ),
                    ],
                ],
            ),
        )
