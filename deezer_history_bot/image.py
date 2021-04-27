from urllib.parse import urlencode

from aiogram.types import User

from .config import IMAGE_SERVER_PUBLIC_ADDRESS


async def create_image(track: dict, user: User) -> str:
    return IMAGE_SERVER_PUBLIC_ADDRESS + '?' + urlencode(
        {
            'image': track['album']['cover'],
            'user': user.first_name,
            'title': track['title'],
            'artist': track['artist']['name'],
            'bot': 't.me/deezerhistorybot',
        },
    )
