let firstLetter = [];
let contactColors = ['green', 'blue', 'blueviolet', 'brown', 'red', 'yellow', 'azure', 'aqua', 'orange', 'deeppink'];
let mediaForContact = window.matchMedia("(max-width: 992px)");
let contactID;

/**
 * initialize and rener contact page
 */
async function getInfoFromNewContactField() {
    checkIfLogged();
    await downloadFromServer();
    await loadContacts();
    renderContacts();
    checkMediaforExitButton(mediaForContact);
}

/**
 * add a new contact
 */
function addContact() {
    let firstname = document.getElementById('firstname');
    let secondname = document.getElementById('secondname');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let initials = (firstname.value.charAt(0) + secondname.value.charAt(0)).toUpperCase();
    if (!checkContactInputs(firstname, secondname) && checkPhoneNumber() && checkEmail()) {

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

/**
 * load contacts from server
 */
function loadContacts() {
    contacts = JSON.parse(backend.getItem('modyfiedContacts')) || [];
}

/**
 * save contacts to server
 */
async function saveContacts() {
    await backend.setItem('modyfiedContacts', JSON.stringify(contacts));
}

/**
 * clearing the inputfields on addTask page
 * @param {string} firstname - first name from input field
 * @param {string} secondname - second name from input field
 * @param {string} email - email from input field
 * @param {string} phone - phone number from input field
 */
function clearInputFieldsAddTask(firstname, secondname, email, phone) {
    firstname.value = '';
    secondname.value = '';
    email.value = '';
    phone.value = '';
}

/**
 * add style propertys to open the new contact popup
 */
function openNewContactWindow() {
    document.getElementById('popupAddContact').classList.remove('d-none');
    document.getElementById('contactsContainer').style = "filter: blur(10px)";
    document.getElementById('popupAddContact').classList.add('popup_window_slidein');
    setTimeout(() => {
        document.getElementById('popupAddContact').style = "transform: translateX(0vw)";
    }, 300);
}

/**
 * remove style propertys to close the new contact popup
 * @param {string} succesAnimationContact - id of container for the success animation if contact was created
 */
function closeNewContactWindow(succesAnimationContact) {
    document.getElementById('popupAddContact').style = "animation: slideout 0.3s;"
    document.getElementById('popupAddContact').classList.remove('popup_window_slidein');
    document.getElementById('popupAddContact').classList.remove('popup_window_slidein');
    document.getElementById('popupAddContact').classList.add('popup_window_slideout');
    document.getElementById('contactsContainer').style = "filter: none;";
    if (succesAnimationContact){succesAnimationContact.classList.add('d-none')}
    setTimeout(() => {
        document.getElementById('popupAddContact').classList.add('d-none');
        document.getElementById('contactsContainer').style = "filter: none;";
        document.getElementById('popupAddContact').style = "transform: translateX(100vw)";
    }, 300);
}

/**
 * delete contact by click on trash on contact page
 * @param {number} i - number of position in contacts Array
 */
function removeContact(i) {
    contacts.splice(i, 1);
    saveContacts();
    renderContacts();
}

/**
 * show full info of contact with phone, mail...
 * @param {number} i - number of position in contacts Array
 */
function showFullContactInfo(i) {
    let fullContactInfo = document.getElementById('full_contact_Info_Container');
    fullContactInfo.innerHTML = '';
    fullContactInfo.innerHTML += contactInfo(i);
}

/**
 * generate color for contact profile picture
 * @param {string} initials - initials from contact
 * @returns - generated color
 */
function getColorForName(initials) {
    let number = (initials.charCodeAt(0) + initials.charCodeAt(1)) % contactColors.length;
    return contactColors[number];
}

/**
 * check the window with and height to use the right exit button 
 * @param {boolean} mediaForContact - check if media > 992px
 */
function checkMediaforExitButton(mediaForContact) {
    let btn = document.getElementById('close_contact_btn');

    if (mediaForContact.matches) {
        btn.src = 'img/clear_white.png';
    } else {
        btn.src = 'img/clear.png';
    }
}

/**
 * open the popup to edit contacts
 * @param {string} firstname - first name from input field
 * @param {string} lastname - second name from input field
 * @param {string} email - email from input field
 * @param {string} phone - phone number from input field
 * @param {number} id - number of position in contacs Array
 */
function editContactPopup(firstname, lastname, email, phone, id) {
    contactID = id;
    openEditContactPopup();
    fillInputfields(firstname, lastname, email, phone);
}

/**
 * open the popup to edit contact
 */
function openEditContactPopup() {
    document.getElementById('popupEditContact').classList.remove('d-none');
    document.getElementById('contactsContainer').style = "filter: blur(10px)";
    document.getElementById('popupEditContact').classList.add('popup_window_slidein');
    setTimeout(() => {
        document.getElementById('popupEditContact').style = "transform: translateX(0vw)";
    }, 300);
}

/**
 * close the popup to edit contact
 * @param {string} succesAnimationContact - id of container for the success animation if contact was created
 */
function closeEditContactPopup(succesAnimationContact) {
    document.getElementById('popupEditContact').style = "animation: slideout 0.3s;"
    document.getElementById('popupEditContact').classList.remove('popup_window_slidein');
    document.getElementById('popupEditContact').classList.remove('popup_window_slidein');
    document.getElementById('popupEditContact').classList.add('popup_window_slideout');
    document.getElementById('contactsContainer').style = "filter: none;";
    if(succesAnimationContact){succesAnimationContact.classList.add('d-none')}
    setTimeout(() => {
        document.getElementById('popupEditContact').classList.add('d-none');
        document.getElementById('contactsContainer').style = "filter: none;";
        document.getElementById('popupEditContact').style = "transform: translateX(100vw)";
    }, 300);
}

/**
 * fill the input fields from edit contact popup
 * @param {string} firstname - first name from input field
 * @param {string} secondname - second name from input field
 * @param {string} email - email from input field
 * @param {string} phone - phone number from input field
 */
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

/**
 * save the contact which was edited
 */
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

/**
 * check if all impotant input fields filled from user to create or edit contact
 * @param {string} firstname - first name from input field
 * @param {string} secondname - second name from input field
 * @returns - boolean; true if one important input is empty / false if all importnant inputs are filled
 */
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

/**
 * reder all contacts in contact page
 */
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

/**
 * sort all contacts by alphabet
 */
function sortContacts() {
    contacts.sort((a, b) => a.second_name.localeCompare(b.second_name));
}

/**
 * animation to disyplay succesfull create contact
 */
function successAnimationForNewContact() {
    let succesAnimationContact = document.getElementById('success_animation_contact');
    succesAnimationContact.classList.remove('d-none');
    setTimeout(() => {closeNewContactWindow(succesAnimationContact)}, "1300"); 
}

/**
 * animation to disyplay succesfull edit contact
 */
function successAnimationForEditContact() {
    let succesAnimationContact = document.getElementById('success_animation_contact');
    succesAnimationContact.classList.remove('d-none');
    setTimeout(() => {closeEditContactPopup(succesAnimationContact)}, "1300");
}

/**
 * check the phone number for validation
 * @returns - boolean
 */
function checkPhoneNumber() {
    let phoneNumber = false;
    let input;

    if (document.getElementById("phone")) {
        input = document.getElementById("phone");
    } else {
        input = document.getElementById("edited_phone");
    }

    if (input.value.length < 10 || input.value.length > 14) {
        input.value = '';
        input.placeholder = 'please use a valid phone number';
        phoneNumber = false
    } else {
        input.placeholder = 'Phone';
        phoneNumber = true
    }
    return phoneNumber;
}

/**
 * check the email for validation
 * @returns - boolean
 */
function checkEmail() {
    let email = false;
    let input;

    if (document.getElementById("email")) {
        input = document.getElementById("email");
    } else {
        input = document.getElementById("edited_email");
    }
  
    if (input.value == "" || input.value.indexOf("@", 0) < 0 || input.value.indexOf(".", 0) < 0) {
        input.value = '';
        input.placeholder = 'please use a valid email';
        email = false
    } else {
        input.placeholder = 'Email';
        email = true;
    }
    return email;
  }