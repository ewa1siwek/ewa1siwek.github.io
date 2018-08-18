import React from 'react'

class ContactList extends React.Component{
    state = {
        contactFormValue: '',
        contacts: [
            {
                id: '1',
                firstName: "Sebastian",
                lastName: "Kreft",
                phoneNumber: "500-600-700",
                email: "seba@mail.com"
            },
            {
                id: '2',
                firstName: "Jan",
                lastName: "Kowalski",
                phoneNumber: "500-600-700",
                email: "mail@mail.com"
            },
        ]
    }
    handleSubmit = event => {
        event.preventDefault()
        this.setState({
            contacts: this.state.contacts.concat({
                id: Date.now().toString(32),
                firstName: this.state.contactFormValue
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
                            value={this.state.contactFormValue}
                            onChange={(event) => this.setState({
                                contactFormValue: event.currentTarget.value
                            })}
                        />
                    </label>
                    <label>nazwisko
                        <input type="text"/>
                    </label>
                    <label>numer telefonu
                        <input/>
                    </label>
                    <label>e-mail
                        <input type="email"/>
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