const logOutBtn = document.querySelector('#logout_btn');

logOutBtn.addEventListener('click', () => {
    console.log(1);
    logout();
});

function logout() {
    $.removeCookie('mytoken');
    window.location.href = './login';
}
