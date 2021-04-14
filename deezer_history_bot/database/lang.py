from ..errors import Error
from . import db

_lang = db.lang


async def get_lang(user_id: int) -> str:
    find = await _lang.find_one({"user_id": user_id})

    if not find:
        return "en"

    return find["access"]


async def set_lang(user_id: int, lang: str):
    await _lang.update_one(
        {
            "user_id": user_id
        },
        {
            "$set": {
                "lang": lang
            }
        },
        upsert=True
    )
