
function renderContent() {
    console.log('just do IT');
}

function mailSend() {
    let email = document.getElementById('forgot_password_input').value;

    document.getElementById('forgot_password_span').innerHTML = `
    E-Mail was send to ${email} please check your email and follow the instructions
    `
}

function loadMenuBar() {
    document.getElementById('menubar').load("menu.html");
}