let contactSectionOpen = false;
let selectTaskBoxOpen = false;
let urgentImage = false;
let mediumImage = false;
let lowImage = false;
let prio;
let subtask = [];
let assignedPersons = [];

function renderAddTask() {
    loadTasks();
    let select = document.getElementById('select_assign');
    select.innerHTML = '';
    sortContacts();
    
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        select.innerHTML += `<option value="" onclick="addAssign(${i})" id="option${i}"><div class="test">${contact['first_name']} ${contact['second_name']}</div></option>`
    }
}

function addAssign(i) {
    let option = document.getElementById(`option${i}`);

    if(!assignedPersons.includes(option.innerHTML)){
        assignedPersons.push(option.innerHTML);
        visualAssignedPerson();
    }
}

function visualAssignedPerson() {
    let container = document.getElementById('visual_assign');
    container.innerHTML = '';
    for (let i = 0; i < assignedPersons.length; i++) {
        const person = assignedPersons[i];
        container.innerHTML += `
        <div class="assigned_person">
            <span id="assigned_person${i}">${person}</span>
            <b class="delete_btn_assigned_person" onclick="deleteAssignedPerson(${i})">x<b>
        </div>`
    }
}

function deleteAssignedPerson(i) {
    let select = document.getElementById(`assigned_person${i}`).innerHTML;
    let index = assignedPersons.indexOf(select, 0);
    assignedPersons.splice(index, 1);
    visualAssignedPerson();
}

function addSubTask() {
    let subtasks = document.getElementById('addNewSubtask').value;
    subtask.push(subtasks);
    subtasks.value = '';
    document.getElementById('subtask').innerHTML = '';
    for (let i = 0; i < subtask.length; i++) {
        document.getElementById('subtask').innerHTML += `
        <div><input type="checkbox">${subtask[i]}</div>`;
    }
}

let globalIdForTaskCard = 0;
let initialsForTaskCard = [];

function createTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('category');
    let assign = document.getElementById('select_assign');
    let date = document.getElementById('date');
    checkWhichIdIsFree();
    getInitialsFromContacts();

    let taskCard = {
        "title": title.value,
        "description": description.value,
        "id": globalIdForTaskCard,
        "progress": taskProgress,
        "category": category.value,
        "date": date.value,
        "headline": title.value,
        "description": description.value,
        "dueDate": date.value,
        "prio": prio,
        "subTask": "Make Icon",
        "tasksOverall": 3,
        "tasksDone": 0,
        "tasksPercent": '',
        "assignet": assignedPersons,
        "initials": initialsForTaskCard,
    }

    tasks.push(taskCard);
    globalIdForTaskCard++;

    clearInputFieldsAddTask(title, description, category, assign, date);
    closeAddTaskPopup();
    saveTasks();
    initBoard();
}

async function saveTasks() {
    await backend.setItem('modyfiedTasks', JSON.stringify(tasks));
}

async function loadTasks() {
    tasks = JSON.parse(backend.getItem('modyfiedTasks')) || [];
}

function clearInputFieldsAddTask(title, description, category, assign, date) {
    title.value = '';
    description.value = '';
    category.value = '';
    assign.value = '';
    date.value = '';
}

function getInitialsFromContacts() {
    for (let i = 0; i < assignedPersons.length; i++) {
        const assignedPerson = assignedPersons[i];
        for (let j = 0; j < contacts.length; j++) {
            const contact = contacts[j];
            if(assignedPerson == contact['full_name']) {
                initialsForTaskCard.push(contact['initials'])
            }
        }
    }
}

function checkWhichIdIsFree() {
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        if (globalIdForTaskCard == element['id']) {
            globalIdForTaskCard++;
        } else {
            globalIdForTaskCard = i;
        }
    }
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
    renderAddTask();
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
            <select class="select_assign" id="select_assign" placeholder="Assignet to" required>

            </select>
            <div class="visual_assign" id="visual_assign"></div>
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

let mediaforBoard = window.matchMedia("(max-width: 992px)");

function checkMediaforBoard(mediaforBoard) {
    if (mediaforBoard.matches) {
        document.querySelector('.board_content').classList.add('dNone');
    } else {
        document.querySelector('.board_content').classList.remove('dNone');
    }
}

function restoreBoardContent() {
    document.querySelector('.board_content').classList.remove('d-none');
}