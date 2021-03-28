from motor.motor_asyncio import AsyncIOMotorClient

from ..config import DB_URI

client = AsyncIOMotorClient(DB_URI)
db = client.callsmusic
