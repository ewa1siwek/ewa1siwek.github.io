var container = document.getElementById('contacts');
var removeSelectedButton = document.getElementById('remove-selected');

var addContactBtn = document.getElementById('add-contact');
var contactInputFirst = document.querySelector('#contact-first_name');
var contactInputLast = document.querySelector('#contact-last_name');
var contactInputPhone = document.querySelector('#contact-phone');
var contactInputEmail = document.querySelector('#contact-email');

addContactBtn.addEventListener('click', validatedInput);
syncContacts();

removeSelectedButton.addEventListener('click', function () {
    var checkedCheckboxes = document.querySelectorAll('input:checked');

    checkedCheckboxes.forEach(function (checkbox) {
        var contactId = checkbox.getAttribute('data__contact--id');
        deleteContact(contactId);
    })
});

function validatedInput() {
    if(contactInputFirst.value.length > 0 && contactInputLast.value.length > 0
        && contactInputPhone.value.length > 0 && contactInputEmail.value.length > 0) {
        addContact();
    }
}

function addContact() {
    var contact = {
        firstName: contactInputFirst.value,
        lastName: contactInputLast.value,
        phoneNumber: contactInputPhone.value,
        email: contactInputEmail.value
    };
    contactInputFirst.value = '';
    contactInputLast.value = '';
    contactInputPhone.value = '';
    contactInputEmail.value = '';

    fetch(
        'http://localhost:3000/contacts', {
            method: 'POST',
            body: JSON.stringify(contact),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(syncContacts);
}

function deleteContact(contactId) {
    fetch(
        'http://localhost:3000/contacts/' + contactId, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        }
    ).then(syncContacts)
}

function getContacts() {
    return fetch(
        'http://localhost:3000/contacts'
    ).then(
        function (response) {
            return response.json();
        }
    )
}

function sortByLastName(contacts) {
    function compareLastNames(a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }
    contacts.sort(function(a, b) {
        return compareLastNames(a.lastName, b.lastName);
    });
}

function displayContacts(contacts) {
    sortByLastName(contacts);
    container.innerHTML = '';
    contacts.forEach(function (contact) {
        var contactContainer = document.createElement('div');

        var checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.classList.add('checkbox');
        checkboxInput.setAttribute('data__contact--id', contact.id);

        var first = document.createElement('li');
        var last = document.createElement('li');
        var phone = document.createElement('li');
        var email = document.createElement('li');

        var deleteBtn = document.createElement('button');
        var btnContainer = document.createElement('div');

        first.innerHTML = 'imię: ' + (contact.firstName[0].toUpperCase() + contact.firstName.substring(1));
        last.innerHTML = 'nazwisko: ' + (contact.lastName[0].toUpperCase() + contact.lastName.substring(1));
        phone.innerHTML = 'numer telefonu: ' + contact.phoneNumber;
        email.innerHTML = 'e-mail: ' + contact.email;

        container.appendChild(contactContainer);
        first.prepend(checkboxInput);
        contactContainer.appendChild(first);
        contactContainer.appendChild(last);
        contactContainer.appendChild(phone);
        contactContainer.appendChild(email);
        contactContainer.appendChild(btnContainer);

        first.classList.add('first');
        last.classList.add('last');
        contactContainer.classList.add('container__contact')

        var editBtn = document.createElement('button');
        editBtn.innerText = 'Edytuj';
        btnContainer.appendChild(editBtn);
        editBtn.classList.add('edit_btn');

        deleteBtn.innerText = 'Usuń';
        btnContainer.appendChild(deleteBtn);
        deleteBtn.classList.add('delete_btn');

        deleteBtn.addEventListener('click', function () {
            deleteContact(contact.id);
        });

        function changeBackgroundOn() {
            contactContainer.classList.add('container__contact-on');
        }

        function changeBackgroundOut() {
            contactContainer.classList.remove('container__contact-on');
        }

        contactContainer.addEventListener('mouseover', changeBackgroundOn);
        contactContainer.addEventListener('mouseout', changeBackgroundOut);


        function editedForm() {
            var editForm = document.createElement('form');
            var editInputs;
            var inputFirst;
            var inputLast;
            var inputPhone;
            var inputEmail;
            editInputs = [
                (inputFirst = document.createElement('input')),
                (inputLast = document.createElement('input')),
                (inputPhone = document.createElement('input')),
                (inputEmail = document.createElement('input'))
            ];

            editForm.setAttribute('action', '');
            editInputs.map(function (el) {
                el.classList.add('edit_input');
            });

            var saveBtn = document.createElement('button');
            inputFirst.value = contact.firstName;
            inputLast.value = contact.lastName;
            inputPhone.value = contact.phoneNumber;
            inputEmail.value = contact.email;


            saveBtn.innerText = 'Zapisz';
            saveBtn.classList.add('btn__main');

            editForm.appendChild(inputFirst);
            editForm.appendChild(inputLast);
            editForm.appendChild(inputPhone);
            editForm.appendChild(inputEmail);

            editForm.appendChild(saveBtn);
            email.appendChild(editForm);
            editBtn.removeEventListener('click', editedForm);

            saveBtn.addEventListener('click', function () {
                var updatedContact = {
                    firstName: inputFirst.value,
                    lastName: inputLast.value,
                    phoneNumber: inputPhone.value,
                    email: inputEmail.value
                };

                fetch(
                    'http://localhost:3000/contacts/' + contact.id, {
                        method: 'PATCH',
                        body: JSON.stringify(updatedContact),
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    }
                ).then(syncContacts)
            });
    }
        editBtn.addEventListener('click', editedForm);
    })
}

function syncContacts() {
    getContacts().then(displayContacts);
}
