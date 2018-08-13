import React from 'react'

class ContactList extends React.Component{
    state = {
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
                firstName: this.state.contactFormValue,
            })
        })
    }

    render () {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.contactFormValue}
                        onChange={(event) => this.setState({
                            contactFormValue: event.currentTarget.value
                        })}
                    />
                </form>

                <ul>
                    {
                        this.state.contacts.map(
                            contact => (
                                <li key={contact.id}>
                                    {contact.firstName}
                                </li>
                            )
                        )
                    }
                </ul>
            </React.Fragment>
        )
    }
}

export default ContactList