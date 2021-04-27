from . import db
from ..errors import Error

collection = db.access


def get_access(user_id: int) -> str:
    find = collection.find_one({'user_id': user_id})
    if not find:
        raise Error('AccessError: Not authorized')
    return find['access']


def set_access(user_id: int, access: str):
    collection.update_one(
        {
            'user_id': user_id,
        },
        {
            '$set': {
                'access': access,
            },
        },
        upsert=True,
    )
