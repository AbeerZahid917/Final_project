import React from 'react'

export default function Alert(props) 
{
    const capitalize = (text)=>{
        let newText = text.toLowerCase()
        return newText.charAt(0).toUpperCase() + newText.slice(1);
    }

    return (
        <div style={{height: '60px'}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>
                    {capitalize(props.alert.type)}
                </strong> 
                    : {props.alert.msg} 
            </div>}
        </div>
    )
}