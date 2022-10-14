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
        urgent.src = "../img/urgentbuttonwhite.png";
        urgentImage = false;
    } else {
        urgent.src = "../img/urgentbutton.png ";
        urgentImage = true;
    }
}

function changeImgMedium() {
    let medium = document.getElementById('medium');
    medium.src = "../img/mediumbutton.png";
    if (mediumImage) {
        medium.src = "../img/mediumbuttonwhite.png";
        mediumImage = false;
    } else {
        medium.src = "../img/mediumbutton.png ";
        mediumImage = true;
    }
}

function changeImgLow() {
    let low = document.getElementById('low');
    low.src = "../img/lowbutton.png";
    if (lowImage) {
        low.src = "../img/lowbuttonwhite.png";
        lowImage = false;
    } else {
        low.src = "../img/lowbutton.png ";
        lowImage = true;
    }
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