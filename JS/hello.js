let greetingTime;
let activeUser;

function initGreeting() {
    checkDayTime();
    replaceDayTime();
    replaceName();

    // setTimeout(() => {
    //     location.href = 'https://gruppe-329.developerakademie.net/Join/templates/summary.html';
    //   }, "2000")  

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

function replaceName() {
    document.getElementById('greetingName').innerHTML = activeUser;
}