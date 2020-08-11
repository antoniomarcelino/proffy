import React, { InputHTMLAttributes } from 'react'
import './styles.css'

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}
const Field: React.FC<FieldProps> = ({ label, name, ...rest }) => {
    return(
<       div className="input-block">
            <label htmlFor={name}> {label}</label>
            <input type="text" id={name} {...rest}/>
        </div>
    );
}

export default Field 