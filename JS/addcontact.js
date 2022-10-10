function openNewContactWindow() {
    document.getElementById('popupAddContact').classList.remove('d-none');
    document.getElementById('contactsContainer').style = "filter: blur(10px);";
}

function closeNewContactWindow() {
    document.getElementById('popupAddContact').classList.add('d-none');
    document.getElementById('contactsContainer').style = "filter: none;";
}