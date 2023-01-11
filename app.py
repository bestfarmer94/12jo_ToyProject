import json

from pymongo import MongoClient

client = MongoClient("mongodb+srv://toyproject:sparta@cluster0.pahczrd.mongodb.net/?retryWrites=true&w=majority")
db = client.dbsparta

# 웹스크래핑 bs4 패키지 추가
import requests
from bs4 import BeautifulSoup

# Flask 기본 코드
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


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
        'password': password_receive
    }

    db.login.insert_one(doc)

    return jsonify({'msg': '저장 완료'})


@app.route("/login", methods=["GET"])
def login_get():
    login_list = list(db.login.find({}, {'_id': False}))
    return jsonify({'login_list': login_list})


@app.route("/save_bookmark", methods=["POST"])
def save_bookmark():
    # json -> dictionary
    bookmark_data = json.loads(request.form["data_give"])
    id_receive = bookmark_data["id"]
    url_receive = bookmark_data["url"]
    category_receive = bookmark_data["category"]
    comment_receive = bookmark_data["comment"]

    bookmark_list = list(db.bookmarks.find({"id": id_receive, "url": url_receive}, {'_id': False}))

    if len(bookmark_list) != 0:
        return jsonify({"msg": "이미 가지고 있는 url 입니다."})

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')

    title = soup.select_one('meta[property="og:title"]')['content']
    image = soup.select_one('meta[property="og:image"]')['content']

    new_bookmark = {
        "title": title,
        "image": image,
        "id": id_receive,
        "url": url_receive,
        "category": category_receive,
        "comment": comment_receive
    }
    db.bookmarks.insert_one(new_bookmark)

    category_list = list(db.categories.find({"id": id_receive, "category": category_receive}, {'_id': False}))

    if len(category_list) == 0:
        new_category = {
            "category": category_receive,
            "id": id_receive
        }
        db.categories.insert_one(new_category)

    return jsonify({"msg": "저장 완료"})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
