# 📚 Book Mark Saver

향해99 12기 12조 토이프로젝트 23.01.09 - 23.01.12

## 팀원

| 팀원   | 스택         | 팀원구분 | 깃허브                                          | 블로그                                                   |
| ------ | ------------ | -------- | ----------------------------------------------- | -------------------------------------------------------- |
| 김선중 | `프론트엔드` | `팀장`   | [Seogun95](https://github.com/Seogun95)         | [서근개발노트]('https://seons-dev.tistory.com/')         |
| 박성인 | `프론트엔드` | 팀원     | [Adult96](https://github.com/Adult96)           | [Adult퐉]('https://adult.tistory.com/')                  |
| 나도관 | `백엔드`     | 팀원     | [DOGWANNA](https://github.com/DOGWANNA)         | [개발 꿈나무의 성장일기]('https://9401ndk.tistory.com/') |
| 신경연 | `백엔드`     | 팀원     | [bestfarmer94](https://github.com/bestfarmer94) | [bestfarmer]('https://velog.io/@bestfarmer')             |

## 프로젝트 소개

**Book Mark Saver**에 로그인을 하고 본인만의 프라이빗한 웹사이트를 저장해보세요! 

카테고리별 / 태그별로 저장도 가능하고 필요하다면 삭제까지!

 깔끔한 UI를 통해 저장하려는 웹사이트의 이미지와 타이틀을 확인하실 수 있습니다.



## 프로젝트 시연 영상

[Book Mark Saver Youtube]('https://youtu.be/2X9BvUnaZJQ')

## 기술 스택

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white"><img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white"><img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">

<img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"><img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white">

## 사용한 라이브러리

[toastr]('https://codeseven.github.io/toastr/'), [tagify]('https://yaireo.github.io/tagify/'), [AOS]('https://michalsnik.github.io/aos/')

## API Table

| Index | Method | URL            | Desc                               | Request                     | Response                      |
| ----- | ------ | -------------- | ---------------------------------- | --------------------------- | ----------------------------- |
| 1     | `POST` | /login         | 로그인/회원가입                    | id, password, passwordCheck | /token                        |
| 2     | `POST` | /token         | 토큰 및 쿠키생성                   | id, password                | token /main                   |
| 3     | `GET`  | /main          | 메인화면(쿠키O), 로그인화면(쿠키X) |                             | /show_bookmark or login.html  |
| 4     | `POST` | /show_bookmark | 메인화면 리스트생성                | (id)                        | bookmarks_list, category_list |
| 5     | `POST` | /save_bookmark | 북마크 추가                        | (id) url, comment, category | /show_bookmark                |
| 6     | `POST` | /delete        | 북마크 삭제                        | number                      | /main                         |

## 구현 기능

------

### 1. 메인 페이지

![CleanShot 2023-01-14 at 18 02 09](https://user-images.githubusercontent.com/76584961/212464545-995c421b-fca8-4d5d-bd22-7469f39ad8e4.png)

typing 텍스트 효과를 포함한 메인 홈 페이지. 바로 시작하기 클릭시 로그인 페이지로 이동

### 2. 로그인 페이지

![CleanShot 2023-01-14 at 18 03 22](https://user-images.githubusercontent.com/76584961/212464563-5b43bf5a-2cd5-4dd7-a0da-d403adc58b25.png)

`PyJWT` 방식으로 쿠키를 사용해 구현. 회원 가입 버튼 클릭시 `input`이 추가되며 회원가입을 진행 할 수 있다. 중복 아이디 또는 맞지 않은 패스워드를 입력시 `Toastr` 라이브러리를 사용한 `Toast` 메세지가 나타난다.

### 3. 메인 페이지
![image-20230114165524196](https://user-images.githubusercontent.com/76584961/212464577-326adf10-0cdc-4b3a-8330-b328488ec45e.png)
![image](https://user-images.githubusercontent.com/76584961/212464618-bdca6691-c800-4527-b582-799142da9f72.png)

![CleanShot 2023-01-14 at 16 54 14](https://user-images.githubusercontent.com/76584961/212464590-64bd1ff5-0fb9-4759-ae45-d8ce3ef3f24f.gif)

저장할 사이트의 URL, 카테고리, 태그를 입력하게 되면 해당 웹사이트의 썸네일과 클릭해 이동할 수 있는 링크, 카테고리와 태그가 나타나게 됩니다. 그리고 북마크버튼을 누르게 되면 위 메인 페이지 이미지 처럼 아래에 포스트카드 형식으로 뿌려지게 됩니다.

#### 3-1 구현 화면

