from io import BytesIO
from urllib.parse import urlencode

from aiogram.types import User

from .config import IMAGE_SERVER_ADDRESS
from .http_client import client


async def create_image(track: dict, user: User) -> BytesIO:
    url = IMAGE_SERVER_ADDRESS + '?' + urlencode(
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
