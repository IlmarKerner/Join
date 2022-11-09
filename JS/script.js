

function renderContent() {
    console.log('just do IT');
}

function loadMenuBar() {
    document.getElementById('menubar').load("menu.html");
}

// let loggedUser;

function checkIfLogged() {

    let loggedUser;

    if (!sessionStorage.getItem(loggedUser, 'logged')) {
        localStorage.removeItem('token')
        navigator.sendBeacon('api/logout')
        location.href = 'index.html';
      }
}