let greetingTime;
let activeUser;

async function initGreeting() {
    await downloadFromServer();
    activeUser = JSON.parse(backend.getItem('currentUser')) || []; // load all users
    checkDayTime();
    replaceDayTime();
    replaceName(activeUser);
    saveContacts();
    saveTasks();

    setTimeout(() => {
        location.href = 'https://gruppe-329.developerakademie.net/Join/templates/summary.html';
    }, "2000")

}


function checkDayTime() {

    let today = new Date()
    let curHr = today.getHours()

    if (curHr < 12) {
        greetingTime = 'Good morning';
    } else if (curHr < 18) {
        greetingTime = 'Good afternoon';
    } else {
        greetingTime = 'Good evening';
    }
}

function replaceDayTime() {
    document.getElementById('day_time').innerHTML = greetingTime;
}

function replaceName(activeUser) {
    document.getElementById('greetingName').innerHTML = activeUser;
}

function replaceDayTimeInSummary() {
    document.getElementById('dayTime').innerHTML = greetingTime;
}

function replaceNameInSummary(activeUser) {
    document.getElementById('greeting_Name').innerHTML = activeUser;
}