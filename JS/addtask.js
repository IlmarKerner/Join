let contactSectionOpen = false;
let selectTaskBoxOpen = false;
let urgentImage = false;
let mediumImage = false;
let lowImage = false;
let newTask = false;
let newCategory = false;
let prio;
let taskProgress = 'toDo';
let mediaforBoard = window.matchMedia("(max-width: 992px)");
let subtask = [];
let assignedPersons = [];

async function renderAddTask() {
    await downloadFromServer();
    loadTasks();
    loadCategories();
    let select = document.getElementById('select_assign');
    let selectCategory = document.getElementById('category');
    select.innerHTML = '';
    selectCategory.innerHTML = '';
    sortContacts();
    
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        select.innerHTML += displayContactsforInput(contact, i);
    }

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i]['name'];
        selectCategory.innerHTML += displayCategoriesForInput(category, i);
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
        container.innerHTML += visualPersonHtml(i, person);
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
        document.getElementById('subtask').innerHTML += subtaskHtml(i);
    }
}

let globalIdForTaskCard = 0;
let initialsForTaskCard = [];

async function createTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let assign = document.getElementById('select_assign');
    let date = document.getElementById('date');
    let category = checkCategoryInput();
    if (!checkInputs(title, date)) {
        checkIfNewCategory(category);
        checkWhichIdIsFree();
        getInitialsFromContacts();

        let taskCard = {
            "title": title.value,
            "description": description.value,
            "id": globalIdForTaskCard,
            "progress": taskProgress,
            "category": category,
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
        successAnimationAddTask();
        successAnimationAddTaskPopup();
        await saveTasks();
        newTask = true;
        await backend.setItem('newTask', JSON.stringify(newTask));

        setTimeout(() => {
            location.href = 'board.html';
        }, "1000")  
    }
}


function successAnimationAddTask() {
    let succesAnimation = document.getElementById('success_animation');

    if (succesAnimation) {
        succesAnimation.classList.remove('d-none')
    }
}

function successAnimationAddTaskPopup() {
    let succesAnimationPopup = document.getElementById('success_animation_popup');

    if (succesAnimationPopup) {
        succesAnimationPopup.classList.remove('d-none');
        setTimeout(() => {closeAddTaskPopup()}, "1300")  
    };
}

async function saveTasks() {
    await backend.setItem('modyfiedTasks', JSON.stringify(tasks));
}

function loadTasks() {
    tasks = JSON.parse(backend.getItem('modyfiedTasks')) || [];
}

async function saveCategories() {
    await backend.setItem('categories', JSON.stringify(categories));
}

function loadCategories() {
    categories = JSON.parse(backend.getItem('categories')) || [];
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

    document.getElementById('urgent').classList.add('active');
    document.getElementById('medium').classList.remove('active');
    document.getElementById('low').classList.remove('active');
    prio = 'urgent';
}

function changeImgMedium() {
    document.getElementById('medium').src = "../img/mediumbutton.png";
    document.getElementById('urgent').src = "../img/urgentbuttonwhite.png";
    document.getElementById('low').src = "../img/lowbuttonwhite.png";

    document.getElementById('medium').classList.add('active');
    document.getElementById('urgent').classList.remove('active');
    document.getElementById('low').classList.remove('active');
    prio = 'medium';
}

function changeImgLow() {
    document.getElementById('low').src = "../img/lowbutton.png";
    document.getElementById('medium').src = "../img/mediumbuttonwhite.png";
    document.getElementById('urgent').src = "../img/urgentbuttonwhite.png";

    document.getElementById('low').classList.add('active');
    document.getElementById('medium').classList.remove('active');
    document.getElementById('urgent').classList.remove('active');
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
    if (document.querySelector('.addtask_popup')) {
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
}

function checkProgress(progress) {
    taskProgress = progress;
}

function loadAddTaskPopupWindow() {
    document.querySelector('.addtask_popup').innerHTML = addTaskPopupWindowContent();
}

function clearAddTask() {
    openAddTaskPopup();
}

function checkMediaforBoard(mediaforBoard) {
    if (document.querySelector('.board_content')) {
        if (mediaforBoard.matches) {
                document.querySelector('.board_content').classList.add('dNone');
            } else {
                document.querySelector('.board_content').classList.remove('dNone');
            }
    }
}

function restoreBoardContent() {
    document.querySelector('.board_content').classList.remove('d-none');
}

function checkCategory() {
    let category = document.getElementById('category');
    let newCategoryContainer = document.getElementById('new_category_container');
    if (category.value == 'New Category') {
        newCategoryContainer.classList.remove('dNone');
        newCategory = true;
    } else {
        newCategoryContainer.classList.add('dNone');
        newCategory = false;
    }
}

function checkCategoryInput() {
    let category
    if (document.getElementById('new_category_container').classList.contains('dNone')) {
        category = document.getElementById('category').value;
    } else {
        category = document.getElementById('new_category').value;
    }
    return category
}

function checkIfNewCategory(category) {
    let getNoCategory = false
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i]['name'];
        if (element == category) {
            getNoCategory = true;
          } 
    }
    if (getNoCategory == false){
        getNewCategory();
    }
}

async function getNewCategory() {
    let category = document.getElementById('new_category');
    let color = document.getElementById('color_picker');

    categories.push({
        "name": category.value,
        "color": color.value,
    })
    saveCategories();
}

function checkInputs(title, date) {
    let assign = document.getElementById('visual_assign');
    let urgentBtn = document.getElementById('urgent');
    let mediumBtn = document.getElementById('medium');
    let lowBtn = document.getElementById('low');
    let emptyInput = true;
    let emptyPrio = true;
    let empty = true;

    if (title.value == '') {
        title.classList.add('empty');
    } else {
        title.classList.remove('empty');
    }

    if (date.value == '') {
        date.classList.add('empty');
    } else {
        date.classList.remove('empty');
    }

    if (assign.innerHTML == '') {
        document.getElementById('select_assign').classList.add('empty');
    } else {
        document.getElementById('select_assign').classList.remove('empty')
    }

    if (urgentBtn.classList.contains('active') || mediumBtn.classList.contains('active') || lowBtn.classList.contains('active')) {
        document.getElementById('devision').classList.remove('empty');
    } else {
        document.getElementById('devision').classList.add('empty');
    }

    if (!title.value == '' && !date.value == '' && !assign.innerHTML == '') {
        emptyInput = false;
    } else {
        emptyInput = true;
    }

    if (urgentBtn.classList.contains('active') || mediumBtn.classList.contains('active') || lowBtn.classList.contains('active')) {
        emptyPrio = false;
    } else {
        emptyPrio = true;
    }

    if (!emptyInput && !emptyPrio) {
        empty = false
    }
    return empty;
}