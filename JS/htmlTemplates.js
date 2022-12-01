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

function displayCategoriesForInput(category, i) {
    return /*html*/`<option onclick="checkCategory()">${category}</option>`
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
                <input type="text" placeholder="Enter a title" id="title" required>
            </div>
            <div class="description">
                <p>Description</p>
                <textarea type="text" placeholder="Enter a description" id="description"></textarea>
            </div>
            <div class="margin-top50">
                <p>Category</p>
            </div>
            <select class="select_task" id="category" placeholder="Select task category" required>
                <!-- JAVASCRIPT -->
            </select>
            <div class="new_category_container dNone" id="new_category_container">
                <input class="new_category_input" id="new_category" placeholder="type in new category">
                <input id="color_picker" type="color">
            </div>
            <div class="margin-top50">
                <p>Assignet to</p>
            </div>
            <select class="select_assign" id="select_assign" placeholder="Assignet to" required>
                <!-- JAVASCRIPT -->
            </select>
            <div class="visual_assign" id="visual_assign"></div>
        </div>
        <div class="bar">
            <img src="../img/bar.png">
        </div>
        <div class="right-task">
            <div class="date">
                <p>Due date</p>
                <input type="date" placeholder="dd/mm/yyyy" id="date" required>
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


function cardContent(Element) {
    return /*html*/`
    <div id="${Element['id']}" onclick="openPopUp(${Element['id']})" draggable="true" ondragstart="startDragging(${Element['id']})"
        ondragend="endDragging()" class="task_card">
        <span class="card_category" id="cardCategory${Element['id']}">
            ${Element['category']}
        </span>
        <span class="card_headline">
            ${Element['headline']}
        </span>
        <span class="card_description">
            ${Element['description']}
        </span>
        <div class="board_progress_row">
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${Element['tasksPercent']}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="board_progress">
                ${Element['tasksDone']}/${Element['tasksOverall']} Done
            </div>
        </div>
        <div class="assinged_contacts_row">
            <div class="initials_contacts">
                
            </div>
            <div class="urgency_icon">
                <img src="../img/${Element['prio']}.png">
            </div>
        </div>
    </div>
    `;
}

function popUpContent(id) {
    element = tasks[id];
    return /*html*/`
    <div class="dragcard_popup" id="dragcard_popup">
        <div class="categorycard">
            <p>${element['category']}</p>
        </div>
        <div onclick="closePopUp()" class="closebutton">
            <img src="../img/clear.png">
        </div>
        <div class="headerdescription">
            <h1>${element['headline']}</h1>
        </div>
        <div class="description_dragcard_pupup">
            <p>${element['description']}</p>
        </div>
        <div class="dragcard_popup_frame_1">
            <h2>Due date:</h2>
            <p id="dueDate">${element['dueDate']}</p>
        </div>
        <div class="dragcard_popup_frame_2">
            <h2>Priority:</h2>
            <img src="../img/${element['prio']}button.png">
        </div>
        <div class="dragcard_popup_frame_3">
            <h2>Assignet To:</h2>
        </div>
        <div class="dragcard_popup_frame_4" id="dragcardPopupListning">
            <div class="underframe1" id="taskAssignContainer">
                 <!-- JAVASCRIPT fillInTaskAssignPopup   -->
            </div>
        </div>
        <div onclick="openPopUpEdit(${id})" class="edit_button_dragcard_popup">
            <img src="../img/edit button.png">
        </div>
    </div>
    `;
}

function assignHtml(j, initials) {
    return /*html*/`<div class="assinged_contacts" id="assinged_contacts${j+1}" style="background-color:${getColorForName(initials)}">${initials}</div>`
}

function assignPopupHtml(initials, fullName) {
    return/*html*/`
        <div class="assign_container_popup">
            <div style="background-color:${getColorForName(initials)}">
                <h4 >${initials}</h4>
            </div>
            <p>${fullName}</p>
        </div>
        `;
}

function assignTaskHtml(i, initials) {
    return/*html*/`<div class="assinged_contacts" id="assinged_contacts${j+1}">${initials}</div>`
}

function popUpEditContent(id) {
    element = tasks[id];
    return /*html*/`
    <div class="task_popup_window_2">
        <div onclick="closePopUp()" class="closebutton">
            <img src="../img/clear.png">
        </div>
        <div class="task_popup_window_2_title task_popup_window_2_container">
            <h3>Title</h3>
            <input id="title${id}" value="${element['headline']}" type="text" placeholder="Title....">
        </div>
        <div class="task_popup_window_2_description task_popup_window_2_container">
            <h3>Description</h3>
            <textarea id="description${id}" cols="30" rows="10" placeholder="Description....">${element['description']}</textarea>
        </div>
        <div class="task_popup_window_2_date task_popup_window_2_container">
            <h3>Due date</h3>
            <input id="dueDate${id}" value="${element['dueDate']}" type="date">
        </div>
        <div class="task_popup_window_2_prio task_popup_window_2_container">
            <h3>Prio</h3>
            <div class="task_popup_window_2_prio_images">
                <div onclick="changeUrgent(${id})"><img src="../img/Urgentbuttonwhite.png" id="urgentimg"></div>
                <div onclick="changeMedium(${id})"><img src="../img/mediumbuttonwhite.png" id="mediumimg"></div>
                <div onclick="changeLow(${id})"><img src="../img/lowbuttonwhite.png" id="lowimg"></div>
            </div>
        </div>
        <div class="task_popup_window_2_assign task_popup_window_2_container">
            <h3>Assigned to</h3>
            <select class="select_assign" id="select_assign_edit">
                <!-- JAVASCRIPT renderEditTaskCard -->
            </select>
            <div class="visual_assign" id="visual_assign_edit">
                <!-- JAVASCRIPT visualAssignedPerson -->
            </div>
        </div>
        <div onclick="popUpEditSave(${id})"class="accept_button">
            <img src="../img/Primary check button V1.png">
        </div>
    </div>
    `;
}

function editTaskSelectHtml(contact, i) {
    return /*html*/`<option value="" onclick="addAssignEdit(${i})" id="option${i}"><div class="test">${contact['first_name']} ${contact['second_name']}</div></option>`
}

function assignEditHtml (id, i, person) {
    return /*html*/`
        <div class="assigned_person">
            <span id="assigned_person${i}">${person}</span>
            <b class="delete_btn_assigned_person" onclick="deleteAssignedPersonBoard(${id}, ${i})">x<b>
        </div>`
}