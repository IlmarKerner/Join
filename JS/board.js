let currentDraggedItem
let tasks = [{
    "id": "1",
    "progress": "toDo",
    "category": "Sales",
    "description": "Modify the contents of the main website test test test test",
    "assignet": "",
    "dueDate": "22.12.2022",
    "prio": "urgent",
    "subTask": "Make Icon",
},
]


function init() {
    updateCards();



}


function updateCards() {
    document.getElementById('inProgress').innerHTML = ``;
    for (let i = 0; i < tasks.length; i++) {
        document.getElementById('toDo').innerHTML = cardContent(i);

    }


}




function cardContent(ID) {
    return `
    <div id="${ID}" draggable="true" ondragstart="dragStart(${ID})"
        ondragend="dragEnd()" class="task_card">
    <span class="card_category" id="cardCategory">
        Design
    </span>
    <span class="card_headline">
        Website redesign
    </span>
    <span class="card_description">
        Modify the contents of the main website test test test test
    </span>
    <div class="board_progress_row">
        <div class="progress">
            <div class="progress-bar" role="progressbar" aria-label="Basic example"
                aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="board_progress">
            1/2 Done
        </div>

    </div>
    <div class="assinged_contacts_row">
        <div class="initials_contacts">
            <div class="assinged_contacts1">IK</div>
            <div class="assinged_contacts2">DF</div>
            <div class="assinged_contacts3">LN</div>
        </div>
        <div class="urgency_icon">
            <img src="../img/medium.png">
        </div>

    </div>
    `;
}


function addDropPosition() {
    document.getElementById('toDoDropPosition').classList.remove('dNone');
    document.getElementById('inProgressDropPosition').classList.remove('dNone');
    document.getElementById('awaitingFeedbackDropPosition').classList.remove('dNone');
    document.getElementById('doneDropPosition').classList.remove('dNone');
}


// function removeDropPosition() {
//     document.getElementById('toDoDropPosition').classList.add('dNone');
//     document.getElementById('inProgressDropPosition').classList.add('dNone');
//     document.getElementById('awaitingFeedbackDropPosition').classList.add('dNone');
//     document.getElementById('doneDropPosition').classList.add('dNone');
// }




function dragStart(ID) {
    // this.className += ' tilt';
    currentDraggedItem = document.getElementById(ID);
    addDropPosition();

    setTimeout(() => (currentDraggedItem.classList.add('dNone')), 0);
    console.log('start');
}

function dragEnd() {
    console.log('end');
}




