const loginBtn = document.querySelector('#login-btn');
const signUpBtn = document.querySelector('#sign-up-btn');
const signUpCheckBtn = document.querySelector('#sign-up-check');

const idInput = document.querySelector('#floatingId');
const passwordInput = document.querySelector('#floatingPassword');
const passwordCheckInput = document.querySelector('#floatingPasswordCheck');

loginBtn.addEventListener('click', () => {
    const userId = idInput.value;
    const userPassword = passwordInput.value;

    dbLoginCheck(userId, userPassword);
});

signUpBtn.addEventListener('click', () => {
    selectorShowOrHide(false, loginBtn, signUpBtn);
    selectorShowOrHide(true, passwordCheckInput, signUpCheckBtn);
});

signUpCheckBtn.addEventListener('click', () => {
    const userId = idInput.value;
    const password = passwordInput.value;
    const passwordCheck = passwordCheckInput.value;

    if (!userCrossCheck(userId, password, passwordCheck)) {
        return;
    }

    selectorShowOrHide(true, loginBtn, signUpBtn);
    selectorShowOrHide(false, passwordCheckInput, signUpCheckBtn);
});

function userCrossCheck(userId, password, otherPassword) {
    if (userId === '' || password === '' || otherPassword === '') {
        alert('공백란을 채워 주세요');
        return false;
    }
    if (password !== otherPassword) {
        alert('비밀 번호를 재입력 해주세요');
        return false;
    }

    return true;
}

function dbLoginCheck(id, password) {
    const userdb = getUserData();

    userdb.forEach((dbList) => {
        if (dbList[`id`] !== id && dbList[`password`] !== password) {
            return false;
        }

        return true;
    });
}

function dbsignUpCheck(id) {
    const userdb = getUserData();

    if (userdb[`${id}`] === undefined) {
        return false;
    }

    return true;
}

function selectorShowOrHide(boolean, ...selectors) {
    if (boolean === true) {
        selectors.map((selector) => (selector.style.display = 'block'));
    } else {
        selectors.map((selector) => (selector.style.display = 'none'));
    }
}

function sendUserData(id, password) {
    $.ajax({
        type: 'POST',
        url: '/homework',
        data: {
            id_give: id,
            password_give: password,
        },
        success: function (response) {
            alert(response['msg']);
        },
        error: function () {
            alert('로그인 정보가 없습니다.');
        },
    });
}

function getUserData() {
    let data = {};
    $.ajax({
        type: 'GET',
        url: '/homework',
        data: {},
        async: false,
        success: function (response) {
            data = response;
        },
        error: function () {
            alert('로그인 정보가 없습니다.');
            return false;
        },
    });

    return data;
}
