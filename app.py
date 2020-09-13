from flask import Flask, jsonify, make_response
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
from flask import request
from bson import ObjectId
import json

app = Flask(__name__)
# CORS(app, support_credentials=True)
app.config["MONGO_URI"] = "mongodb://localhost:27017/disaster-vibes"
mongo = PyMongo(app)
# ObjectId = require('mongodb').ObjectID;

def build_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response
def build_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/")
def index():
    return "<h1>Hello, world!</h1>",

@app.route("/test", methods=["OPTIONS", "GET"])
@cross_origin(supports_credentials=True)
def test():
    #if request.method == "OPTIONS": 
    #    return build_preflight_response()
    #elif request.method == "POST":
    #    return build_actual_response("test text")
    return jsonify({"test" : "test text"})

#returns contract found by id into database
@app.route("/contracts/<id>", methods=["GET"])
def get_contract(id):
    contract = mongo.db.contracts.find_one_or_404({"_id": ObjectId(id)})
    contract["_id"] = str(contract["_id"])
    return jsonify(contract)

#returns all contracts from database
@app.route("/contracts", methods=["GET"])
def get_all_contracts():
    cursor = mongo.db.contracts.find({})
    documents = []
    for document in cursor:
        # print(document)
        document["_id"] = str(document["_id"])
        documents.append(dict(document))
    return jsonify(documents)
    

#saves contract parameters found by id into database
#TODO: UPDATED VARIABLES NOT NEEDED BY FRONTEND
@app.route("/upload", methods=["POST"])
def save_contract():
    req_data = request.get_json()
    # req_data_template = json.load(req_data)
    returned = mongo.db.contracts.insert_one(req_data)
    print(returned)
    id = returned.inserted_id
    # return id + ""
    return str(id)
