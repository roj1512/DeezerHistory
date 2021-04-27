from aiogram.types import InlineQuery

from .. import get
from ..access import get_history


async def handler(query: InlineQuery):
    try:
        await query.answer(
            results=await get.inline_results(query, await get_history(query.from_user.id)),
            cache_time=0,
            is_personal=True,
        )
    except Exception as e:
        switch_pm_text = str(e)
        if switch_pm_text in ('AccessError: Not authorized', 'OAuthException: Invalid OAuth access token.'):
            switch_pm_text = 'Not authorized!'
        await query.answer(
            results=[],
            cache_time=0,
            is_personal=True,
            switch_pm_text=switch_pm_text,
            switch_pm_parameter='start',
        )
