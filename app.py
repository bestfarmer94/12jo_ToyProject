from flask import Flask, render_template, request, jsonify
from bs4 import BeautifulSoup
import requests
import json
import hashlib
import datetime
import logging
import traceback
import jwt

from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

client = MongoClient(
    "mongodb+srv://toyproject:sparta@cluster0.pahczrd.mongodb.net/?retryWrites=true&w=majority")
db = client.dbsparta

# 웹스크래핑 bs4 패키지 추가

# Flask 기본 코드

app = Flask(__name__)

SECRET_KEY = "12jo"

#============================index home=====================
@app.route('/')
def home():
    return render_template('index.html')

#============================signin=====================

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        id_receive = request.form['id_give']
        pw_receive = request.form['pw_give']
        pw_check_receive = request.form['pw_check_give']

        hash_pw = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest();

        if pw_check_receive == '':
            login = db.login.find_one({'id': id_receive}, {'_id': False})

            if login['password'] == hash_pw:
                return jsonify({'complete': '로그인 완료'})
            else:
                return jsonify({'fail': '로그인 실패'})
        else:
            login_list = list(db.login.find(
                {'id': id_receive}, {'_id': False}))
            check_cnt = len(login_list)

            print(login_list, check_cnt)

            if check_cnt > 0:
                return jsonify({'error': '동일한 아이디가 존재 합니다'})

            doc = {
                'id': id_receive,
                'password': hash_pw
            }

            db.login.insert_one(doc)

        return jsonify({'create': '가입 완료'})
    else:
        return render_template('login.html')


@app.route("/token", methods=["POST"])
def make_token():
    id_receive = request.form['id_give']
    password_receive = request.form['password_give']

    hash_pw = hashlib.sha256(password_receive.encode('utf-8')).hexdigest();

    login_result = db.login.find_one({'id': id_receive, 'password': hash_pw}, {'_id': False})

    if login_result is not None:
        # jwt 토큰 사용 시, SECRET_KEY 가 있어야 payload값을 볼 수 있다.
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)  # 토큰 유효시간
        }
        # jwt 암호화
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        
        print('payload')
        # 로그인 시 token을 준다.
        return jsonify({'result': 'success', 'token': token})
				
    # 데이터가 없으면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})

#============================main=====================
@app.route('/main')
def main():
    token_receive = request.cookies.get('mytoken')
    
    print('토큰 받음')
    print(token_receive)
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        print(payload)
        return render_template('main.html', id = payload['id'])
    except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
        print(logging.error(traceback.format_exc()))
        return render_template('login.html')

#============================bookMark=====================

@app.route("/save_bookmark", methods=["POST"])
def save_bookmark():
    # json -> dictionary
    bookmark_data = json.loads(request.form["data_give"])
    id_receive = bookmark_data["id"]
    url_receive = bookmark_data["url"]
    category_receive = bookmark_data["category"]
    hash_receive = bookmark_data["hash"]

    all_list = list(db.bookmarks.find({}))
    if len(all_list) != 0:
        number = max(x["number"] for x in all_list) + 1
    else:
        number = 1

    bookmark_list = list(db.bookmarks.find(
        {"id": id_receive, "url": url_receive}, {'_id': False}))
    if len(bookmark_list) != 0:
        return jsonify({"error": "이미 가지고 있는 url 입니다."})

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')

    title = soup.select_one('meta[property="og:title"]')['content']
    image = soup.select_one('meta[property="og:image"]')['content']

    new_bookmark = {
        "number": number,
        "title": title,
        "image": image,
        "id": id_receive,
        "url": url_receive,
        "category": category_receive,
        "hash": hash_receive
    }
    db.bookmarks.insert_one(new_bookmark)

    category_list = list(db.categories.find(
        {"id": id_receive, "category": category_receive}, {'_id': False}))

    if len(category_list) == 0:
        new_category = {
            "category": category_receive,
            "id": id_receive
        }
        db.categories.insert_one(new_category)

    return jsonify({"msg": "저장 완료"})


@app.route("/show_bookmark", methods=["POST"])
def show_bookmark():
    id_receive = request.form["id_give"]
    bookmark_list = list(db.bookmarks.find({"id": id_receive}, {'_id': False}))
    return jsonify({'bookmark_list': bookmark_list})


@app.route("/delete", methods=["POST"])
def delete_bookmark():
    number_receive = request.form["number_give"]
    number = int(number_receive)
    db.bookmarks.delete_one({"number": number})
    return jsonify({"msg": "삭제 완료"})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

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
