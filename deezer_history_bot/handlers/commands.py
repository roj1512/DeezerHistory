from aiogram.types import InlineKeyboardButton
from aiogram.types import InlineKeyboardMarkup
from aiogram.types import Message


async def handler(message: Message):
    if message.chat.type == 'private':
        await message.reply(
            """
<b>Private</b>
/connect - get steps on connecting your Deezer account.
/commands - send this list.

<b>Groups</b>
/status - show others what you were listening to, pass a number to show a different track.

<b>Inline</b>
You can always use me inline to do the same thing /status does but in anywhere and without adding me.
Just type @DeezerHistoryBot in the message box.
            """,
            reply_markup=InlineKeyboardMarkup(
                inline_keyboard=[
                    [
                        InlineKeyboardButton(
                            text='Use me inline',
                            switch_inline_query='',
                        ),
                    ],
                ],
            ),
        )
