let contacts = [];
let contactColors = [''];

function getInfoFromNewContactField() {
    let firstname = document.getElementById('firstname');
    let secondname = document.getElementById('secondname');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');

    let contactInfo = {
        "first_name": firstname.value,
        "second_name": secondname.value,
        "email": email.value,
        "phone": phone.value,
    };

    contacts.push(contactInfo);

    firstname.value = '';
    secondname.value = '';
    email.value = '';
    phone.value = '';

    document.getElementById('listning').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('listning').innerHTML += `
        <div class="contact_name_container" onclick="showFullContactInfo()">
            <span>${contacts[i]['first_name'].charAt(0)} ${contacts[i]['second_name'].charAt(0)}</span>
            <div class="contact_name">
                <h3>${contacts[i]['first_name']} ${contacts[i]['second_name']}</h3>
                <a href="#"><p>${contacts[i]['email']}</p></a>
            </div>
            <img src="../img/trash-can.png" onclick="removeContact()">
        </div>
        `;
    }
    closeNewContactWindow();
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
    setTimeout(() => {
        document.getElementById('popupAddContact').classList.add('d-none');
        document.getElementById('contactsContainer').style = "filter: none;";
        document.getElementById('popupAddContact').style = "transform: translateX(100vw)";
    }, 300);
}

function showFullContactInfo() {
    let fullContactInfo = document.getElementById('full_contact_Info_Container');
    fullContactInfo.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        fullContactInfo.innerHTML += `
    <div class="full_contact_info">
        <h2>${contacts[i]['first_name'].charAt(0)} ${contacts[i]['second_name'].charAt(0)}</h2>
        <h1>${contacts[i]['first_name']} ${contacts[i]['second_name']}</h1>
        <p onclick="openAddTaskPopupForContact()">+ Add Task</p>
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

}