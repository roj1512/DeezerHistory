from ..database.access import get_access
from ..errors import Error
from ..http_client import client


async def get_history(user_id: int) -> list:
    result = (await client.get(f'https://api.deezer.com/user/me/history?access_token={get_access(user_id)}')).json()
    if 'error' in result:
        raise Error(f"{result['error']['type']}: {result['error']['message']}")
    else:
        return result['data']
