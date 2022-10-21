let contactSectionOpen = false;
let selectTaskBoxOpen = false;
let urgentImage = false;
let mediumImage = false;
let lowImage = false;
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

function createTask(i) {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('category');
    let assign = document.getElementById('assign');
    let date = document.getElementById('date');

    let taskCardInfo = {
        "title": title.value,
        "description": description.value,
        "category": category.value,
        "assign": assign.value,
        "date": date.value,
    }

    taskCard.push(taskCardInfo);

    title.value = '';
    description.value = '';
    category.value = '';
    assign.value = '';
    date.value = '';

    document.getElementById('inProgress').innerHTML = '';
    for (let i = 0; i < taskCard.length; i++) {
        document.getElementById('inProgress').innerHTML = `
        <div id="testID" draggable="true" ondragstart="addDropPosition()" ondragend="removeDropPosition()" class="task_card">
            <span class="card_category" id="cardCategory">${category[i]}</span>
            <span class="card_headline">${title[i]}</span>
            <span class="card_description">${description[i]}</span>
                <div class="board_progress_row">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                        <div class="board_progress"> 1/2 Done</div>
                </div>
                <div class="assinged_contacts_row">
                    <div class="initials_contacts">
                        <div class="assinged_contacts1">${taskCard[i]['assignet'].charAt(0)}</div>
                        <div class="assinged_contacts2">DF</div>
                        <div class="assinged_contacts3">LN</div>
                    </div>
                     <div class="urgency_icon">
                        <img src="../img/medium.png">
                    </div>
                </div>
            </div>
            <div id="inProgressDropPosition" class="div_border dNone"></div>`;
    }
    closeAddTaskPopup();
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
    // let urgent = document.getElementById('urgent');
    // urgent.src = "../img/urgentbutton.png";
    // if (urgentImage) {
    //     urgent.src = "../img/urgentbuttonwhite.png";
    //     urgentImage = false;
    // } else {
    //     urgent.src = "../img/urgentbutton.png ";
    //     urgentImage = true;
    // }
    document.getElementById('urgent').src = "../img/urgentbutton.png";
    document.getElementById('medium').src = "../img/mediumbuttonwhite.png";
    document.getElementById('low').src = "../img/lowbuttonwhite.png";
}

function changeImgMedium() {
    // let medium = document.getElementById('medium');
    // medium.src = "../img/mediumbutton.png";
    // if (mediumImage) {
    //     medium.src = "../img/mediumbuttonwhite.png";
    //     mediumImage = false;
    // } else {
    //     medium.src = "../img/mediumbutton.png ";
    //     mediumImage = true;
    // }
    document.getElementById('medium').src = "../img/mediumbutton.png";
    document.getElementById('urgent').src = "../img/urgentbuttonwhite.png";
    document.getElementById('low').src = "../img/lowbuttonwhite.png";
}

function changeImgLow() {
    // let low = document.getElementById('low');
    // low.src = "../img/lowbutton.png";
    // if (lowImage) {
    //     low.src = "../img/lowbuttonwhite.png";
    //     lowImage = false;
    // } else {
    //     low.src = "../img/lowbutton.png ";
    //     lowImage = true;
    // }
    document.getElementById('low').src = "../img/lowbutton.png";
    document.getElementById('medium').src = "../img/mediumbuttonwhite.png";
    document.getElementById('urgent').src = "../img/urgentbuttonwhite.png";
}

function openAddTaskPopup() {
    document.getElementById('addtaskPopupWindow').classList.remove('d-none');
    document.getElementById('boardContentParent').style = "filter: blur(5px);";
    document.getElementById('profilebar').style = "filter: blur(5px);";
    document.getElementById('menu').style = "filter: blur(5px);";
    document.getElementById('addtaskPopupWindow').classList.add('popup_window_slidein');
    setTimeout(() => {
        document.getElementById('addtaskPopupWindow').style = "transform: translateX(0vw)";
    }, 300);
}

function closeAddTaskPopup() {
    document.getElementById('addtaskPopupWindow').style = "animation: slideout 0.3s;"
    document.getElementById('addtaskPopupWindow').classList.remove('popup_window_slidein');
    setTimeout(() => {
        document.getElementById('addtaskPopupWindow').classList.add('d-none');
        document.getElementById('boardContentParent').style = "filter: none;";
        document.getElementById('menu').style = "filter: none;";
        document.getElementById('profilebar').style = "filter: none;";
        document.getElementById('addtaskPopupWindow').style = "transform: translateX(100vw)";
    }, 300);
}


function openAddTaskPopupForContact() {
    document.getElementById('addtaskPopupWindowForContact').classList.remove('d-none');
    document.getElementById('contactsContainer').style = "filter: blur(5px);";
    document.getElementById('profilebar').style = "filter: blur(5px);";
    document.getElementById('menu').style = "filter: blur(5px);";
    document.getElementById('addtaskPopupWindowForContact').classList.add('popup_window_slidein');
    setTimeout(() => {
        document.getElementById('addtaskPopupWindowForContact').style = "transform: translateX(0vw)";
    }, 300);
}

function closeAddTaskPopupForContact() {
    document.getElementById('addtaskPopupWindowForContact').style = "animation: slideout 0.3s;"
    document.getElementById('addtaskPopupWindowForContact').classList.remove('popup_window_slidein');
    setTimeout(() => {
        document.getElementById('addtaskPopupWindowForContact').classList.add('d-none');
        document.getElementById('contactsContainer').style = "filter: none;";
        document.getElementById('menu').style = "filter: none;";
        document.getElementById('profilebar').style = "filter: none;";
        document.getElementById('addtaskPopupWindowForContact').style = "transform: translateX(100vw)";
    }, 300);
}

function clearAddTask() {

    openAddTaskPopup();
}


function saveInitialsToTask() {
    document.getElementById
}