from pymongo import MongoClient

client = MongoClient("url")
db = client.dbsparta

#Flask 기본 코드
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/user', methods=['POST'])
def test_post():
   some_receive = request.form['some_give']

   doc = {
    'some': some_receive
   }

   db.mars.insert_one(doc)
   
   print(some_receive)
   return jsonify({'msg':'저장완료'})

@app.route("/mars", methods=["GET"])
def test_get():
    # all_something = list(db.mars.find({}, {'_id': False}))
    return jsonify({'msg': 'GET 연결 완료!'})

if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)