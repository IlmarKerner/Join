let urgent = false;
let medium = false;
let low = false;
let currentDraggedItem;

async function initBoard() {
    checkIfLogged();
    await downloadFromServer();
    loadTasks();
    updateTasksPercent();
    updateToDo();
    updateInProgress();
    updateAwaitingFeedback();
    updateDone();
    fillInAssinged();
    checkProgressBar();
}

function updateTasksPercent() {
    for (let i = 0; i < tasks.length; i++) {
        let element = tasks[i];
        element['tasksPercent'] = '';
        element['tasksPercent'] = element['tasksDone'] / element['tasksOverall'] * 100;
    }
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
    checkProgressBar();
    initBoard();
}


function allowDrop(ev) {
    ev.preventDefault();
}


function drop(progress) {
    tasks[currentDraggedItem]['progress'] = progress;
    initBoard();
}


function openPopUp(id) {
    document.getElementById('popUpArea').classList.remove('dNone');
    document.getElementById('popUpArea').innerHTML = '';
    document.getElementById('popUpArea').innerHTML = popUpContent(id);
    checkMediaforBoard(mediaforBoard);
    fillInTaskAssignPopup(id);
}


function closePopUp() {
    document.getElementById('popUpArea').classList.add('dNone');
    document.querySelector('.board_content').classList.remove('dNone');
}


function openPopUpEdit(id) {
    document.getElementById('popUpArea').innerHTML = '';
    document.getElementById('popUpArea').innerHTML = popUpEditContent(id);
    renderEditTaskCard(id);
    visualAssignedPerson(id)
    updatePrio(id);

}


function cardContent(Element, i) {
    return /*html*/`
    <div id="${Element['id']}" onclick="openPopUp(${Element['id']})" draggable="true" ondragstart="startDragging(${Element['id']})"
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
                <div class="progress-bar" role="progressbar" style="width: ${Element['tasksPercent']}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="board_progress">
                ${Element['tasksDone']}/${Element['tasksOverall']} Done
            </div>
        </div>
        <div class="assinged_contacts_row">
            <div class="initials_contacts">
                
            </div>
            <div class="urgency_icon">
                <img src="../img/${Element['prio']}.png">
            </div>
        </div>
    </div>
    `;
}


function fillInAssinged() {
    clearInitialContainer();
    for (let i = 0; i < tasks.length; i++) {
        let taskContainer = document.getElementById(`${i}`);
        let initialsContainer = taskContainer.children[4].children[0];
        for (let j = 0; j < tasks[i]['initials'].length; j++) {
            let initials = tasks[i]['initials'][j];
            initialsContainer.innerHTML += `<div class="assinged_contacts" id="assinged_contacts${j+1}" style="background-color:${getColorForName(initials)}">${initials}</div>`;
        }
    }
}

function clearInitialContainer() {
    for (let i = 0; i < tasks.length; i++) {
        let taskContainer = document.getElementById(`${i}`);
        let initialsContainer = taskContainer.children[4].children[0];
        initialsContainer.innerHTML = '';
    }
}

function clearInitialContainerTaskPopup() {
    let taskAssign = document.getElementById('taskAssignContainer');
    taskAssign.innerHTML = '';
}


function popUpContent(id) {
    element = tasks[id];
    return /*html*/`
    <div class="dragcard_popup" id="dragcard_popup">
        <div class="categorycard">
            <p>${element['category']}</p>
        </div>
        <div onclick="closePopUp()" class="closebutton">
            <img src="../img/clear.png">
        </div>
        <div class="headerdescription">
            <h1>${element['headline']}</h1>
        </div>
        <div class="description_dragcard_pupup">
            <p>${element['description']}</p>
        </div>
        <div class="dragcard_popup_frame_1">
            <h2>Due date:</h2>
            <p id="dueDate">${element['dueDate']}</p>
        </div>
        <div class="dragcard_popup_frame_2">
            <h2>Priority:</h2>
            <img src="../img/${element['prio']}button.png">
        </div>
        <div class="dragcard_popup_frame_3">
            <h2>Assignet To:</h2>
        </div>
        <div class="dragcard_popup_frame_4" id="dragcardPopupListning">
            <div class="underframe1" id="taskAssignContainer">
                 <!-- JAVASCRIPT fillInTaskAssignPopup   -->
            </div>
        </div>
        <div onclick="openPopUpEdit(${id})" class="edit_button_dragcard_popup">
            <img src="../img/edit button.png">
        </div>
    </div>
    `;
}

function fillInTaskAssignPopup(id) {
    let taskAssign = document.getElementById('taskAssignContainer');
    clearInitialContainerTaskPopup();
    for (let i = 0; i < tasks[id]['assignet'].length; i++) {
        let initials = tasks[id]['initials'][i];
        let fullName = tasks[id]['assignet'][i];

        taskAssign.innerHTML += /*html*/`
        <div class="assign_container_popup">
            <div style="background-color:${getColorForName(initials)}">
                <h4 >${initials}</h4>
            </div>
            <p>${fullName}</p>
        </div>
        `;
    }
}

