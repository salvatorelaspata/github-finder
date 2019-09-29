import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Alert = ({ alert : { msg, type }}) => {
    return (
        alert != null && (
        <div className={`alert alert-${type}`}>
            <FontAwesomeIcon icon={['fas', 'info-circle']} /> {msg}
        </div>
        )
    )
}

export default Alert
