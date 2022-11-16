let urgent = false;
let medium = false;
let low = false;
let currentDraggedItem;

function initBoard() {
    // checkIfLogged(); -----------------------------------WIEDER AKTIVIEREN
    updateTasksPercent();
    updateToDo();
    updateInProgress();
    updateAwaitingFeedback();
    updateDone();
    fillInAssinged();
    // renderContacts();
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


function updateTasksPercent() {
    for (let i = 0; i < tasks.length; i++) {
        let element = tasks[i];
        element['tasksPercent'] = '';
        element['tasksPercent'] = element['tasksDone'] / element['tasksOverall'] * 100;
    }
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


function openPopUp(id) {
    document.getElementById('popUpArea').classList.remove('dNone');
    document.getElementById('popUpArea').innerHTML = '';
    document.getElementById('popUpArea').innerHTML = popUpContent(id);
}


function closePopUp() {
    document.getElementById('popUpArea').classList.add('dNone');
}


function openPopUpEdit(id) {
    document.getElementById('popUpArea').innerHTML = '';
    document.getElementById('popUpArea').innerHTML = popUpEditContent(id);
    updatePrio(id);

}


// function cardContent(Element, i) {
//     return `
//     <div id="${Element['id']}" onclick="openPopUp(${Element['id']})" draggable="true" ondragstart="startDragging(${Element['id']})"
//         ondragend="endDragging()" class="task_card">
//     <span class="card_category" id="cardCategory">
//         ${Element['category']}
//     </span>
//     <span class="card_headline">
//         ${Element['headline']}
//     </span>
//     <span class="card_description">
//         ${Element['description']}
//     </span>
//     <div class="board_progress_row">
//         <div class="progress">
//             <div class="progress-bar" role="progressbar" style="width: ${Element['tasksPercent']}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
//         </div>
//         <div class="board_progress">
//             ${Element['tasksDone']}/${Element['tasksOverall']} Done
//         </div>
//     </div>
//     <div class="assinged_contacts_row">
//         <div class="initials_contacts">
//             <div class="assinged_contacts1">LH</div>
//             <div class="assinged_contacts2">IK</div>
//             <div class="assinged_contacts3">DF</div>
//         </div>
//         <div class="urgency_icon">
//             <img src="../img/${Element['prio']}.png">
//         </div>

//     </div>
//     `;
// }


function cardContent(Element, i) {
    return `
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
            <div class="assinged_contacts1">LH</div>
            <div class="assinged_contacts2">IK</div>
            <div class="assinged_contacts3">DF</div>
        </div>
        <div class="urgency_icon">
            <img src="../img/${Element['prio']}.png">
        </div>

    </div>
    `;
}

// -------------------------------- TEST VON DF --------------------------------

function fillInAssinged() {
    clearInitialContainer();
    for (let i = 0; i < tasks.length; i++) {
        let taskContainer = document.getElementById(`${i}`);
        let initialsContainer = taskContainer.children[4].children[0];
        for (let j = 0; j < tasks[i]['assignet'].length; j++) {
            let initials = tasks[i]['assignet'][j]['initials'];
            initialsContainer.innerHTML += `<div class="assinged_contacts${j+1}">${initials}</div>`;
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

// -------------------------------- TEST VON DF --------------------------------

function popUpContent(id) {
    Element = tasks[id];
    return `
    <div class="dragcard_popup">
        <div class="categorycard">
            <p>${Element['category']}</p>
        </div>
        <div onclick="closePopUp()" class="closebutton">
            <img src="../img/clear.png">
        </div>
        <div class="headerdescription">
            <h1>${Element['headline']}</h1>
        </div>
        <div class="description_dragcard_pupup">
            <p>${Element['description']}</p>
        </div>
        <div class="dragcard_popup_frame_1">
            <h2>Due date:</h2>
            <p id="dueDate">${Element['dueDate']}</p>
        </div>
        <div class="dragcard_popup_frame_2">
            <h2>Priority:</h2>
            <img src="../img/${Element['prio']}button.png">
        </div>
        <div class="dragcard_popup_frame_3">
            <h2>Assignet To:</h2>
        </div>
        <div class="dragcard_popup_frame_4" id="dragcardPopupListning">
            <div class="underframe1">
                <div>
                    <h4>DE</h4>
                </div>
                <p>David Eisenberg</p>
            </div>
        </div>
        <div onclick="openPopUpEdit(${id})" class="edit_button_dragcard_popup">
            <img src="../img/edit button.png">
        </div>
    </div>
    `;
}


function popUpEditContent(id) {
    Element = tasks[id];
    return `
    <div class="task_popup_window_2">
        <div onclick="closePopUp()" class="closebutton">
            <img src="../img/clear.png">
        </div>
        <div class="task_popup_window_2_title">
            <h3>Title</h3>
            <input id="title${id}" value="${Element['headline']}" type="text" placeholder="Title....">
        </div>
        <div class="task_popup_window_2_description">
            <h3>Description</h3>
            <textarea id="description${id}" cols="30" rows="10" placeholder="Description....">${Element['description']}</textarea>
        </div>
        <div class="task_popup_window_2_date">
            <h3>Due date</h3>
            <input id="dueDate${id}" value="${Element['dueDate']}" type="date">
        </div>
        <div class="task_popup_window_2_prio">
            <h3>Prio</h3>
            <div class="task_popup_window_2_prio_images">
                <div onclick="changeUrgent(${id})"><img src="../img/Urgentbuttonwhite.png" id="urgentimg"></div>
                <div onclick="changeMedium(${id})"><img src="../img/mediumbuttonwhite.png" id="mediumimg"></div>
                <div onclick="changeLow(${id})"><img src="../img/lowbuttonwhite.png" id="lowimg"></div>
            </div>
        </div>
        <div class="task_popup_window_2_assign">
            <h3>Assigned to</h3>
            <select>
                <option>Select contacts to assign</option>
                <option value="ilmar">Ilmar Kerner</option>
                <option value="max">Lucas Neureiter</option>
                <option value="dennis">Dennis Frese</option>
            </select>
        </div>
        <div onclick="popUpEditSave(${id})"class="accept_button">
            <img src="../img/Primary check button V1.png">
        </div>
    </div>
    `;
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


function popUpEditSave(id) {
    let element = tasks[id]
    savePrio(element);
    saveHeadline(id, element);
    saveDescription(id, element);
    saveDate(id, element);
    closePopUp();
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



// function filterTask() {
//     const searchBar = document.getElementById('searchTasks').value;
//     searchBar.addEventListener('onkeyup', (e) => {
//         const searchString = e.target.value.toLowerCase();

//         const filteredTasks = tasks.filter((character) => {
//             return (
//                 character.headline.toLowerCase().includes(searchString) ||
//                 character.category.toLowerCase().includes(searchString)
//             );

//         });
//     })
// }

function filterTask(event) {
    let htmlString = document.getElementById('filter_container');
    let emptyTaskSearchInput = document.getElementById('searchTasks');
    let searchString = event.target.value.toLowerCase();
    let filteredTasks = tasks.filter((taskcard) => {
        if (emptyTaskSearchInput.value == '') {
            initBoard();
            htmlString.classList.add('dNone');
        } else {
            htmlString.classList.remove('dNone');
            return (
                taskcard['headline'].toLowerCase().includes(searchString) ||
                taskcard['category'].toLowerCase().includes(searchString) ||
                taskcard['prio'].toLowerCase().includes(searchString)
            );
        }
    });
    displayTasks(filteredTasks, htmlString);
}

function displayTasks(filteredTasks, htmlString) {
    
    htmlString.innerHTML = filteredTasks.map((taskcard) => {
            return `<div id="${tasks[getTaskIndex(taskcard)]['id']}" onclick="openPopUp(${tasks[getTaskIndex(taskcard)]['id']})" draggable="true" ondragstart="startDragging(${tasks[getTaskIndex(taskcard)]['id']})"
            ondragend="endDragging()" class="task_card">
        <span class="card_category" id="cardCategory">
            ${tasks[getTaskIndex(taskcard)]['category']}
        </span>
        <span class="card_headline">
            ${tasks[getTaskIndex(taskcard)]['headline']}
        </span>
        <span class="card_description">
            ${tasks[getTaskIndex(taskcard)]['description']}
        </span>
        <div class="board_progress_row">
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${tasks[getTaskIndex(taskcard)]['tasksPercent']}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="board_progress">
                ${tasks[getTaskIndex(taskcard)]['tasksDone']}/${tasks[getTaskIndex(taskcard)]['tasksOverall']} Done
            </div>
        </div>
        <div class="assinged_contacts_row">
            <div class="initials_contacts">
                <div class="assinged_contacts1">LH</div>
                <div class="assinged_contacts2">IK</div>
                <div class="assinged_contacts3">DF</div>
            </div>
            <div class="urgency_icon">
                <img src="../img/${tasks[getTaskIndex(taskcard)]['prio']}.png">
            </div>
    
        </div>`;
        })
        .join('');
};

function getTaskIndex(taskcard) {
    return tasks.indexOf(taskcard);
}

function resetTasks() {
    let emptyTaskSearchInput = document.getElementById('searchTasks');
    if (emptyTaskSearchInput = '') {
        includeHTML();
    }
}