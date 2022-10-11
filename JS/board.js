let currentDraggedItem = document.getElementById('testID');


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


currentDraggedItem.addEventListener('dragstart', dragStart);
currentDraggedItem.addEventListener('dragend', dragEnd);


function dragStart() {
    this.className += 'tilt';
    setTimeout(() => (this.className = 'dNone'), 0);
    console.log('start');
}

function dragEnd() {
    console.log('end');
}




