from io import BytesIO
from urllib.parse import urlencode

from httpx import AsyncClient

from .config import IMAGE_SERVER_ADDRESS

httpx = AsyncClient()


async def create_image(image: str, user: str, title: str, artist: str, bot: str = 't.me/deezerhistorybot') -> BytesIO:
    response = await httpx.get(IMAGE_SERVER_ADDRESS + '?' + urlencode({'image': image, 'user': user, 'title': title, 'artist': artist, 'bot': bot}))
    bytesio = BytesIO(response.content)
    bytesio.name = 'image.jpeg'
    return bytesio
