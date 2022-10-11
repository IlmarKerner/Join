let contacts = [];

function getInfoFromNewContactField() {
    let firstname = document.getElementById('firstname');
    let secondname = document.getElementById('secondname');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');

    let contactInfo = {
        "first name": firstname.value,
        "second name": secondname.value,
        "email": email.value,
        "phone": phone.value,
    };

    contacts.push(contactInfo);

    firstname.value = '';
    secondname.value = '';
    email.value = '';
    phone.value = '';

    console.log(contactInfo);
}


function openNewContactWindow() {
    document.getElementById('popupAddContact').classList.remove('d-none');
    document.getElementById('contactsContainer').style = "filter: blur(10px)";
    document.getElementById('popupAddContact').classList.remove('popup_window_slideout');
    document.getElementById('popupAddContact').classList.add('popup_window_slidein');
}

function closeNewContactWindow() {
    // document.getElementById('popupAddContact').classList.remove('popup_window_slidein');
    // document.getElementById('contactsContainer').classList.add('popupslideout');
    document.getElementById('popupAddContact').classList.remove('popup_window_slidein');
    document.getElementById('popupAddContact').classList.add('popup_window_slideout');
    document.getElementById('contactsContainer').style = "filter: none;";
    setTimeout(() => {
        document.getElementById('popupAddContact').classList.add('d-none');
        document.getElementById('contactsContainer').classList.remove('popupslideout');
        document.getElementById('popupAddContact').classList.remove('popup_window_slideout');
    }, "1000");
}