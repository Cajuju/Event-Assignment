import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';

import Spinner from '../../components/UI/Spinner/Spinner';
import AuthForm from '../../components/AuthForm/AuthForm';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        form: {
            name: {
                id: 'name',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Name'
                },
                value: '',
                touched: false,
                valid: false
            },
            email: {
                id: 'email',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                value: '',
                touched: false,
                valid: false
            },
            password: {
                id: 'password',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                value: '',
                touched: false,
                valid: false
            },
            reTypePassword: {
                id: 'reTypePassword',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Retype Password'
                },
                value: '',
                touched: false,
                valid: false
            }
        },
        isSignUp: false,
        btnDisabled: true
    }

    signUpToggleHandler = () => {
        this.setState({isSignUp: !this.state.isSignUp, btnDisabled: true});
    }

    checkValidity = (value, id) => {
        if (id === 'name' && value.trim().length > 0) {
            return true;
        }
        if (id === 'email' && value) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return pattern.test(value);
        }
        if (id === 'password' && value.length > 6) {
            return true;
        }
        if (id === 'reTypePassword' && value.length > 6) {
            return true;
        }
        return false;
    }

    inputChangeHandler = (event, formName) => {
        const updatedForms = {
            ...this.state.form,
            [formName]: {
                ...this.state.form[formName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.form[formName].id),
                touched: true
            }
        };

        let disable = true;
        let formValid = [];
        if (this.state.isSignUp) {
            for (let form in updatedForms) {
                formValid.push(updatedForms[form].valid);
            }
        } else {
            formValid.push(updatedForms.email.valid);
            formValid.push(updatedForms.password.valid);
        }
        disable = formValid.includes(false);        

        this.setState({form: updatedForms, btnDisabled: disable });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.form.name.value, this.state.form.email.value, this.state.form.password.value, this.state.isSignUp)
    }

    render () {
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to='/' />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p className={classes.ErrorMessage}>{this.props.error.message}</p>
        }

        let content = null;

        content = (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <AuthForm
                    form={this.state.form}
                    isSignUp={this.state.isSignUp}
                    changed={(event, formName) => this.inputChangeHandler(event, formName)}
                    btnDisabled={this.state.btnDisabled}
                    toggleSignUp={this.signUpToggleHandler}
                    onSubmit={this.submitHandler}
                />
            </div>
        );

        if (this.props.loading) {
            content = <Spinner />
        }

        return content;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (name, email, password, isSignUp) => dispatch(actions.auth(name, email, password, isSignUp)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);