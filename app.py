from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

client = MongoClient("mongodb+srv://toyproject:sparta@cluster0.pahczrd.mongodb.net/?retryWrites=true&w=majority")
db = client.dbsparta

#웹스크래핑 bs4 패키지 추가
import requests
from bs4 import BeautifulSoup

#Flask 기본 코드
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/login', methods=['GET','POST'])
def login():
   if request.method == "POST":
      id_receive = request.form['id_give']
      pw_receive = request.form['pw_give']
      pw_check_receive = request.form['pw_check_give']


      if pw_check_receive == '':
         login = db.login.find_one({'id':id_receive}, {'_id': False})
         
         if login['password'] == str(pw_receive):
            return jsonify({'complete': '로그인 완료'})
      else:
         login_list = list(db.login.find({'id':id_receive}, {'_id': False}))
         check_cnt = len(login_list)

         print(login_list,check_cnt)

         if check_cnt > 0:
            return jsonify({'error':'동일한 아이디가 존재 합니다'})
         
         doc = {
         'id': id_receive,
         'password':pw_receive
         }

         db.login.insert_one(doc)
      
      return jsonify({'complete':'저장 완료'})
   else:
      return render_template('login.html')  

@app.route('/main')
def main():
   return render_template('main.html')

# @app.route('/login', methods=['POST'])
# def login_post():
#    id_receive = request.form['id_give']
#    pw_receive = request.form['pw_give']
#    pw_check_receive = request.form['pw_check_give']
#    # headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
#    # data = requests.get('',headers=headers)
#    # soup = BeautifulSoup(data.text, 'html.parser')

#    doc = {
#    'id': id_receive,
#    'password':generate_password_hash(password_receive)
#    }

#    print(doc)
#    # db.login.insert_one(doc)
#    print('get check', 'check')
#    return jsonify({'msg':'저장 완료'})

# @app.route("/login", methods=["GET"])
# def login_get():
#    print('get check', 'check')
#    login_list = list(db.login.find({}, {'_id': False}))
#    print(login_list,'get check')
#    return jsonify({'login_list': login_list})

@app.route("/show_bookmark", methods=["POST"])
def show_bookmark():
   id_receive = request.form["id_give"]
   bookmark_list = list(db.bookmarks.find({"id": id_receive}, {'_id': False}))
   return jsonify({'bookmark_list': bookmark_list})    

if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)


# @app.route('/login', methods=['POST',"GET"])
# def login():
#    if request.method == "POST":
#       id_receive = request.form['id_give']
#       password_receive = request.form['password_give']

#       doc = {
#       'id': id_receive,
#       'password':generate_password_hash(password_receive)
#       }

#       print(doc)
#       # db.login.insert_one(doc)
#       print('get check', 'check')
#       return jsonify({'msg':'저장 완료'})

#    elif request.method == "GET":
#       print('get check', 'check')
#       login_list = list(db.login.find({}, {'_id': False}))
#       print(login_list,'get check')
#       return jsonify({'login_list': login_list})

#    return render_template('login.html')   