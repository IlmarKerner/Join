
let contactSectionOpen = false;
let selectTaskBoxOpen = false;
let urgentImage = false;
let mediumImage = false;
let lowImage = false;
let prio;
let taskCard = [{
    "id": "1",
    "title": "toDo",
    "category": "Sales",
    "description": "",
    "assignet": "",
    "date": "22.12.2022",
    "prio": "urgent",
    "subTask": "Make Icon",
}, ];
let subtask = [];

function addSubTask() {
    subtasks = document.getElementById('addNewSubtask').value;
    subtask.push(subtasks);
    subtasks.value = '';
    document.getElementById('subtask').innerHTML = '';
    for (let i = 0; i < subtask.length; i++) {
        document.getElementById('subtask').innerHTML += `
        <div><input type="checkbox">${subtask[i]}</div>`;
    }

}

function createTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('category');
    let assign = document.getElementById('assign');
    let date = document.getElementById('date');


    let taskCard = {
        "title": title.value,
        "description": description.value,
        "id": 1,
        "progress": taskProgress,
        "category": category.value,
        "assign": assign.value,
        "date": date.value,
        "headline": title.value,
        "description": description.value,
        "dueDate": date.value,
        "prio": prio,
        "subTask": "Make Icon", // ?
        "tasksOverall": 2, // ?
        "tasksDone": 1, // ?
        "tasksPercent": '', // ?
        "assignet": assign.value,
        "initials": '',
    }

    tasks.push(taskCard);

    title.value = '';
    description.value = '';
    category.value = '';
    assign.value = '';
    date.value = '';
   
    closeAddTaskPopup();
    initBoard();
}

function showSelctedContacts() {
    let selectbox = document.getElementById('assigned');
    if (!contactSectionOpen) {
        selectbox.classList.add('height210');
        selectbox.classList.add('transition');
        contactSectionOpen = true;
    } else {
        selectbox.classList.remove('height210');
        selectbox.classList.add('height51');
        contactSectionOpen = false;
    }
}

function selectTaskCategory() {
    let selectTaskBox = document.getElementById('selectTask');
    if (!selectTaskBoxOpen) {
        selectTaskBox.classList.add('height360');
        selectTaskBox.classList.add('transition');
        selectTaskBoxOpen = true;
    } else {
        selectTaskBox.classList.remove('height360');
        selectTaskBox.classList.add('height51');
        selectTaskBoxOpen = false;
    }
}

function changeImgUrgent() {
    document.getElementById('urgent').src = "../img/urgentbutton.png";
    document.getElementById('medium').src = "../img/mediumbuttonwhite.png";
    document.getElementById('low').src = "../img/lowbuttonwhite.png";
    prio = 'urgent';
}

function changeImgMedium() {
    document.getElementById('medium').src = "../img/mediumbutton.png";
    document.getElementById('urgent').src = "../img/urgentbuttonwhite.png";
    document.getElementById('low').src = "../img/lowbuttonwhite.png";
    prio = 'medium';
}

function changeImgLow() {
    document.getElementById('low').src = "../img/lowbutton.png";
    document.getElementById('medium').src = "../img/mediumbuttonwhite.png";
    document.getElementById('urgent').src = "../img/urgentbuttonwhite.png";
    prio = 'low';
}

function openAddTaskPopup(progress) {
    checkProgress(progress);
    document.querySelector('.addtask_popup').classList.remove('d-none');
    document.querySelector('.blur_container').style = "filter: blur(5px);";
    document.querySelector('.blur_container').classList.add('hidden');
    document.querySelector('.profilebar').style = "filter: blur(5px);";
    document.querySelector('.menu').style = "filter: blur(5px);";
    loadAddTaskPopupWindow();
    checkMediaforBoard(mediaforBoard);
    document.querySelector('.addtask_popup').classList.add('popup_window_slidein');
    setTimeout(() => {
        document.querySelector('.addtask_popup').style = "transform: translateX(0vw)";
    }, 300);

}

