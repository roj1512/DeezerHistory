from pymongo import MongoClient

from ..config import DB_URI

client = MongoClient(DB_URI)
db = client.callsmusic
