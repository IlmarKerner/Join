/**
 * load the menu bar
 */
function loadMenuBar() {
    document.getElementById('menubar').load("menu.html");
}

/**
 * check if user already logged
 */
function checkIfLogged() {

    let loggedUser;

    if (!sessionStorage.getItem(loggedUser, 'logged')) {
        localStorage.removeItem('token')
        navigator.sendBeacon('api/logout')
        location.href = 'index.html';
        clearTasks();
        clearContacts();
      }
}