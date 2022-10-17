let currentDraggedItem
let tasks = [{
        "id": 0,
        "progress": "toDo",
        "category": "Sales",
        "headline": "Test mit ID0",
        "description": "Modify the contents of the main website test test test test",
        "assignet": "",
        "dueDate": "22.12.2022",
        "prio": "medium",
        "subTask": "Make Icon",
    },
    {
        "id": 1,
        "progress": "inProgress",
        "category": "Sales",
        "headline": "Test mit ID1",
        "description": "Modify the contents of the main website test test test test",
        "assignet": "",
        "dueDate": "22.12.2022",
        "prio": "urgent",
        "subTask": "Make Icon",
    },
    {
        "id": 2,
        "progress": "done",
        "category": "Sales",
        "headline": "Test mit ID2",
        "description": "Modify the contents of the main website test test test test",
        "assignet": "",
        "dueDate": "22.12.2022",
        "prio": "urgent",
        "subTask": "Make Icon",
    },
    {
        "id": 3,
        "progress": "awaitingFeedback",
        "category": "Design",
        "headline": "Test mit ID3",
        "description": "Modify the contents of the main website test test test test",
        "assignet": "",
        "dueDate": "22.12.2022",
        "prio": "low",
        "subTask": "Make Icon",
    }
];


function initBoard() {
    updateToDo();
    updateInProgress();
    updateAwaitingFeedback();
    updateDone();
    renderContacts();
}


function updateToDo() {
    let todos = tasks.filter(t => t['progress'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        let element = todos[i];
        document.getElementById('toDo').innerHTML += cardContent(element);
    }
}


function updateInProgress() {
    let inProgress = tasks.filter(t => t['progress'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';
    for (let i = 0; i < inProgress.length; i++) {
        let element = inProgress[i];
        document.getElementById('inProgress').innerHTML += cardContent(element);
    }
}


function updateAwaitingFeedback() {
    let awaitingFeedbacks = tasks.filter(t => t['progress'] == 'awaitingFeedback');
    document.getElementById('awaitingFeedback').innerHTML = '';
    for (let i = 0; i < awaitingFeedbacks.length; i++) {
        let element = awaitingFeedbacks[i];
        document.getElementById('awaitingFeedback').innerHTML += cardContent(element);
    }
}


function updateDone() {
    let dones = tasks.filter(t => t['progress'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < dones.length; i++) {
        let element = dones[i];
        document.getElementById('done').innerHTML += cardContent(element);
    }
}


function addDropPosition() {
    document.getElementById('toDoDropPosition').classList.remove('dNone');
    document.getElementById('inProgressDropPosition').classList.remove('dNone');
    document.getElementById('awaitingFeedbackDropPosition').classList.remove('dNone');
    document.getElementById('doneDropPosition').classList.remove('dNone');
}


function removeDropPosition() {
    document.getElementById('toDoDropPosition').classList.add('dNone');
    document.getElementById('inProgressDropPosition').classList.add('dNone');
    document.getElementById('awaitingFeedbackDropPosition').classList.add('dNone');
    document.getElementById('doneDropPosition').classList.add('dNone');
}


function startDragging(id) {
    currentDraggedItem = id;
    addDropPosition();

    console.log(currentDraggedItem);
    console.log('start');
}


function endDragging() {
    removeDropPosition();
    console.log('end');
}


function allowDrop(ev) {
    ev.preventDefault();
}


function drop(progress) {
    tasks[currentDraggedItem]['progress'] = progress;
    initBoard();
}


function cardContent(Element) {
    return `
    <div id="${Element['id']}" draggable="true" ondragstart="startDragging(${Element['id']})"
        ondragend="endDragging()" class="task_card">
    <span class="card_category" id="cardCategory">
        ${Element['category']}
    </span>
    <span class="card_headline">
        ${Element['headline']}
    </span>
    <span class="card_description">
        ${Element['description']}
    </span>
    <div class="board_progress_row">
        <div class="progress">
            <div class="progress-bar w-50" role="progressbar" aria-label="Basic example"
                aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="board_progress">
            1/2 Done
        </div>

    </div>
    <div class="assinged_contacts_row">
        <div class="initials_contacts">
            <div class="assinged_contacts1">IK</div>
            <div class="assinged_contacts2">DF</div>
            <div class="assinged_contacts3">LN</div>
        </div>
        <div class="urgency_icon">
            <img src="../img/${Element['prio']}.png">
        </div>

    </div>
    `;
}