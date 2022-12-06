/**
 * load content of board page
 */
async function initBoard() {
    checkIfLogged();
    await downloadFromServer();
    await loadTasks();
    updateTasksPercent();
    updateToDo();
    updateInProgress();
    updateAwaitingFeedback();
    updateDone();
    fillInAssinged();
    fillInCategory();
    checkProgressBar();
    animateNewTask();
}

/**
 * update percantage of every task
 */
function updateTasksPercent() {
    for (let i = 0; i < tasks.length; i++) {
        let element = tasks[i];
        element['tasksPercent'] = '';
        element['tasksPercent'] = element['tasksDone'] / element['tasksOverall'] * 100;
    }
}

/**
 * update category to do
 */
function updateToDo() {
    let todos = tasks.filter(t => t['progress'] == 'toDo');
    document.getElementById('toDo').innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        let element = todos[i];
        document.getElementById('toDo').innerHTML += cardContent(element);
    }
}

/**
 * update category in progress
 */
function updateInProgress() {
    let inProgress = tasks.filter(t => t['progress'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';
    for (let i = 0; i < inProgress.length; i++) {
        let element = inProgress[i];
        document.getElementById('inProgress').innerHTML += cardContent(element);
    }
}

/**
 * update category awaiting feedback
 */
function updateAwaitingFeedback() {
    let awaitingFeedbacks = tasks.filter(t => t['progress'] == 'awaitingFeedback');
    document.getElementById('awaitingFeedback').innerHTML = '';
    for (let i = 0; i < awaitingFeedbacks.length; i++) {
        let element = awaitingFeedbacks[i];
        document.getElementById('awaitingFeedback').innerHTML += cardContent(element);
    }
}

/**
 * update category done
 */
function updateDone() {
    let dones = tasks.filter(t => t['progress'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < dones.length; i++) {
        let element = dones[i];
        document.getElementById('done').innerHTML += cardContent(element);
    }
}

/**
 * get information to start drag and drop
 * @param {number} id - id of tasks which start drag & drop
 */
function startDragging(id) {
    currentDraggedItem = id;
}

/**
 * update tasks after dragging
 */
function endDragging() {
    checkProgressBar();
}

/**
 * need to allow drag & drop
 * @param {*} ev - event
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * update task category after dragging
 * @param {string} progress - category of task after dragging
 */
function drop(progress) {
    tasks[currentDraggedItem]['progress'] = progress;
    saveTasks();
    initBoard();
}

/**
 * open popup of task to see more informations
 * @param {number} id - number of position of task in array, tasks
 */
function openPopUp(id) {
    document.getElementById('popUpArea').classList.remove('dNone');
    document.getElementById('popUpArea').innerHTML = '';
    document.getElementById('popUpArea').innerHTML = popUpContent(id);
    checkMediaforBoard(mediaforBoard);
    fillInTaskAssignPopup(id);
}

/**
 * close popup of task
 */
function closePopUp() {
    document.getElementById('popUpArea').classList.add('dNone');
    document.querySelector('.board_content').classList.remove('dNone');
    if (succesAnimationPopup) {
        succesAnimationPopup.classList.remove('d-none');
    }
}

/**
 * open popup of task to edit it
 * @param {number} id - number of position of task in array, tasks
 */
function openPopUpEdit(id) {
    document.getElementById('popUpArea').innerHTML = '';
    document.getElementById('popUpArea').innerHTML = popUpEditContent(id);
    renderEditTaskCard(id);
    visualAssignedPersonEdit(id);
    updatePrio(id);

}

/**
 * fill in the category of every task
 */
async function fillInCategory() {
    await loadCategories();
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let categoryContainer = document.getElementById(`cardCategory${i}`);
        let category = tasks[i]['category'];

        for (let j = 0; j < categories.length; j++) {
            const element = categories[j];
            if (category == element[['name']]) {
                let color = element['color'];
                categoryContainer.style['background-color'] = color;
            }
        }
    }
}

/**
 * clear the initials of assigned persons in every task
 */
function clearInitialContainer() {
    for (let i = 0; i < tasks.length; i++) {
        let taskContainer = document.getElementById(`${i}`);
        let initialsContainer = taskContainer.children[4].children[0];
        initialsContainer.innerHTML = '';
    }
}

/**
 * clear the initials of assigned persons in every task in the popup
 */
function clearInitialContainerTaskPopup() {
    let taskAssign = document.getElementById('taskAssignContainer');
    taskAssign.innerHTML = '';
}

/**
 * fill in the initials of assigned persons in every task
 */
 function fillInAssinged() {
    clearInitialContainer();
    for (let i = 0; i < tasks.length; i++) {
        let taskContainer = document.getElementById(`${i}`);
        let initialsContainer = taskContainer.children[4].children[0];
        for (let j = 0; j < tasks[i]['initials'].length; j++) {
            let initials = tasks[i]['initials'][j];
            initialsContainer.innerHTML += assignHtml(j, initials);
        }
    }
}

/**
 * fill in the initials of assigned persons in every task in the popup
 */
function fillInTaskAssignPopup(id) {
    let taskAssign = document.getElementById('taskAssignContainer');
    clearInitialContainerTaskPopup();
    for (let i = 0; i < tasks[id]['assignet'].length; i++) {
        let initials = tasks[id]['initials'][i];
        let fullName = tasks[id]['assignet'][i];
        taskAssign.innerHTML += assignPopupHtml(initials, fullName);
    }
}

/**
 * get all informations for edit task
 */
function renderEditTaskCard() {
    let select = document.getElementById('select_assign_edit');
    select.innerHTML = '';
    sortContacts();
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        select.innerHTML += editTaskSelectHtml(contact, i);
    }
}

/**
 * render all assigned persons for edit task popup
 * @param {number} i - number of position of task in array, tasks
 */
function addAssignEdit(i) {
    let option = document.getElementById(`option${i}`);

    if(!assignedPersons.includes(option.innerHTML)){
        assignedPersons.push(option.innerHTML);
        visualAssignedPersonEdit(i);
    }
}

/**
 * visualisieze all assigned contacts in edit task
 * @param {number} id - number of position of task in array, tasks
 */
function visualAssignedPersonEdit(id) {
    let container = document.getElementById('visual_assign_edit');
    let assignedPerson = tasks[id]['assignet'];
    container.innerHTML = '';
    for (let i = 0; i < assignedPerson.length; i++) {
        const person = assignedPerson[i];
        container.innerHTML += assignEditHtml(id, i, person);
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
    successAnimationEditTaskPopup();
    await saveTasks();
    initBoard();
}

function successAnimationEditTaskPopup() {
    let succesAnimationPopup = document.getElementById('success_animation_edit_popup');

    if (succesAnimationPopup) {
        succesAnimationPopup.classList.remove('d-none');
        setTimeout(() => {closePopUp(succesAnimationPopup)}, "1300")  
    };
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
            initialsContainer.innerHTML += assignHtml(j, initials);
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

async function animateNewTask() {
    newTask = JSON.parse(backend.getItem('newTask'));
    await backend.setItem('modyfiedTasks', JSON.stringify(tasks));
    if (newTask == true) {
        let taskId = tasks.length - 1;
        let taskContainer = document.getElementById(`${taskId}`);
        let containerId = tasks[taskId]['progress'];
        let id = document.getElementById(`${containerId}`);
        id.scrollTo({top: id.scrollHeight, behavior: 'smooth'});
        let task = document.getElementById(`${id}`);
        setTimeout(() => {
            taskContainer.classList.add('new-task');
        }, "800");
        newTask = false;
        taskContainer.classList.remove('new-task');
        await backend.setItem('newTask', JSON.stringify(newTask));
    }
}