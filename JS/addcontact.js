let contacts = [{
    "first_name": "Max",
    "second_name": "Mustermann",
    "email": "maxmustermann@gmail.com",
    "phone": "1234566",
}];

function getInfoFromNewContactField(i) {
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

    console.log(contactInfo);
    document.getElementById('listning').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('listning').innerHTML += `
        <div class="contact_name_container">
            <span>MM</span>
            <div class="contact_name">
                <h3>${contacts[i]['first_name']} ${contacts[i]['second_name']}</h3>
                <p>${contacts[i]['email']}</p>
            </div>
        </div>`;
    }
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