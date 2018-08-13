import React, { Component } from 'react';
import './App.css';
import AppHeader from "./AppHeader";
import InputBar from "./InputBar";

class App extends Component {
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

  render() {
    return (
      <div className="App">
        <React.Fragment>
          <AppHeader />
          <InputBar />
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
        </React.Fragment>

      </div>
    );
  }
}

export default App;
