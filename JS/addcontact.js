let contacts = [{
        "first_name": "Ilmar",
        "second_name": "Kerner",
        "initials": "IK",
        "email": "kernerilmar@gmail.com",
        "phone": "+49 123456789",
    },
    {
        "first_name": "Dennis",
        "second_name": "Frese",
        "initials": "DF",
        "email": "dennis.freeze@gmail.com",
        "phone": "+49 123456789",
    },
    {
        "first_name": "Lukas",
        "second_name": "Neureiter",
        "initials": "LN",
        "email": "lukas.neureiter@gmail.com",
        "phone": "+49 123456789",
    }
];
let contactColors = ['green', 'blue', 'blueviolet', 'brown', 'red', 'yellow', 'azure', 'aqua', 'orange', 'deeppink'];
let mediaForContact = window.matchMedia("(max-width: 992px)");

function getInfoFromNewContactField() {
    let firstname = document.getElementById('firstname');
    let secondname = document.getElementById('secondname');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');

    let contactInfo = {
        "first_name": firstname.value,
        "second_name": secondname.value,
        "initials": (firstname.value.charAt(0) + secondname.value.charAt(0)).toUpperCase(),
        "email": email.value,
        "phone": phone.value,
        "addetAt": new Date().getTime(),
    };

    if (!firstname.value == '') {
        contacts.push(contactInfo);
    }

    let allTasksAsString = JSON.stringify(contacts);
    localStorage.setItem('allTasks', allTasksAsString);


    firstname.value = '';
    secondname.value = '';
    email.value = '';
    phone.value = '';

    closeNewContactWindow();
    renderContacts();
    checkMediaforExitButton(mediaForContact);
}

function renderContacts() {
    document.getElementById('listning').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let initials = contacts[i]['initials'];
        document.getElementById('listning').innerHTML += `
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
        `;
    }
}

function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    contacts = JSON.parse(allTasksAsString);

}

function openNewContactWindow() {
    document.getElementById('popupAddContact').classList.remove('d-none');
    document.getElementById('contactsContainer').style = "filter: blur(10px)";
    document.getElementById('popupAddContact').classList.add('popup_window_slidein');
    setTimeout(() => {
        document.getElementById('popupAddContact').style = "transform: translateX(0vw)";
    }, 300);
}

function closeNewContactWindow() {
    document.getElementById('popupAddContact').style = "animation: slideout 0.3s;"
    document.getElementById('popupAddContact').classList.remove('popup_window_slidein');
    document.getElementById('popupAddContact').classList.remove('popup_window_slidein');
    document.getElementById('popupAddContact').classList.add('popup_window_slideout');
    document.getElementById('contactsContainer').style = "filter: none;";
    setTimeout(() => {
        document.getElementById('popupAddContact').classList.add('d-none');
        document.getElementById('contactsContainer').style = "filter: none;";
        document.getElementById('popupAddContact').style = "transform: translateX(100vw)";
    }, 300);
}

function removeContact(i) {
    contacts.splice(i, 1);
    renderContacts();
}

function showFullContactInfo(i) {
    let fullContactInfo = document.getElementById('full_contact_Info_Container');
    let initials = contacts[i]['initials'];
    fullContactInfo.innerHTML = '';
    fullContactInfo.innerHTML += `
        <div class="full_contact_info">
            <h2 style="background-color:${getColorForName(initials)}">${initials}</h2>
            <div class="contact_info_add_task">
                <h1>${contacts[i]['first_name']} ${contacts[i]['second_name']}</h1>
                <p onclick="openAddTaskPopup()" style="cursor: pointer;">+ Add Task</p>
            </div>
        </div>
        <div class="contact_information_header">
            <h2>Contact Information</h2>
            <div class="edit_contact">
                <img src="../img/pencil.png">
                <p>Edit Contact</p>
            </div>
        </div>
        <div class="contact_information">
            <h2>Email</h2>
            <a href="#">
                <p>${contacts[i]['email']}</p>
            </a>
            <h2>Phone</h2>
            <p>${contacts[i]['phone']}</p>
        </div>`;
}

function getColorForName(initials) {
    let number = (initials.charCodeAt(0) + initials.charCodeAt(1)) % contactColors.length;
    return contactColors[number];
}

function checkMediaforExitButton(mediaForContact) {
    let btn = document.getElementById('close_contact_btn');

    if (mediaForContact.matches) {
      btn.src = '../img/clear_white.png';
    } else {
        btn.src = '../img/clear.png';
    }
  }