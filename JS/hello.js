let greetingTime;
let activeUser;

async function initGreeting() {
    await downloadFromServer();
    activeUser = JSON.parse(backend.getItem('currentUser')) || []; // load all users
    checkDayTime();
    replaceDayTime();
    replaceName(activeUser);

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

    console.log(activeUser[0]);
    document.getElementById('greetingName').innerHTML = activeUser[0];
}