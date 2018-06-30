import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;

    let inputClasses = [classes.Input];
    const valid = props.validation;
    const touched = props.isTouched;
    let errorMessage = null;

    if (valid && touched) {
        inputClasses.push(classes.Success);
    } else if (!valid && touched) {
        inputClasses.push(classes.Error);
        if (props.id === 'name') {
            errorMessage = 'Please Enter A Name';
        } else if (props.id === 'email') {
            errorMessage = 'Please Enter A Valid Email';
        } else if (props.id === 'password') {
            errorMessage = 'Please Enter A Valid Password & Min-Length Is 6';
        } else if (props.id === 'date') {
            errorMessage = 'Please Enter A Valid Date';
        } else if (props.id === 'location') {
            errorMessage = 'Please Enter A Valid Location';
        } else if (props.id === 'description') {
            errorMessage ='Please Enter A Description'
        }
    }
    
    switch (props.elementType) {
        case ('input'):
            if (props.id === 'date') {
                inputElement = (
                    <input 
                        type={props.elementConfig.type}
                        placeholder={props.elementConfig.placeholder}
                        value={props.value}
                        required
                        onChange={props.changed}
                        min={props.elementConfig.min}
                    />
                );
            } else {
                inputElement = (
                    <input 
                        type={props.elementConfig.type}
                        placeholder={props.elementConfig.placeholder}
                        value={props.value}
                        required
                        onChange={props.changed}
                    />
                );
            }
            break;
        case ('textarea'):
            inputElement = (
                <textarea 
                    type={props.elementConfig.type}
                    placeholder={props.elementConfig.placeholder}
                    value={props.value}
                    required
                    onChange={props.changed}
                />
            );
            break;
        default:
            inputElement = null;
    }

    return (
        <div className={inputClasses.join(' ')}>
            {inputElement}
            <p>{errorMessage}</p>
        </div>
    );
};

export default input;