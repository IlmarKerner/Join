let contactSectionOpen = false;
let selectTaskBoxOpen = false;
let urgentImage = false;

function showSelctedContacts() {
    let selectbox = document.getElementById('assigned');
    if (!contactSectionOpen) {
        selectbox.classList.add('height200');
        selectbox.classList.add('transition');
        contactSectionOpen = true;
    } else {
        selectbox.classList.remove('height200');
        selectbox.classList.add('height51');
        contactSectionOpen = false;
    }
}

function selectTaskCategory() {
    let selectTaskBox = document.getElementById('selectTask');
    if (!selectTaskBoxOpen) {
        selectTaskBox.classList.add('height200');
        selectTaskBox.classList.add('transition');
        selectTaskBoxOpen = true;
    } else {
        selectTaskBox.classList.remove('height200');
        selectTaskBox.classList.add('height51');
        selectTaskBoxOpen = false;
    }
}

function changeImgUrgent() {
    let urgent = document.getElementById('urgent');
    urgent.scr = "../img/urgentbuttonwhite.png";

    // let urgent = document.getElementById('urgent');
    // if (!urgentImage) {
    //     urgent.style = "background: none;"
    //     urgent.style = "background: "
    //     urgentImage = false;
    // } else {
    //     urgent.src = "../img/urgentbuttonwhite.png"
    //     urgentImage = true;
    // }
}