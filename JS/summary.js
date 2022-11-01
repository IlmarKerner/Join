const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
let progressNumber = 0;
let awaitingFeedback = 0;
let toDo = 0;
let tasksDone = 0;
let urgent = 0;

function fillSummaryInfos() {
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i]['status'] == 'In progress') { tasksinProgress++; };
        if (tasks[i]['status'] == 'Awaiting feedback') { tasksawaitingFeedback++; };
        if (tasks[i]['priority'] == 'Urgent') { tasksUrgent++; if (transformDate(tasks[i]['dueDate']) > nextDeadlineofUrgentTasks) { nextDeadlineofUrgentTasks = transformDate(tasks[i]['dueDate']); }; };
        if (tasks[i]['status'] == 'To do') { taskstoDo++; };
        if (tasks[i]['status'] == 'Done') { tasksDone++; };
    }
}

function showNumberOfTasks() {
    let boardNumber = document.getElementById('tasksInBoard');
    boardNumber.innerHTML = '';
    boardNumber.innerHTML = tasks.length;
}

function showNumberOfTasksInProgress() {
    let progressNumber = document.getElementById('tasksInProgress');
    progressNumber.innerHTML = tasks['progress'];
}

function showNumberOfTasksAwaitingFeedback() {
    let progressNumber = document.getElementById('awaitingFeedback');
    progressNumber.innerHTML = '';
}

function showNumberOfTasksToDo() {
    let progressNumber = document.getElementById('toDo');
    progressNumber.innerHTML = '';
}

function showNumberOfTasksDone() {
    let progressNumber = document.getElementById('done');
    progressNumber.innerHTML = '';
}