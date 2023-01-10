from pymongo import MongoClient

client = MongoClient("mongodb+srv://test:sparta@cluster0.cmogexc.mongodb.net/?retryWrites=true&w=majority")
db = client.dbsparta

#웹스크래핑 bs4 패키지 추가
import requests
from bs4 import BeautifulSoup

#Flask 기본 코드
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/')
def home():
   return render_template('login.html')

@app.route('/main')
def start():
   return render_template('main.html')

@app.route('/login', methods=['POST'])
def login_post():
   id_receive = request.form['id_give']
   password_receive = request.form['password_give']

   # headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
   # data = requests.get('',headers=headers)
   # soup = BeautifulSoup(data.text, 'html.parser')

   doc = {
   'id': id_receive,
   'password':password_receive
   }

   db.login.insert_one(doc)
   
   return jsonify({'msg':'저장 완료'})

@app.route("/login", methods=["GET"])
def login_get():
   login_list = list(db.login.find({}, {'_id': False}))
   return jsonify({'login_list': login_list})

if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)