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
                firstName: this.state.firstNameValue,
                lastName: this.state.lastNameValue,
                phoneNumber: this.state.phoneNumberValue,
                email: this.state.emailValue,
            })
        })
    }

    render () {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.firstNameValue}
                        onChange={(event) => this.setState({
                            firstNameValue: event.currentTarget.value
                        })}
                    />
                    <input
                        type="text"
                        value={this.state.lastNameValue}
                        onChange={(event) => this.setState({
                            lastNameValue: event.currentTarget.value
                        })}
                    />
                    <input
                        type="text"
                        value={this.state.phoneNumberValue}
                        onChange={(event) => this.setState({
                            phoneNumberValue: event.currentTarget.value
                        })}
                    />
                    <input
                        type="text"
                        value={this.state.emailValue}
                        onChange={(event) => this.setState({
                            emailValue: event.currentTarget.value
                        })}
                    />
                        <button>Add</button>

                <ul>
                    {
                        this.state.contacts.map(
                            contact => (
                                <li key={contact.id}>
                                    {contact.firstNameValue}
                                    {contact.lastNameValue}
                                    {contact.phoneNumberValue}
                                    {contact.emailValue}
                                </li>
                            )
                        )
                    }
                </ul>
                </form>
            </React.Fragment>
        )
    }
}

export default ContactList