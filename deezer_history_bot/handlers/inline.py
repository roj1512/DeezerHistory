from aiogram.types import InlineQuery

from .. import get
from ..access import get_history
from ..strings import multilingual


@multilingual
async def handler(query: InlineQuery, s):
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
            switch_pm_text=s("inline_1"),
            switch_pm_parameter="start",
        )
