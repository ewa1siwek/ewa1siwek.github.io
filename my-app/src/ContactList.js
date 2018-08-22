import React from 'react'

class ContactList extends React.Component{
    state = {
        contacts: []
    }
    getContacts() {
        fetch('http://localhost:3000/contacts')
            .then(response => response.json())
            .then(contacts => this.setState({
                contacts: contacts
            }));
    }

    componentDidMount() {
        this.getContacts()
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({
            contacts: this.state.contacts.concat({
                id: Date.now().toString(32),
                firstName: this.state.firstNameValue,
                lastName: this.state.lastNameValue,
                phoneNumber: this.state.phoneNumberValue,
                email: this.state.emailValue
            })
        })
    }

    render () {
        return (
            <div className="ContactList">
                <form onSubmit={this.handleSubmit}>
                    <label>imię
                        <input
                            type="text"
                            onChange={(event) => this.setState({
                                firstNameValue: event.currentTarget.value,
                            })}
                        />
                    </label>
                    <label>nazwisko
                        <input type="text"
                               value={this.state.contactFormValue}
                               onChange={(event) => this.setState({
                                   lastNameValue: event.currentTarget.value
                               })}/>
                    </label>
                    <label>numer telefonu
                        <input
                            value={this.state.contactFormValue}
                            onChange={(event) => this.setState({
                                phoneNumberValue: event.currentTarget.value
                            })}/>
                    </label>
                    <label>e-mail
                        <input type="email"
                               value={this.state.contactFormValue}
                               onChange={(event) => this.setState({
                                   emailValue: event.currentTarget.value
                               })}/>
                    </label>
                    <button>dodaj</button>

                <ul>
                    {
                        this.state.contacts.map(
                            contact => (
                                <li key={contact.id}>
                                    {contact.firstName}
                                    {contact.lastName}
                                    {contact.phoneNumber}
                                    {contact.email}
                                </li>
                            )
                        )
                    }
                </ul>
                </form>
            </div>
        )
    }
}

export default ContactList
