let firstLetter = [];
let contactColors = ['green', 'blue', 'blueviolet', 'brown', 'red', 'yellow', 'azure', 'aqua', 'orange', 'deeppink'];
let mediaForContact = window.matchMedia("(max-width: 992px)");
let contactID;

async function getInfoFromNewContactField() {
    checkIfLogged();
    await downloadFromServer();
    await loadContacts();
    renderContacts();
    checkMediaforExitButton(mediaForContact);
}

function addContact() {
    let firstname = document.getElementById('firstname');
    let secondname = document.getElementById('secondname');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let initials = (firstname.value.charAt(0) + secondname.value.charAt(0)).toUpperCase();
    if (!checkContactInputs(firstname, secondname)) {

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

        contacts.push(contactInfo);
        clearInputFieldsAddTask(firstname, secondname, email, phone);
        successAnimationForNewContact();
        saveContacts();
        renderContacts();
        checkMediaforExitButton(mediaForContact);
    }
}

function loadContacts() {
    contacts = JSON.parse(backend.getItem('modyfiedContacts')) || [];
}

async function saveContacts() {
    await backend.setItem('modyfiedContacts', JSON.stringify(contacts));
}

function clearInputFieldsAddTask(firstname, secondname, email, phone) {
    firstname.value = '';
    secondname.value = '';
    email.value = '';
    phone.value = '';
}

function openNewContactWindow() {
    document.getElementById('popupAddContact').classList.remove('d-none');
    document.getElementById('contactsContainer').style = "filter: blur(10px)";
    document.getElementById('popupAddContact').classList.add('popup_window_slidein');
    setTimeout(() => {
        document.getElementById('popupAddContact').style = "transform: translateX(0vw)";
    }, 300);
}

function closeNewContactWindow(succesAnimationContact) {
    document.getElementById('popupAddContact').style = "animation: slideout 0.3s;"
    document.getElementById('popupAddContact').classList.remove('popup_window_slidein');
    document.getElementById('popupAddContact').classList.remove('popup_window_slidein');
    document.getElementById('popupAddContact').classList.add('popup_window_slideout');
    document.getElementById('contactsContainer').style = "filter: none;";
    setTimeout(() => {
        document.getElementById('popupAddContact').classList.add('d-none');
        document.getElementById('contactsContainer').style = "filter: none;";
        document.getElementById('popupAddContact').style = "transform: translateX(100vw)";
        succesAnimationContact.classList.add('d-none');
    }, 300);
}

function removeContact(i) {
    contacts.splice(i, 1);
    renderContacts();
}

function showFullContactInfo(i) {
    let fullContactInfo = document.getElementById('full_contact_Info_Container');
    fullContactInfo.innerHTML = '';
    fullContactInfo.innerHTML += contactInfo(i);
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

function closeEditContactPopup(succesAnimationContact) {
    document.getElementById('popupEditContact').style = "animation: slideout 0.3s;"
    document.getElementById('popupEditContact').classList.remove('popup_window_slidein');
    document.getElementById('popupEditContact').classList.remove('popup_window_slidein');
    document.getElementById('popupEditContact').classList.add('popup_window_slideout');
    document.getElementById('contactsContainer').style = "filter: none;";
    setTimeout(() => {
        document.getElementById('popupEditContact').classList.add('d-none');
        document.getElementById('contactsContainer').style = "filter: none;";
        document.getElementById('popupEditContact').style = "transform: translateX(100vw)";
        succesAnimationContact.classList.add('d-none');
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
    let firstName = document.getElementById('edited_firstname');
    let secondName = document.getElementById('edited_secondname');
    let newFirstName = document.getElementById('edited_firstname').value;
    let newSecondName = document.getElementById('edited_secondname').value;
    let newEmail = document.getElementById('edited_email').value;
    let newphoneNumber = document.getElementById('edited_phone').value;
    let contact = contacts[contactID];
    if(!checkContactInputs(firstName, secondName)) {

        contact['first_name'] = newFirstName;
        contact['second_name'] = newSecondName;
        contact['email'] = newEmail;
        contact['phone'] = newphoneNumber;

        saveContacts();
        successAnimationForEditContact();
        getInfoFromNewContactField();
    }
}

function checkContactInputs(firstname, secondname) {
    let emptyInput = false;

    if (firstname.value == '') {
        firstname.parentElement.classList.add('empty')
    } else {
        firstname.parentElement.classList.remove('empty');
    }

    if (secondname.value == '') {
        secondname.parentElement.classList.add('empty');
    } else {
        secondname.parentElement.classList.remove('empty');
    }

    if (firstname.value == '' || secondname.value == '') {
        emptyInput = true;
    }

    return emptyInput;
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

function successAnimationForNewContact() {
    let succesAnimationContact = document.getElementById('success_animation_contact');
    succesAnimationContact.classList.remove('d-none');
    setTimeout(() => {closeNewContactWindow(succesAnimationContact)}, "1300"); 
}

function successAnimationForEditContact() {
    let succesAnimationContact = document.getElementById('success_animation_contact');
    succesAnimationContact.classList.remove('d-none');
    setTimeout(() => {closeEditContactPopup(succesAnimationContact)}, "1300");
}

