import os


from flask import Flask, jsonify, render_template

from pymongo import MongoClient
import json
from flask import jsonify
import pandas as pd
import numpy as np


from routes import alroute
from routes import edroute
from routes import maroute
from routes import raroute
from routes import teroute

app = Flask(__name__)


app.register_blueprint(alroute.bp)
app.register_blueprint(edroute.bp)
app.register_blueprint(maroute.bp)
app.register_blueprint(raroute.bp)
app.register_blueprint(teroute.bp)


## legacy code
connectionString = "mongodb://dbAdmin:Vol8e3v5XLGYrwTK@cluster0-shard-00-00-0dend.mongodb.net:27017,cluster0-shard-00-01-0dend.mongodb.net:27017,cluster0-shard-00-02-0dend.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
dbClient = MongoClient(connectionString)
db = dbClient["84ad9547-499c-40e3-a02e-fcf4f8714871"]

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/api/0/operations")
def operations():

    _pipeline = [
            {
                '$match': {
                    # **match
                    # "companyId"
                }
            }, 
            {
                '$sort': {
                    'createdDate': -1
                }
            }, 
            {
                '$skip': 0
            }, 
            {
                '$limit': 200
            }, 
            {
                '$addFields': {
                    'op.businessUnitId.value': '$businessUnitId', 
                    'op.plantId.value': '$plantId', 
                    'op.workOrderId.value': '$workOrderId', 
                    'op.userId.value': '$userId', 
                    'op.userName.value': '$userName', 
                    'op.createdDate.value': '$createdDate', 
                    'op.firebaseId.value': '$firebaseId'
                }
            }, 
            {
                '$project': {
                    'op': {
                        '$objectToArray': '$op'
                    }
                }
            }, 
            {
                '$project': {
                    'op': {
                        '$map': {
                            'input': '$op', 
                            'as': 'x', 
                            'in': {
                                'k': '$$x.k', 
                                'v': '$$x.v.value'
                            }
                        }
                    }
                }
            }, 
            {
                '$project': {
                    'op2': {
                        '$arrayToObject': '$op'
                    }
                }
            }, 
            {
                '$replaceRoot': {
                    'newRoot': '$op2'
                }
            }
        ]

    operationsDBDocs = db.operations.aggregate(_pipeline)
        
    df = pd.DataFrame(list(operationsDBDocs)).fillna(0)
    df = df.set_index('firebaseId')
    result = {
        'data':  json.loads(df.to_json(orient='records')),
        'meta_data': json.loads(df.describe().to_json())
    }
    return jsonify(result)

@app.route("/api/0/workorders")
def workorders():

    _pipeline = [
            {
                '$match': {
                    # **match
                    # "companyId"
                }
            }, 
            {
                '$sort': {
                    'createdDate': -1
                }
            }, 
            {
                '$skip': 0
            }, 
            {
                '$limit': 50
            },
            {
                '$project': {
                    '_id': 0,
                    'id': 1,
                    'plantId': 1,
                    'businessUnitId': 1,
                    'status': 1,
                    'name': 1,
                    'summary': 1,
                    'createdDate': 1
                    # 'logs': 1
                }
            }
            
        ]

    workOrdersDBDocs = db.workorders.aggregate(_pipeline)
    # for x in workOrdersDBDocs:
        # print(x)

    # df = pd.DataFrame(list(workOrdersDBDocs))
    # print(df.head(5))
    df = pd.DataFrame(list(workOrdersDBDocs)).fillna(0)
    df = df.set_index('id')
    result = {
        'data':  json.loads(df.to_json(orient='records'))
        # 'data':  json.loads(df.to_json()),
    }
    return jsonify(result)


@app.route("/api/eroute/workorders")
def eroute_workorders():

    _pipeline = [
            {
                '$match': {
                    # **match
                    # "companyId"
                }
            }, 
            {
                '$sort': {
                    'createdDate': -1
                }
            }, 
            {
                '$skip': 0
            }, 
            {
                '$limit': 50
            },
            {
                '$project': {
                    '_id': 0,
                    # 'id': 1,
                    'plantId': 1,
                    # 'businessUnitId': 1,
                    # 'status': 1,
                    # 'name': 1
                    # 'summary': 1,
                    # 'createdDate': 1
                    # 'logs': 1
                }
            },
            {
               "$group":{
                   "_id":"$plantId",
                   "count": {"$sum":1}
               }
            },
            {
                '$addFields': {
                    'y': 9
                }
            }
            
        ]

    workOrdersDBDocs = db.workorders.aggregate(_pipeline)
    # for x in workOrdersDBDocs:
        # print(x)

    # df = pd.DataFrame(list(workOrdersDBDocs))
    # print(df.head(5))
    df = pd.DataFrame(list(workOrdersDBDocs)).fillna(0)
    # df = df.set_index('id')
    result = {
        'data':  json.loads(df.to_json(orient='records'))
        # 'data':  json.loads(df.to_json()),
    }
    return jsonify(result)

if __name__ == "__main__":
    app.run()
