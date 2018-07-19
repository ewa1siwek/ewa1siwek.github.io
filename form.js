var container = document.getElementById('contacts');
var addContactBtn = document.getElementById('add-contact');
var contactInputFirst = document.querySelector('#conatact-first_name');
var contactInputLast = document.querySelector('#conatact-last_name');
var contactInputPhone = document.querySelector('#conatact-phone');
var contactInputEmail = document.querySelector('#conatact-email');

addContactBtn.addEventListener('click', validatedInput);

syncContacts();

function validatedInput() {
    if(contactInputFirst.value.length > 0 && contactInputLast.value.length > 0
        && contactInputPhone.value.length > 0 && contactInputEmail.value.length > 0) {
        addContact();
    } else {
        alert('Musisz wypełnić wszystkie pola')
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
        var first = document.createElement('li');
        var last = document.createElement('li');
        var phone = document.createElement('li');
        var email = document.createElement('li');

        var deleteBtn = document.createElement('button');
        var btnContainer = document.createElement('div');

        first.innerHTML = 'imię: ' + contact.firstName;
        last.innerHTML = 'nazwisko: ' + contact.lastName;
        phone.innerHTML = 'numer telefonu: ' + contact.phoneNumber;
        email.innerHTML = 'e-mail: ' + contact.email;

        container.appendChild(first);
        container.appendChild(last);
        container.appendChild(phone);
        container.appendChild(email);
        container.appendChild(btnContainer);

        first.classList.add('first');

        var editBtn = document.createElement('button');
        editBtn.innerText = 'Edytuj';
        btnContainer.appendChild(editBtn);
        editBtn.classList.add('edit');

        deleteBtn.innerText = 'Usuń';
        btnContainer.appendChild(deleteBtn);
        deleteBtn.classList.add('delete');

        deleteBtn.addEventListener('click', function () {
            deleteContact(contact.id);
        });

        function editForm() {
            var editForm = document.createElement('div');
            var inputFirst = document.createElement('input');
            var inputLast = document.createElement('input');
            var inputPhone = document.createElement('input');
            var inputEmail = document.createElement('input');

            var saveBtn = document.createElement('button');

            inputFirst.value = contact.firstName;
            inputLast.value = contact.lastName;
            inputPhone.value = contact.phoneNumber;
            inputEmail.value = contact.email;

            saveBtn.innerText = 'Zapisz';
            saveBtn.classList.add('mainBtn');

            editForm.appendChild(inputFirst);
            editForm.appendChild(inputLast);
            editForm.appendChild(inputPhone);
            editForm.appendChild(inputEmail);

            editForm.appendChild(saveBtn);
            email.appendChild(editForm);

            editBtn.removeEventListener('click', editForm);

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
        editBtn.addEventListener('click', editForm);
    })
}

function syncContacts() {
    getContacts().then(displayContacts);
}