function closeAddTaskPopup() {
    document.querySelector('.addtask_popup').style = "animation: slideout 0.3s;"
    document.querySelector('.addtask_popup').classList.remove('popup_window_slidein');
    setTimeout(() => {
        document.querySelector('.addtask_popup').classList.add('d-none');
        document.querySelector('.blur_container').style = "filter: none;";
        document.querySelector('.blur_container').classList.remove('hidden');
        document.querySelector('.menu').style = "filter: none;";
        document.querySelector('.profilebar').style = "filter: none;";
        document.querySelector('.addtask_popup').style = "transform: translateX(100vw)";
        restoreBoardContent();
    }, 300);
}

let taskProgress;

function checkProgress(progress) {
    taskProgress = progress;
}

function loadAddTaskPopupWindow() {
    document.querySelector('.addtask_popup').innerHTML = addTaskPopupWindowContent();
}

function addTaskPopupWindowContent() {
    return /*html*/ `

<div class="tasks_popup">
    <h1>Add Task</h1>
    <div class="tasks_content">
        <div class="close_addtask_popup" id="closeAddTaskWindow" onclick="closeAddTaskPopup()">
            <img src="../img/clear.png">
        </div>
        <div class="left_task">
            <div class="title">
                <p>Title</p>
                <input type="text" placeholder="Enter a title" id="title">
            </div>
            <div class="description">
                <p>Description</p>
                <textarea type="text" placeholder="Enter a description" id="description"></textarea>
            </div>
            <div class="margin-top50">
                <p>Category</p>
            </div>
            <select class="select_task" id="category" placeholder="Select task category" required>
                <option>Select task category</option>
                <option>New Category</option>
                <option>Backoffice</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Media</option>
            </select>
            <div class="margin-top50">
                <p>Assignet to</p>
            </div>
            <select class="select_assign" id="assign" placeholder="Assignet to" required>
                <option>Select contacts to assign</option>
                <option>Lukas Neureiter</option>
                <option>Dennis Frese</option>
                <option>Ilmar Kerner</option>
            </select>
        </div>
        <div class="bar">
            <img src="../img/bar.png">
        </div>
        <div class="right-task">
            <div class="date">
                <p>Due date</p>
                <input type="date" placeholder="dd/mm/yyyy" id="date">
            </div>
            <div class="prio">
                <p>Prio</p>
                <div class="devision" id="devision">
                    <div onclick="changeImgUrgent()" class="urgent"><img id="urgent" src="../img/Urgentbuttonwhite.png"></div>
                    <div onclick="changeImgMedium()" class="medium"><img id="medium" src="../img/mediumbuttonwhite.png"></div>
                    <div onclick="changeImgLow()" class="low"><img id="low" src="../img/lowbuttonwhite.png"></div>
                </div>
            </div>
                <div class="subtask_container">
                <p class="subtaskheader">Subtasks</p>
                <div class="subtask">
                    <input type="text" id="addNewSubtask" placeholder="Add new subtask"><img src="../img/addsubtask.png" id="addTask" onclick="addSubTask()">
                </div>
                <div class="subtasks" id="subtask">
                    
                </div>
            </div>
        </div>
    </div>
    <div class="task_buttons" id="task_buttons">
        <button class="clear_button" id="clearButton" onclick="clearAddTask()">Clear<img
                src="../img/clear.png"></button>
        <button class="create_button" id="createButton" onclick="createTask()">Create Task <img
                src="..//img/create_task.png"></button>
    </div>
</div>
`
}

function clearAddTask() {

    openAddTaskPopup();
}


function saveInitialsToTask() {
    document.getElementById
}

let mediaforBoard = window.matchMedia("(max-width: 992px)");

function checkMediaforBoard(mediaforBoard) {

    if (mediaforBoard.matches) {
        document.querySelector('.board_content').classList.add('d-none');
    } else {
        document.querySelector('.board_content').classList.remove('d-none');
    }
}

function restoreBoardContent() {
    document.querySelector('.board_content').classList.remove('d-none');
}
