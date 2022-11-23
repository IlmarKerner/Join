let firstLetter = [];
let contacts = [{
        addetAt: 1669134223018,
        email: "PiaRose@web.de",
        first_name: "Pia",
        full_name: "Pia Rose",
        color: "blueviolet",
        initials: "PR",
        phone: "015201187695",
        second_name: "Rose",
    },
    {
        addetAt: 1669134223018,
        email: "PeterSchleich@gmail.de",
        first_name: "Peter",
        full_name: "Peter Schleich",
        color: "brown",
        initials: "PS",
        phone: "01727738327",
        second_name: "Schleich",
    },
    {
        addetAt: 1669134223018,
        email: "GretaKorn@yahoo.com",
        first_name: "Greta",
        full_name: "Greta Korn",
        color: "azure",
        initials: "GK",
        phone: "0160480984",
        second_name: "Korn",
    },
    {
        addetAt: 1669134223018,
        email: "CelineHolzinger@yahoo.com",
        first_name: "Celine",
        full_name: "Celine Holzinger",
        color: "deeppink",
        initials: "CH",
        phone: "01604485945",
        second_name: "Holzinger",
    },
    {
        addetAt: 1669134223018,
        email: "JörgAbratis@gweb.de",
        first_name: "Jörg",
        full_name: "Jörg Abratis",
        color: "deeppink",
        initials: "JA",
        phone: "017298498136",
        second_name: "Abratis",
    },
    {
        addetAt: 1669134223018,
        email: "TimmSchwarz@gmail.de",
        first_name: "Timm",
        full_name: "Timm Schwarz",
        color: "aqua",
        initials: "TS",
        phone: "0170486798889",
        second_name: "Schwarz",
    },
];


let contactColors = ['green', 'blue', 'blueviolet', 'brown', 'red', 'yellow', 'azure', 'aqua', 'orange', 'deeppink'];
let mediaForContact = window.matchMedia("(max-width: 992px)");
let contactID;

function getInfoFromNewContactField() {
    let allTasksAsString = JSON.stringify(contacts);
    localStorage.setItem('allTasks', allTasksAsString);
    renderContacts();
    checkMediaforExitButton(mediaForContact);
}

function addContact() {

    let firstname = document.getElementById('firstname');
    let secondname = document.getElementById('secondname');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let initials = (firstname.value.charAt(0) + secondname.value.charAt(0)).toUpperCase();

    let contactInfo = {
        "first_name": firstname.value,
        "second_name": secondname.value,
        "initials": (firstname.value.charAt(0) + secondname.value.charAt(0)).toUpperCase(),
        "full_name": firstname.value + ' ' + secondname.value,
        "color": getColorForName(initials),
        "email": email.value,
        "phone": phone.value,
        "addetAt": new Date().getTime(),
    };

    if (!firstname.value == '') {
        contacts.push(contactInfo);
    }

    firstname.value = '';
    secondname.value = '';
    email.value = '';
    phone.value = '';

    closeNewContactWindow();
    renderContacts();
    checkMediaforExitButton(mediaForContact);
}

// function renderContacts() {
//     document.getElementById('listning').innerHTML = '';
//     for (let i = 0; i < contacts.length; i++) {
//         let initials = contacts[i]['initials'];
//         document.getElementById('listning').innerHTML += `

//         `;
//     }
// }

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
                <p onclick="openAddTaskPopup('toDo')" style="cursor: pointer;">+ Add Task</p>
            </div>
        </div>
        <div class="contact_information_header">
            <h2>Contact Information</h2>
            <div class="edit_contact" onclick="editContactPopup('${contacts[i]['first_name']}', '${contacts[i]['second_name']}', '${contacts[i]['email']}', '${contacts[i]['phone']}', '${i}')">
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

function editContactPopup(firstname, lastname, email, phone, id) {
    contactID = id;
    openEditContactPopup();
    fillInputfields(firstname, lastname, email, phone);
}

function openEditContactPopup() {
    document.getElementById('popupEditContact').classList.remove('d-none');
    document.getElementById('contactsContainer').style = "filter: blur(10px)";
    document.getElementById('popupEditContact').classList.add('popup_window_slidein');
    setTimeout(() => {
        document.getElementById('popupEditContact').style = "transform: translateX(0vw)";
    }, 300);
}

function closeEditContactPopup() {
    document.getElementById('popupEditContact').style = "animation: slideout 0.3s;"
    document.getElementById('popupEditContact').classList.remove('popup_window_slidein');
    document.getElementById('popupEditContact').classList.remove('popup_window_slidein');
    document.getElementById('popupEditContact').classList.add('popup_window_slideout');
    document.getElementById('contactsContainer').style = "filter: none;";
    setTimeout(() => {
        document.getElementById('popupEditContact').classList.add('d-none');
        document.getElementById('contactsContainer').style = "filter: none;";
        document.getElementById('popupEditContact').style = "transform: translateX(100vw)";
    }, 300);
}

function fillInputfields(firstname, lastname, email, phone) {
    let actuallyFirstName = document.getElementById('edited_firstname');
    let actuallySecondName = document.getElementById('edited_secondname');
    let actuallyEmail = document.getElementById('edited_email');
    let actuallyphoneNumber = document.getElementById('edited_phone');

    actuallyFirstName.value = firstname;
    actuallySecondName.value = lastname;
    actuallyEmail.value = email;
    actuallyphoneNumber.value = phone;
}

function saveEditedContact() {
    let newFirstName = document.getElementById('edited_firstname').value;
    let newSecondName = document.getElementById('edited_secondname').value;
    let newEmail = document.getElementById('edited_email').value;
    let newphoneNumber = document.getElementById('edited_phone').value;
    let contact = contacts[contactID];

    contact['first_name'] = newFirstName;
    contact['second_name'] = newSecondName;
    contact['email'] = newEmail;
    contact['phone'] = newphoneNumber;

    closeEditContactPopup();
    // Seite muss danach noch aktualisiert werden. Array muss backend gespeichert werden. Logo muss geändert werden
}

function renderContacts() {
    sortContacts();
    let contactFirstLetterField = document.getElementById('listning');
    contactFirstLetterField.innerHTML = '';
    document.getElementById('listning').innerHTML = ``;
    
    for (let i = 0; i < contacts.length; i++) {
        let initials = contacts[i]['initials'];
        let user = contacts[i]['second_name'];
        let firstsecondnameLetter = user.match(/\b(\w)/g).join('');
        if (!firstLetter.includes(firstsecondnameLetter)) {
            firstLetter.push(firstsecondnameLetter);
            contactFirstLetterField.innerHTML += 
                letterNotExist(i, initials, firstsecondnameLetter);
        } else {
            document.getElementById(`${firstsecondnameLetter}`).innerHTML += 
                letterAlreadyExist(i, initials);
        }
    }
    firstLetter = [];
}

function sortContacts() {
    contacts.sort((a, b) => a.second_name.localeCompare(b.second_name));
}

function letterNotExist(i, initials, firstsecondnameLetter) {
    return `
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
    return `
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