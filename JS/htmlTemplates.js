// --- addContact --- //


function contactInfo(i) {
    let contact = contacts[i];

    return /*html*/`
        <div class="full_contact_info">
            <h2 style="background-color:${getColorForName(contact['initials'])}">${contact['initials']}</h2>
            <div class="contact_info_add_task">
                <h1>${contact['first_name']} ${contact['second_name']}</h1>
                <p onclick="openAddTaskPopup('toDo')" style="cursor: pointer;">+ Add Task</p>
            </div>
        </div>
        <div class="contact_information_header">
            <h2>Contact Information</h2>
            <div class="edit_contact" onclick="editContactPopup('${contact['first_name']}', '${contact['second_name']}', '${contact['email']}', '${contact['phone']}', '${i}')">
                <img src="../img/pencil.png">
                <p>Edit Contact</p>
            </div>
        </div>
        <div class="contact_information">
            <h2>Email</h2>
            <a href="#">
                <p>${contact['email']}</p>
            </a>
            <h2>Phone</h2>
            <p>${contact['phone']}</p>
        </div>`;
}

function letterNotExist(i, initials, firstsecondnameLetter) {
    return /*html*/`
    <div>
        <div class="first_name_letter">
            <h3>${firstsecondnameLetter}</h3>
            <img src="../img/line.png">
        </div>
        <div id="${firstsecondnameLetter}">
            <div class="full_listner">
                <div class="contact_name_container" onclick="showFullContactInfo(${i})">
                    <span style="background-color:${getColorForName(initials)}">${initials}</span>
                    <div class="contact_name">
                    <h3>${contacts[i]['first_name']} ${contacts[i]['second_name']}</h3>
                    <a href="#"><p>${contacts[i]['email']}</p></a>
                    </div>
                </div>
                <p style="font-size: 50px !important; margin: 0px">|</p>
                <img src="../img/trash-can.png" onclick="removeContact(${i})">
            </div>
        </div>
    </div>`
}

function letterAlreadyExist(i, initials) {
    return /*html*/`
    <div class="full_listner">
        <div class="contact_name_container" onclick="showFullContactInfo(${i})">
            <span style="background-color:${getColorForName(initials)}">${initials}</span>
            <div class="contact_name">
            <h3>${contacts[i]['first_name']} ${contacts[i]['second_name']}</h3>
            <a href="#"><p>${contacts[i]['email']}</p></a>
            </div>
        </div>
        <p style="font-size: 50px !important; margin: 0px">|</p>
        <img src="../img/trash-can.png" onclick="removeContact(${i})">
    </div>`
}


// --- addTask --- //


function displayContactsforInput(contact, i) {
    return /*html*/`<option value="" onclick="addAssign(${i})" id="option${i}"><div class="test">${contact['first_name']} ${contact['second_name']}</div></option>`
}

function visualPersonHtml(i, person) {
    return /*html*/`
    <div class="assigned_person">
        <span id="assigned_person${i}">${person}</span>
        <b class="delete_btn_assigned_person" onclick="deleteAssignedPerson(${i})">x<b>
    </div>`
}

function addTaskPopupWindowContent() {
    return /*html*/ `

<div class="tasks_popup">
    <h1>Add Task</h1>
    <div class="tasks_content">
        <div class="close_addtask_popup" id="closeAddTaskWindow" onclick="closeAddTaskPopup()">
            <img src="../img/clear.png">
        </div>
        <div class="left_task">
            <div class="title">
                <p>Title</p>
                <input type="text" placeholder="Enter a title" id="title">
            </div>
            <div class="description">
                <p>Description</p>
                <textarea type="text" placeholder="Enter a description" id="description"></textarea>
            </div>
            <div class="margin-top50">
                <p>Category</p>
            </div>
            <select class="select_task" id="category" placeholder="Select task category" required>
                <option>Select task category</option>
                <option>New Category</option>
                <option>Backoffice</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Media</option>
            </select>
            <div class="margin-top50">
                <p>Assignet to</p>
            </div>
            <select class="select_assign" id="select_assign" placeholder="Assignet to" required>

            </select>
            <div class="visual_assign" id="visual_assign"></div>
        </div>
        <div class="bar">
            <img src="../img/bar.png">
        </div>
        <div class="right-task">
            <div class="date">
                <p>Due date</p>
                <input type="date" placeholder="dd/mm/yyyy" id="date">
            </div>
            <div class="prio">
                <p>Prio</p>
                <div class="devision" id="devision">
                    <div onclick="changeImgUrgent()" class="urgent"><img id="urgent" src="../img/Urgentbuttonwhite.png"></div>
                    <div onclick="changeImgMedium()" class="medium"><img id="medium" src="../img/mediumbuttonwhite.png"></div>
                    <div onclick="changeImgLow()" class="low"><img id="low" src="../img/lowbuttonwhite.png"></div>
                </div>
            </div>
                <div class="subtask_container">
                <p class="subtaskheader">Subtasks</p>
                <div class="subtask">
                    <input type="text" id="addNewSubtask" placeholder="Add new subtask"><img src="../img/addsubtask.png" id="addTask" onclick="addSubTask()">
                </div>
                <div class="subtasks" id="subtask">
                    
                </div>
            </div>
        </div>
    </div>
    <div class="task_buttons" id="task_buttons">
        <button class="clear_button" id="clearButton" onclick="clearAddTask()">Clear<img
                src="../img/clear.png"></button>
        <button class="create_button" id="createButton" onclick="createTask()">Create Task <img
                src="..//img/create_task.png"></button>
    </div>
</div>
`
}

function subtaskHtml(i) {
    return /*html*/`<div><input type="checkbox">${subtask[i]}</div>`;
}


// --- board --- //


