from aiogram.types import InlineKeyboardButton
from aiogram.types import InlineKeyboardMarkup
from aiogram.types import Message
from aiogram.types import ParseMode


async def handler(message: Message):
    if message.chat.type == 'private':
        await message.reply(
            """
<b>Private</>
/connect - get steps on connecting your Deezer account.
/commands - send this list.

<b>Groups</>
/status - show others what you were listening to, pass a number to show a different track.
Example usage:

<b>Inline</>
You can always use me inline to do the same thing /status does but in anywhere and without adding me.
Type @DeezerHistoryBot in the message box, pass a number to get a different track.
            """,
            parse_mode=ParseMode.HTML,
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