function fillInTaskAssign() {
    for (let i = 0; i < tasks.length; i++) {
        let taskContainer = document.getElementById(`${i}`);
        let initialsContainer = taskContainer.children[4].children[0];
        for (let j = 0; j < tasks[i]['assignet'].length; j++) {
            let initials = tasks[i]['assignet'][j]['initials'];
            initialsContainer.innerHTML += `<div class="assinged_contacts" id="assinged_contacts${j+1}">${initials}</div>`;
        }
    }
}


function popUpEditContent(id) {
    element = tasks[id];
    return /*html*/`
    <div class="task_popup_window_2">
        <div onclick="closePopUp()" class="closebutton">
            <img src="../img/clear.png">
        </div>
        <div class="task_popup_window_2_title task_popup_window_2_container">
            <h3>Title</h3>
            <input id="title${id}" value="${element['headline']}" type="text" placeholder="Title....">
        </div>
        <div class="task_popup_window_2_description task_popup_window_2_container">
            <h3>Description</h3>
            <textarea id="description${id}" cols="30" rows="10" placeholder="Description....">${element['description']}</textarea>
        </div>
        <div class="task_popup_window_2_date task_popup_window_2_container">
            <h3>Due date</h3>
            <input id="dueDate${id}" value="${element['dueDate']}" type="date">
        </div>
        <div class="task_popup_window_2_prio task_popup_window_2_container">
            <h3>Prio</h3>
            <div class="task_popup_window_2_prio_images">
                <div onclick="changeUrgent(${id})"><img src="../img/Urgentbuttonwhite.png" id="urgentimg"></div>
                <div onclick="changeMedium(${id})"><img src="../img/mediumbuttonwhite.png" id="mediumimg"></div>
                <div onclick="changeLow(${id})"><img src="../img/lowbuttonwhite.png" id="lowimg"></div>
            </div>
        </div>
        <div class="task_popup_window_2_assign task_popup_window_2_container">
            <h3>Assigned to</h3>
            <select class="select_assign" id="select_assign_edit">
                <!-- JAVASCRIPT renderEditTaskCard -->
            </select>
            <div class="visual_assign" id="visual_assign_edit">
                <!-- JAVASCRIPT visualAssignedPerson -->
            </div>
        </div>
        <div onclick="popUpEditSave(${id})"class="accept_button">
            <img src="../img/Primary check button V1.png">
        </div>
    </div>
    `;
}

function renderEditTaskCard() {
    let select = document.getElementById('select_assign_edit');
    select.innerHTML = '';
    sortContacts();
    
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        select.innerHTML += `<option value="" onclick="addAssignEdit(${i})" id="option${i}"><div class="test">${contact['first_name']} ${contact['second_name']}</div></option>`
    }
}

function addAssignEdit(i) {
    let option = document.getElementById(`option${i}`);

    if(!assignedPersons.includes(option.innerHTML)){
        assignedPersons.push(option.innerHTML);
        visualAssignedPersonEdit(i);
    }
}

function visualAssignedPersonEdit(id) {
    let container = document.getElementById('visual_assign_edit');
    let assignedPerson = tasks[id]['assignet'];
    container.innerHTML = '';
    for (let i = 0; i < assignedPerson.length; i++) {
        const person = assignedPerson[i];
        container.innerHTML += `
        <div class="assigned_person">
            <span id="assigned_person${i}">${person}</span>
            <b class="delete_btn_assigned_person" onclick="deleteAssignedPersonBoard(${id}, ${i})">x<b>
        </div>`
    }
}

function deleteAssignedPersonBoard(id, i) {
    tasks[id]['assignet'].splice(i, 1);
    tasks[id]['initials'].splice(i, 1);
    visualAssignedPerson(id);
    initBoard();
}

function updatePrio(id) {
    let element = tasks[id];
    if (element['prio'] == "urgent") {
        document.getElementById('urgentimg').src = "../img/urgentbutton.png";
    }
    if (element['prio'] == "medium") {
        document.getElementById('mediumimg').src = "../img/mediumbutton.png";
    }
    if (element['prio'] == "low") {
        document.getElementById('lowimg').src = "../img/lowbutton.png";
    }
    console.log(document.getElementById('urgentimg').src);
}


function changeUrgent() {
    document.getElementById('urgentimg').src = "../img/urgentbutton.png";
    document.getElementById('mediumimg').src = "../img/mediumbuttonwhite.png";
    document.getElementById('lowimg').src = "../img/lowbuttonwhite.png";
    urgent = true;
    medium = false;
    low = false;
}


function changeMedium() {
    document.getElementById('mediumimg').src = "../img/mediumbutton.png";
    document.getElementById('urgentimg').src = "../img/urgentbuttonwhite.png";
    document.getElementById('lowimg').src = "../img/lowbuttonwhite.png";
    urgent = false;
    medium = true;
    low = false;
}


