setURL('http://gruppe-329.developerakademie.net/Join/smallest_backend_ever');



let users = [];

async function init() {
    await downloadFromServer();
    let allUsersAsString = localStorage.getItem('users'); //ändern zu backend
    users = JSON.parse(allUsersAsString);
    // users = JSON.parse(backend.getItem('users')) || []; // load all users
    renderContent();
    checkIfAutocomplete();
}

function addUser() {
    let name = document.getElementById('register_name');
    let email = document.getElementById('register_email');
    let password = document.getElementById('register_password');
    users.push({name: name.value, email: email.value.toLowerCase(), password: password.value});
    let allUsersAsString = JSON.stringify(users);
    localStorage.setItem('users', allUsersAsString); // ändern zu backend
    document.getElementById('success_animation').classList.remove('d-none');

    setTimeout(() => {
        location.href = 'https://gruppe-329.developerakademie.net/Join/templates/index.html';
      }, "1000")  
}

let counter = 0;

function login() {

    let email = document.getElementById('login_email');
    let password = document.getElementById('login_password');

    let user = users.find( u => u.email.toLowerCase() == email.value.toLowerCase() && u.password == password.value) 
    if (user) {
        console.log('user gefunden');
        document.getElementById('wrong_login').classList.add('d-none');
        location.href = 'https://gruppe-329.developerakademie.net/Join/templates/board.html';
        counter = 0;
        rememberMe();
    } else {
        counter++;
        document.getElementById('wrong_login').classList.remove('d-none');
        if (counter >= 2) {
            animateForgotPassword();
        }
    }
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

    if (localStorage.getItem('email') !== null) {
        email.value = localStorage.email.toLowerCase();
        password.value = localStorage.password;
    }
}