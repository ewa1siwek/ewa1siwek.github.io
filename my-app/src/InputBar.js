import React from 'react'

class InputBar extends React.Component {
    render () {
        return (
            <React.Fragment>
                <input className="ConatactFirstName" />
                <input className="ConatactLastName" />
                <input className="ConatactPhone" />
                <input className="ConatactEmail" />
                <button className="AddContact">Dodaj kontakt</button>
            </React.Fragment>
        )
    }
}

export default InputBar