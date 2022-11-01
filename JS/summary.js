const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
let progressNumber = 0;
let awaitingFeedback = 0;
let toDo = 0;
let tasksDone = 0;

function fillSummarywithInfos() {
    document.getElementById('awaitingFeedback').innerHTML = awaitingFeedback;
}

function showNumberOfTasks() {
    let boardNumber = document.getElementById('tasksInBoard');
    boardNumber.innerHTML = '';
    boardNumber.innerHTML = tasks.length;
}

function showNumberOfTasksAwaitingFeedback() {
    let progressNumber = document.getElementById('awaitingFeedback');
    progressNumber.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['progress'] == 'awaitingFeedback') {
            awaitingFeedback++;
        }
    }
}


// function showNumberOfTasksInProgress() {
//     let progressNumber = document.getElementById('tasksInProgress');
//     progressNumber.innerHTML = tasks['progress'];
// }

// function showNumberOfTasksAwaitingFeedback() {
//     let awaitingFeedbackNumber = document.getElementById('awaitingFeedback');
//     awaitingFeedbackNumber.innerHTML = '';
// }

// function showNumberOfTasksToDo() {
//     let toDoNumber = document.getElementById('toDo');
//     toDoNumber.innerHTML = '';
// }

// function showNumberOfTasksDone() {
//     let doneNumber = document.getElementById('done');
//     doneNumber.innerHTML = '';
// }