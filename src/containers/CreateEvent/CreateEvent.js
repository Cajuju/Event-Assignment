import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './CreateEvent.css';

import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';

import EventForm from '../../components/EventForm/EventForm';
import * as actions from '../../store/actions/index';

const today = new Date();
const test = today.setDate(today.getDate()+7);
const weekFromNow = new Date(test);
const year = weekFromNow.getFullYear()
const month = weekFromNow.getMonth()+1 < 10 ? '0' + (weekFromNow.getMonth()+1) : (weekFromNow.getMonth()+1)
const day = weekFromNow.getDate() < 10 ? '0' + weekFromNow.getDate() : weekFromNow.getDate();
const date = year + '-'+ month + '-' + day;

class CreateEvent extends Component {
    state = {
        form: {
            name: {
                id: 'name',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Event Name'
                },
                value: '',
                touched: false,
                valid: false
            },
            date: {
                id: 'date',
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'date',
                    min: date
                },
                value: '',
                touched: false,
                valid: false
            },
            time: {
                id: 'time',
                elementType: 'input',
                elementConfig: {
                    type: 'time',
                    placeholder: 'time',
                },
                value: '',
                touched: false,
                valid: false
            },
            location: {
                id: 'location',
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Enter Location'
                },
                value: '',
                touched: false,
                valid: false
            },
            description: {
                id: 'description',
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Description'
                },
                value: '',
                touched: false,
                valid: false
            }
        },
        btnDisabled: true,
        showModal: false,
        redirect: false,
    }

    componentWillMount = () => {
        if (!this.props.token) {
            this.setState({ redirect: true });
        }
    }

    // REMINDER: make this into a hoc since it is used in multiple places
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
        if (id === 'date' && value) {
            return true;
        }
        if (id === 'time' && value) {
            return true;
        }
        if (id === 'location' && value) {
            return true;
        }
        if (id === 'description' && value) {
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

        for (let form in updatedForms) {
            formValid.push(updatedForms[form].valid);
        }
        
        disable = formValid.includes(false);
        

        this.setState({form: updatedForms, btnDisabled: disable });
    }

    submitHandler = (event) => {
        event.preventDefault();
        const organizerData = {
            name: this.props.name,
            email: this.props.email,
            userId: this.props.userId,
            token: this.props.token,
        }
        const eventData = {
            name: this.state.form.name.value,
            location: this.state.form.location.value,
            date: this.state.form.date.value,
            time: this.state.form.time.value,
            description: this.state.form.description.value,
        }
        this.props.onCreateEvent(organizerData, eventData);
        this.toggleModalHandler();
    }
    
    toggleModalHandler = () => {
        this.setState({ showModal: !this.state.showModal })
    }

    redirectButtonHandler = () => {
        this.setState({ redirect: true })
    }

    render() {
        let content = (
            <div className={classes.CreateEvent}>
                <h3>Welcome {this.props.name}!</h3>
                <h4>You will be contacted through {this.props.email}</h4>
                <h4>Create Event Below</h4>
                <EventForm
                    form={this.state.form}
                    changed={(event, formName) => this.inputChangeHandler(event, formName)}
                    btnDisabled={this.state.btnDisabled}
                    onSubmit={this.submitHandler}
                />
            </div>
        );
        if (this.props.loading) {
            content = <Spinner />
        }
        let redirect = null;
        if (this.state.redirect) {
            redirect = <Redirect to='/' />
        }
        
        return (
            <div>
                {content}
                <Modal
                    show={this.state.showModal} 
                    clicked={this.toggleModalHandler}
                    error={this.props.error}
                    returnHome={this.redirectButtonHandler}
                    type='createEvent'
                />
                {redirect}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        name: state.auth.name,
        email: state.auth.email,
        userId: state.auth.userId,
        token: state.auth.token,
        loading: state.event.loading,
        error: state.event.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateEvent: (organizerData, eventData) => dispatch(actions.createEvent(organizerData, eventData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);