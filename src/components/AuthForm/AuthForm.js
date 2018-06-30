import React from 'react';

import classes from './AuthForm.css'

import Input from '../UI/Input/Input';

const authForm = (props) => {
    let inputForms = [];
    let buttons = null;
    if (props.isSignUp) {
        for (let key in props.form) {
            inputForms.push(props.form[key])
        }
        buttons = (
            <div className={classes.SignUp}>
                <button type='submit' disabled={props.btnDisabled} onClick={props.onSubmit}>Sign Up</button>
                <p>Already have an account?</p>
                <p onClick={props.toggleSignUp}>Sign In</p>
            </div>
        );
    } else {
        inputForms = [props.form.email, props.form.password];
        buttons = (
            <div className={classes.SignUp}>
                <button type='submit' disabled={props.btnDisabled} onClick={props.onSubmit}>Sign In</button>
                <p>Don't have an account?</p>
                <p onClick={props.toggleSignUp}>Sign Up</p>
            </div>
        );
    }
    
    const forms = inputForms.map((form, index) => {
        return (
            <div key={index}>
                <p>{form.id}</p>
                <Input
                    elementType={form.elementType}
                    elementConfig={form.elementConfig}
                    value={form.value}
                    changed={(event, formName) => props.changed(event, form.id)}
                    validation={form.valid}
                    isTouched={form.touched}
                    id={form.id}
                />
            </div>
        );
    });

    return (
        <div className={classes.AuthForm}>
            {forms}
            {buttons}
        </div>
    );
}

export default authForm;