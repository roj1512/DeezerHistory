from aiogram.types import InlineQuery

from ..access import get_history
from .. import get
from ..strings import get_string


async def handler(query: InlineQuery):
    try:
        history = await get_history(query.from_user.id)

        await query.answer(
            results=get.inline_results(query, history),
            cache_time=0,
            is_personal=True,
        )
    except:
        await query.answer(
            results=[],
            cache_time=0,
            is_personal=True,
            switch_pm_text=get_string("inline_1"),
            switch_pm_parameter="start",
        )
