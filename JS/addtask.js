let contactSectionOpen = false;
let selectTaskBoxOpen = false;
let urgentImage = false;
let mediumImage = false;
let lowImage = false;

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
    let urgent = document.getElementById('urgent');
    urgent.src = "../img/urgentbutton.png";
    if (urgentImage) {
        urgent.src = "../img/urgentbutton.png";
        urgentImage = false;
    } else {
        urgent.src = "../img/urgentbuttonwhite.png";
        urgentImage = true;
    }
}

function changeImgMedium() {
    let medium = document.getElementById('medium');
    medium.src = "../img/mediumbutton.png";
    if (mediumImage) {
        medium.src = "../img/mediumbutton.png";
        mediumImage = false;
    } else {
        medium.src = "../img/mediumbuttonwhite.png";
        mediumImage = true;
    }
}

function changeImgLow() {
    let low = document.getElementById('low');
    low.src = "../img/lowbutton.png";
    if (lowImage) {
        low.src = "../img/lowbutton.png";
        lowImage = false;
    } else {
        low.src = "../img/lowbuttonwhite.png";
        lowImage = true;
    }
}

function openAddTaskPopup() {
    document.getElementById('addtaskPopupWindow').classList.remove('d-none');
    document.getElementById('boardContentParent').style = "filter: blur(10px);";
}

function closeAddTaskPopup() {
    document.getElementById('addtaskPopupWindow').classList.add('d-none');
    document.getElementById('boardContentParent').style = "filter: none;";
}