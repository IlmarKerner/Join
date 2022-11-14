const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function initSummary() {
    checkIfLogged();
    showNumberOfTasks();
    showNumberOfTasksAwaitingFeedback();
    showNextCardAwaiting();
    initGreetingSummary();
}

function showNumberOfTasks() {
    let boardNumber = document.getElementById('tasksInBoard');
    boardNumber.innerHTML = '';
    boardNumber.innerHTML = tasks.length;
}

async function initGreetingSummary() {
    await downloadFromServer();
    let activeUser = JSON.parse(backend.getItem('currentUser')) || []; // load all users
    checkDayTime();
    replaceDayTimeSummary();
    replaceNameSummary(activeUser);
}

function replaceDayTimeSummary() {
    document.getElementById('dayTime').innerHTML = greetingTime;
}

function replaceNameSummary(activeUser) {
    document.getElementById('greeting_Name').innerHTML = activeUser[0];
}


function showNumberOfTasksAwaitingFeedback() {
    let progressNumber = 0;
    let awaitingFeedback = 0;
    let toDo = 0;
    let tasksDone = 0;
    let urgent = 0;
    let awaitingFeedbacks = document.getElementById('awaitingFeedback');
    let progressNumbers = document.getElementById('tasksInProgress');
    let toDos = document.getElementById('toDo');
    let taskDone = document.getElementById('done');
    let urgents = document.getElementById('urgent');
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['progress'] == 'awaitingFeedback') {
            awaitingFeedback++;
        }
        if (tasks[i]['progress'] == 'inProgress') {
            progressNumber++;
        }
        if (tasks[i]['progress'] == 'toDo') {
            toDo++;
        }
        if (tasks[i]['progress'] == 'done') {
            tasksDone++;
        }
        if (tasks[i]['prio'] == 'urgent') {
            urgent++;
        }
    }
    awaitingFeedbacks.innerHTML = awaitingFeedback;
    progressNumbers.innerHTML = progressNumber;
    toDos.innerHTML = toDo;
    taskDone.innerHTML = tasksDone;
    urgents.innerHTML = urgent;
}


function showNextCardAwaiting() {
    let nextcard = document.getElementById('deadlineDate');
    nextcard.innerHTML = `${findMinDate()}`;
}

function findMinDate() {
    let dates = tasks.map(({dueDate}) => new Date(dueDate));
    let minDate = new Date(Math.min(...dates));
    // let maxDate = new Date(Math.max(...dates)); not in use

    let month = monthNames[minDate.getMonth()];
    let year = minDate.toISOString().split('T')[0].slice(0, 4);
    let day = minDate.toISOString().split('T')[0].slice(-2);

    return month + ' ' + day + ',' + ' ' + year;
}
