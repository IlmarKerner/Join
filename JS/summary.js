function showNumberOfTasks() {
    let boardNumber = document.getElementById('tasksInBoard');
    boardNumber.innerHTML = '';
    boardNumber.innerHTML = tasks.length;
}

function showNumberOfTasksInProgress() {
    let progressNumber = document.getElementById('tasksInProgress');
    progressNumber.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        progressNumber.innerHTML = tasks[i]['progress'].length;
    }
}

function showNumberOfTasksAwaitingFeedback() {
    let progressNumber = document.getElementById('awaitingFeedback');
    progressNumber.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        progressNumber.innerHTML = tasks[i]['progress'].length;
    }
}

function showNumberOfTasksToDo() {
    let progressNumber = document.getElementById('toDo');
    progressNumber.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        progressNumber.innerHTML = tasks[i]['progress'].length;
    }
}

function showNumberOfTasksDone() {
    let progressNumber = document.getElementById('done');
    progressNumber.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        progressNumber.innerHTML = tasks[i]['progress'].length;
    }
}