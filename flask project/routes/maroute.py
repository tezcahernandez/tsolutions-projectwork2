import json
import pandas as pd
import numpy as np

from flask import Blueprint, render_template, abort
from flask import jsonify
from .utils.mongoConnection import dbClient

bp = Blueprint('maroute', __name__, url_prefix='/maroute')
                        
@bp.route('/test')
def show():
    try:
        return jsonify({ "status": True, "data": {}, "message": " " })
    except Exception as e:
        print(type(e))    # the exception instance
        print(e.args)     # arguments stored in .args
        print(e)
        return jsonify({ "status": False, "data": [] })

@bp.route("/operations")
def operations():
    db = dbClient["84ad9547-499c-40e3-a02e-fcf4f8714871"]
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

@bp.route("/users")
def user():
    db = dbClient["84ad9547-499c-40e3-a02e-fcf4f8714871"]

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
                '$limit': 500
            },
            {
                '$project': {
                    '_id': 0,
                    'id': 1,
                    'plantId': 1,
                    'businessUnitId': 1,
                    'name': 1,
                    'secundaryRole': 1,
                    'userName': 1,                    
                    'dateCreated': 1
                    # 'logs': 1
                }
            }
            
        ]
    
    workOrdersDBDocs = db.users.aggregate(_pipeline)
    df = pd.DataFrame(list(workOrdersDBDocs)).fillna(0)
    df = df.set_index('id')
    result = {
        'data':  json.loads(df.to_json(orient='records'))
    }
    return jsonify(result)

@bp.route("/workorders/<unit>")
def workorders(unit):
    db = dbClient["84ad9547-499c-40e3-a02e-fcf4f8714871"]

    _pipeline = [
            {
                '$match': {
                    "businessUnitId": {'$gte':unit}
                }
            }, 
            {
                '$skip': 0
            }, 
            {
                '$project': {
                    '_id': 0,
                    'status': 1,
                }
            },
            {
                '$group': {
                    '_id': '$status',
                        'count':{
                            '$sum':1
                        }
                }
            }            
            
        ]
    
    workOrdersDBDocs = db.workorders.aggregate(_pipeline)
    df = pd.DataFrame(list(workOrdersDBDocs)).fillna(0)
    # df = df.set_index('id')
    result = {
        'data':  json.loads(df.to_json(orient='records'))
    }
    return jsonify(result)

@bp.route("/businessunits")
def businessunits():
    db = dbClient["84ad9547-499c-40e3-a02e-fcf4f8714871"]

    _pipeline = [
            {
                '$skip': 0
            }, 
            {
                '$project': {
                    '_id':0,
                    'id':1,
                    'name':1,
                }
            }
            
        ]
    
    businessunitsDBDocs = db.businessunits.aggregate(_pipeline)
    df = pd.DataFrame(list(businessunitsDBDocs)).fillna(0)
    # df = df.set_index('id')
    result = {
        'data':  json.loads(df.to_json(orient='records'))
    }
    return jsonify(result)

