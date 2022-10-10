let currentDraggedElement;


function startDragging(id){
    currentDraggedElement = id;
    
}

function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(category) {
    
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