############
import os
import pymongo
import json
from bson import json_util, ObjectId
from bson.json_util import dumps
import requests
from flask import Flask, render_template, Markup, request, redirect, jsonify

############
# import zipfile
# import pathlib
# from pathlib import Path
# ############
# from collections import defaultdict
import re
# import string
# ############
# import pandas as pd
# from datetime import datetime
# ############
# import heapq


# Create an instance of Flask
app = Flask(__name__)
MONGO_URL = os.environ.get('MONGO_URL')

myclient = pymongo.MongoClient(MONGO_URL, maxPoolSize=50, connect=True)
# stuff = {'text':'BLANK','count':0}
# data_path = 'static/data/'
# unzip_path = 'static/data/unzip/'



@app.route('/', methods=['GET', 'POST', 'OPTIONS'])
def home():
    """Landing page."""
    return render_template("index.html")


@app.route('/team', methods=['GET', 'POST'])
def team():
    return render_template('team.html')


@app.route("/readfull/<search_word>")
def finddocs(search_word):

    print('Starting query...')
    print(search_word)
    mydb = myclient["finalproject"]
    mycol = mydb["recipes"]
    
    ############
    myquery =  {"name" : { '$regex' : search_word }}
    #myquery = {'_id': ObjectId("5e15044c9bad15d0f41f740b")}
    ############

    cursor = json.loads(dumps(mycol.find(myquery)))
    
    myclient.close()
    #print(list(cursor))
    print(jsonify(list(cursor)))

    return jsonify(list(cursor))

# @app.route('/team', methods=['GET', 'POST'])
# def team():
#     if request.method == 'POST':
#         # do stuff when the form is submitted

#         # redirect to end the POST handling
#         # the redirect can be to the same route or somewhere else
#         return redirect(url_for('index'))

#     # show the form, it wasn't submitted
#     return render_template('team.html')

# @app.route('/index', methods=['GET', 'POST'])
# def team():
#     if request.method == 'POST':
#         # do stuff when the form is submitted

#         # redirect to end the POST handling
#         # the redirect can be to the same route or somewhere else
#         return redirect(url_for('index'))

#     # show the form, it wasn't submitted
#     return render_template('team.html')


@app.route("/detail/<search_oid>")
def details(search_oid):
    
    print('got to detail...')
    print(search_oid)
    
    mydb = myclient["finalproject"]
    mycol = mydb["recipes"]

    myquery = {'_id': ObjectId(search_oid)}
    #myquery = {'_id': ObjectId("5e15044c9bad15d0f41f740f")}

    cursor = json.loads(dumps(mycol.find(myquery)))
    
    myclient.close()
    print(list(cursor))
    print(jsonify(list(cursor)))
    return jsonify(list(cursor))


if __name__ == "__main__":
    app.run(debug=True)
