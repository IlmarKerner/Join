let users = [];
let currentUser = [];

setURL('https://gruppe-329.developerakademie.net/smallest_backend_ever');


async function init() {
    enableLoadingAnimation()
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || []; // load all users
    renderContent();
    checkIfAutocomplete();
    disableLoadingAnimation();
}

async function addUser() {
    let name = document.getElementById('register_name');
    let email = document.getElementById('register_email');
    let password = document.getElementById('register_password');
    users.push({name: name.value, email: email.value.toLowerCase(), password: password.value});
    await backend.setItem('users', JSON.stringify(users)); // save users
    document.getElementById('success_animation').classList.remove('d-none');

    setTimeout(() => {
        location.href = 'index.html';
      }, "1000")  
}

let counter = 0;

async function login() {

    let email = document.getElementById('login_email');
    let password = document.getElementById('login_password');

    let user = users.find( u => u.email.toLowerCase() == email.value.toLowerCase() && u.password == password.value) 
    if (user) {
        console.log('user gefunden');
        document.getElementById('wrong_login').classList.add('d-none');
        currentUser.push(user['name']);
        await backend.setItem('currentUser', JSON.stringify(currentUser)); // save users
        counter = 0;
        rememberMe();
        location.href = 'hello.html';
    } else {
        counter++;
        document.getElementById('wrong_login').classList.remove('d-none');
        if (counter >= 2) {
            animateForgotPassword();
        }
    }
}

function guestLogin() {
    activeUser = 'guest';
    location.href = 'hello.html';
}

function animateForgotPassword() {
    document.getElementById('forgot_password_link').animate(
        [
            { transform: 'scale(1)' },
            { transform: 'scale(1.1)' },
            { transform: 'scale(1)' }
        ],
        {
            duration: 200,
            iterations: 3,
            direction: 'alternate'
        }
    );
}

function rememberMe() {

    let checkBox = document.getElementById('remember_me');
    let email = document.getElementById('login_email');
    let password = document.getElementById('login_password');

    if (checkBox.checked){
        localStorage.email = email.value.toLowerCase();
        localStorage.password = password.value;
        localStorage.checkbox = checkBox.value;
      } else {
        localStorage.email = "";
        localStorage.password = "";
        localStorage.checkbox = "";
      }
}

function checkIfAutocomplete() {

    let email = document.getElementById('login_email');
    let password = document.getElementById('login_password');
    let checkBox = document.getElementById('remember_me');

    if (localStorage.getItem('email') !== null) {
        email.value = localStorage.email.toLowerCase();
        password.value = localStorage.password;

        if(!checkBox.checked) {
            checkBox.click();
        }
    }
}

function enableLoadingAnimation() {
    document.getElementById('loading_animation').classList.remove('d-none');
}

function disableLoadingAnimation() {
    document.getElementById('loading_animation').classList.add('d-none');
}

async function logout() {
    users = JSON.parse(backend.getItem('users')) || []; // load all users
    await backend.deleteItem('currentUser'); // delete current User
}