function changeLow() {
    document.getElementById('lowimg').src = "../img/lowbutton.png";
    document.getElementById('mediumimg').src = "../img/mediumbuttonwhite.png";
    document.getElementById('urgentimg').src = "../img/urgentbuttonwhite.png";
    urgent = false;
    medium = false;
    low = true;
}


async function popUpEditSave(id) {
    let element = tasks[id]
    savePrio(element);
    saveHeadline(id, element);
    saveDescription(id, element);
    saveDate(id, element);
    closePopUp();
    await saveTasks();
    initBoard();
}


function savePrio(element) {
    if (urgent == true) {
        element['prio'] = 'urgent';
    }
    if (medium == true) {
        element['prio'] = 'medium';
    }
    if (low == true) {
        element['prio'] = 'low';
    }
}


function saveHeadline(id, element) {
    element['headline'] = document.getElementById(`title${id}`).value;
}


function saveDescription(id, element) {
    element['description'] = document.getElementById(`description${id}`).value;
}


function saveDate(id, element) {
    element['dueDate'] = document.getElementById(`dueDate${id}`).value;
}


function getTaskIndex(taskcard) {
    return tasks.indexOf(taskcard);
}

function resetTasks() {
    let emptyTaskSearchInput = document.getElementById('searchTasks');
    if (emptyTaskSearchInput = '') {
        includeHTML();
    }
}

function checkProgressBar() {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task['progress'] == 'toDo') {
            task['tasksDone'] = '0';
        } else if (task['progress'] == 'inProgress') {
            task['tasksDone'] = '1';
        } else if (task['progress'] == 'awaitingFeedback') {
            task['tasksDone'] = '2';
        } else {
            task['tasksDone'] = '3';
        }
    }
}

function updateTasksPercent() {
    for (let i = 0; i < tasks.length; i++) {
        let element = tasks[i];
        element['tasksPercent'] = '';
        element['tasksPercent'] = element['tasksDone'] / element['tasksOverall'] * 100;
    }
}

function filterTask(event) {
    let emptyTaskSearchInput = document.getElementById('searchTasks');
    let searchString = event.target.value.toLowerCase();
    
    if (emptyTaskSearchInput.value == '') {
        initBoard();
    } else {
        let filteredTasks = tasks.filter((taskcard) => {
            return (
                taskcard['headline'].toLowerCase().includes(searchString) ||
                taskcard['category'].toLowerCase().includes(searchString) ||
                taskcard['prio'].toLowerCase().includes(searchString)
            );
        });
        updateToDoFilteredTasks(filteredTasks);
        updateInProgressFilteredTasks(filteredTasks);
        updateAwaitingFeedbackFilteredTasks(filteredTasks);
        updateDoneFilteredTasks(filteredTasks);
        fillInAssingedFilteredTasks();
    }
}


function updateToDoFilteredTasks(filteredTasks) {
    let todos = filteredTasks.filter(t => t['progress'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        let element = todos[i];
        document.getElementById('toDo').innerHTML += cardContent(element);
    }
}


function updateInProgressFilteredTasks(filteredTasks) {
    let inProgress = filteredTasks.filter(t => t['progress'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';
    for (let i = 0; i < inProgress.length; i++) {
        let element = inProgress[i];
        document.getElementById('inProgress').innerHTML += cardContent(element);
    }
}


function updateAwaitingFeedbackFilteredTasks(filteredTasks) {
    let awaitingFeedbacks = filteredTasks.filter(t => t['progress'] == 'awaitingFeedback');
    document.getElementById('awaitingFeedback').innerHTML = '';
    for (let i = 0; i < awaitingFeedbacks.length; i++) {
        let element = awaitingFeedbacks[i];
        document.getElementById('awaitingFeedback').innerHTML += cardContent(element);
    }
}


function updateDoneFilteredTasks(filteredTasks) {
    let dones = filteredTasks.filter(t => t['progress'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < dones.length; i++) {
        let element = dones[i];
        document.getElementById('done').innerHTML += cardContent(element);
    }
}

function fillInAssingedFilteredTasks() {
    clearInitialContainerFilteredTasks();
    for (let i = 0; i < tasks.length; i++) {
        if (document.getElementById(`${i}`)) {
        let taskContainer = document.getElementById(`${i}`);
        let initialsContainer = taskContainer.children[4].children[0];
        for (let j = 0; j < tasks[i]['initials'].length; j++) {
            let initials = tasks[i]['initials'][j];
            initialsContainer.innerHTML += `<div class="assinged_contacts" id="assinged_contacts${j+1}" style="background-color:${getColorForName(initials)}">${initials}</div>`;
        }
    }
    }
}

function clearInitialContainerFilteredTasks() {
    for (let i = 0; i < tasks.length; i++) {
        if (document.getElementById(`${i}`)) {
        let taskContainer = document.getElementById(`${i}`);
        let initialsContainer = taskContainer.children[4].children[0];
        initialsContainer.innerHTML = '';
        }
    }
}