import React from 'react';

import classes from './EventForm.css';

import Input from '../UI/Input/Input';

const eventForm = (props) => {
    let inputForms = [];

    for (let key in props.form) {
        inputForms.push(props.form[key]);
    }

    const forms = inputForms.map((form, index) => {
        return (
            <div key={index}>
                <p>{form.id}</p>
                <Input
                    elementType={form.elementType}
                    elementConfig={form.elementConfig}
                    value={form.value}
                    changed={(event, formName) => props.changed(event,form.id)}
                    validation={form.valid}
                    isTouched={form.touched}
                    id={form.id}
                />
            </div>
        );
    })

    return (
        <div className={classes.EventForm}>
            {forms}
            <button
                type='submit'
                disabled={props.btnDisabled}
                onClick={props.onSubmit}
            >
                Create Event
            </button>
        </div>
    );
}

export default eventForm;