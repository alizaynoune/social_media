import React, {useState} from 'react'
import {Input} from 'antd'

function InputUnderLine() {
    const [error, setError] = useState(true)
    const [isValid, setIsValid] = useState(false)
    const [focused, setFocused] = useState(false)
    return (
        <input className={`input-underline ${error ? 'error' : ''} ${isValid ? 'valid' : ''} ${focused ? 'focused' : ''}`}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={() => setIsValid(true)}
            onClear={() => setIsValid(false)}
        />
    )
}

export { InputUnderLine }
