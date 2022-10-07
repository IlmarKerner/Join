function showSelctedContacts() {
    let selectBox = document.getElementById('assignet');
    if (!selectBox.isonclicked) {
        selectBox.classList.add('height200');
        selectBox.classList.add('transition');
        selectBox = true;
    } else {
        selectBox.classList.remove('height200');
        selectBox.classList.add('height51');
        selectBox = false;
    }
}

function selectTask() {
    let selectTaskBox = document.getElementById('selectTask');
    if (!selectTaskBox.isonclicked) {
        selectTaskBox.classList.add('height200');
        selectTaskBox.classList.add('transition');
        selectTaskBox = true;
    } else {
        selectTaskBox.classList.remove('height200');
        selectTaskBox.classList.add('height51');
        selectTaskBox = false;
    }
}