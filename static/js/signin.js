const loginBtn = document.querySelector('#login-btn');
const signUpBtn = document.querySelector('#sign-up-btn');
const signUpCheckBtn = document.querySelector('#sign-up-check');

const idInput = document.querySelector('#floatingId');
const passwordInput = document.querySelector('#floatingPassword');
const passwordCheckInput = document.querySelector('#floatingPasswordCheck');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userId = idInput.value;
    const userPassword = passwordInput.value;

    if (!loginCrossCheck(userId, userPassword)) {
        return;
    }

    // const userID = sendUserData(userId, userPassword);
    if (!sendUserData(userId, userPassword)) {
        return;
    }

    window.location.href = './main';
});

signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    selectorShowOrHide(false, loginBtn, signUpBtn);
    selectorShowOrHide(true, passwordCheckInput, signUpCheckBtn);
});

signUpCheckBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userId = idInput.value;
    const password = passwordInput.value;
    const passwordCheck = passwordCheckInput.value;

    if (!singupCrossCheck(userId, password, passwordCheck)) {
        return;
    }

    if (!sendUserData(userId, password, passwordCheck)) {
        return;
    }

    selectorShowOrHide(true, loginBtn, signUpBtn);
    selectorShowOrHide(false, passwordCheckInput, signUpCheckBtn);
});

function singupCrossCheck(userId, password, otherPassword) {
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

function loginCrossCheck(userId, password) {
    if (userId === '' || password === '') {
        alert('공백란을 채워 주세요');
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

function sendUserData(id, password, passwordCheck = null) {
    let checkData = true;

    $.ajax({
        type: 'POST',
        url: '/login',
        data: {
            id_give: id,
            pw_give: password,
            pw_check_give: passwordCheck,
        },
        async: false,
        success: function (response) {
            if (response['complete']) {
                alert(response['complete']);
                // checkData = response['complete'];
            } else if (response['create']) {
                alert(response['create']);
            } else if (response['fail']) {
                alert(response['fail']);
                checkData = false;
            } else {
                alert(response['error']);
                checkData = false;
            }
        },
        error: function () {
            alert('로그인 정보가 없습니다.');
            checkData = false;
        },
    });
    return checkData;
}

// function getUserData() {
//     console.log(1);
//     let data = {};
//     $.ajax({
//         type: 'GET',
//         url: '/login',
//         data: {},
//         async: false,
//         success: function (response) {
//             console.log(response);
//             data = response;
//         },
//         error: function () {
//             alert('로그인 정보가 없습니다.');
//             return false;
//         },
//     });
//     return data;
// }
