from io import BytesIO
from urllib.parse import urlencode

from aiogram.types import User
from http_client import client

from .config import IMAGE_SERVER_PUBLIC_ADDRESS


async def create_image(track: dict, user: User) -> BytesIO:
    url = IMAGE_SERVER_PUBLIC_ADDRESS + '?' + urlencode(
        {
            'image': track['album']['cover'],
            'user': user.first_name,
            'title': track['title'],
            'artist': track['artist']['name'],
            'bot': 't.me/deezerhistorybot',
        },
    )
    response = await client.get(url)
    content = response.content
    bytes_io = BytesIO(content)
    bytes_io.name = 'image.jpeg'
    return bytes_io
