from pymongo import MongoClient
from bson.json_util import dumps, CANONICAL_JSON_OPTIONS, RELAXED_JSON_OPTIONS 
import json

_mongoClusterUri_ = "mongodb://dbAdmin:Vol8e3v5XLGYrwTK@cluster0-shard-00-00-0dend.mongodb.net:27017,cluster0-shard-00-01-0dend.mongodb.net:27017,cluster0-shard-00-02-0dend.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"


dbClient = MongoClient(_mongoClusterUri_)
db = dbClient["84ad9547-499c-40e3-a02e-fcf4f8714871"]

def decodeBSON(bsonDocument):
    # http://api.mongodb.com/python/current/api/bson/json_util.html
    return json.loads(dumps(bsonDocument, json_options=RELAXED_JSON_OPTIONS))
    # return dumps(usersDBDocs, json_options=RELAXED_JSON_OPTIONS)

def getConnection(databaseName):
    if not databaseName:
        pass
        # raise AxException(**kwargs)

    return dbClient[databaseName]