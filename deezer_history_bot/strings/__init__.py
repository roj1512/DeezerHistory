from typing import Union

from aiogram.types import Message, CallbackQuery, InlineQuery

from .strings import Strings
from ..config import STRINGS
from ..database.lang import get_lang

strings = Strings(STRINGS)
reload_strings = strings.reload_strings
get_string = strings.get_string
get_languages = strings.get_languages


def multilingual(func):
    async def decorator(_: Union[Message, CallbackQuery, InlineQuery]):
        return await func(
            _,
            lambda key: get_string(get_lang(_.from_user.id), key)
        )

    return decorator()
