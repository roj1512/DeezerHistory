from . import db

collection = db.lang


def get_lang(user_id: int) -> str:
    find = collection.find_one({"user_id": user_id})

    if not find:
        return "en"

    return find["lang"]


def set_lang(user_id: int, lang: str):
    collection.update_one(
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
