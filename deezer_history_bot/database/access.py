from ..errors import Error
from . import db

_access = db.access


async def get_access(user_id: int) -> str:
    find = await _access.find_one({"user_id": user_id})

    if not find:
        raise Error("AccessError: Not authorized")

    return find["access"]


async def set_access(user_id: int, access: str):
    await _access.update_one(
        {
            "user_id": user_id
        },
        {
            "$set": {
                "access": access
            }
        },
        upsert=True
    )
