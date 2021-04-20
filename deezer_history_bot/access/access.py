from httpx import AsyncClient

from ..database.access import get_access
from ..errors import Error

httpx = AsyncClient()
endpoint = 'https://api.deezer.com/'


async def get_history(user_id: int) -> list:
    result = (await httpx.get(f'{endpoint}user/me/history?access_token={get_access(user_id)}')).json()

    if 'error' in result:
        raise Error(f"{result['error']['type']}: {result['error']['message']}")
    else:
        return result['data']
