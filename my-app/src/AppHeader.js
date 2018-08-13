import React from 'react'
import logo from './logo.svg';

class AppHeader extends React.Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Lista kontaktów</h1>
            </header>
        )
    }
}

export default AppHeader