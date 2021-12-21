import React from 'react'

const InputField = (props) => {
    return (
        <div className="col-md-12 pt-3">
            <div className="common-input-field-wrapper">
                <label><span className="required">{props.required}</span> {props.label}:</label>
                <input onChange= {props.onChange} type={props.type} name={props.name} value={props.value} />
                {props.error}
            </div>
        </div>
    )
}

export default InputField
