import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './EventFocus.css';

import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class EventFocus extends Component {
    state = {
        showModal: false,
        redirectObj: {
            redirect: false,
            path: null
        },
    }

    componentDidMount = () => {
        console.log('fetching event')
        const { eventName, userId } = this.props.match.params;
        this.props.onFetchEvent(eventName, userId);
    }

    getFormattedTime = (time) => {
        const splitTime = time.split(':');
        const hours24 = parseInt(splitTime[0], 10);
        const hours = ((hours24 + 11) % 12) + 1;
        const amPm = hours24 > 11 ? 'PM' : 'AM';
        const min = splitTime[1];
        const result = hours + ':' + min +  amPm;
        return result;
    }

    toggleModalHandler = () => {
        this.setState({ showModal: !this.state.showModal })
    }

    onPurchaseHandler = (eventData, token, userId) => {
        this.props.onOrderTicket(eventData, token, userId)
    }

    redirectToMyTicketsHandler = () => {
        let updatedObj = { 
            redirect: true,
            path: '/myTickets'
         }

        this.setState({redirectObj: updatedObj})
    }

    redirectToSignInHandler = () => {
        let updatedObj = { 
            redirectObj: {
                redirect: true,
                path: '/auth'
            }
         }

        this.setState(updatedObj)
    }

    render() {
        let redirect = null;

        if (this.state.redirectObj.redirect) {
            redirect = <Redirect to={this.state.redirectObj.path} />
        }
        let content = null;

        if (this.props.loading) {
            content = <Spinner />
        }

        console.log(this.props.selectedEvent);
        if (this.props.selectedEvent) {
            const { event, organizer, event_Id } = this.props.selectedEvent
            const time = this.getFormattedTime(event.time)
            const eventData = {
                event: { ...event },
                organizer: { ...organizer },
                event_Id: event_Id
            }
            const disable = this.props.userId === organizer.userId;
            let button = (
                <button 
                    type='button' 
                    disabled={disable}
                    onClick={this.toggleModalHandler}
                >
                    Order Ticket
                </button>
            );

            content = (
                <div className={classes.EventFocus}>
                    {redirect}
                    <Modal
                        type='buyTicket'
                        show={this.state.showModal}
                        clicked={this.toggleModalHandler}
                        error={this.props.error}
                        goToMyTickets={this.redirectToMyTicketsHandler}
                        goToSignIn={this.redirectToSignInHandler}
                        purchaseTicket={() => this.onPurchaseHandler(eventData, this.props.token, this.props.userId)}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                    <h2>{event.name}</h2>
                    <div className={classes.Row}>
                        <div className={classes.Row}>
                            <p>{event.date}</p>
                            <p>{time}</p>
                        </div>
                        <p>{event.location}</p>
                    </div>
                    
                    <p>{event.description}</p>
                    <div className={classes.Row}>
                        <p>Organizer: {organizer.name}</p>
                        {disable ? <p className={classes.Red}><strong>Organizer cannot purchase tickets</strong></p> : null}
                        {button}
                    </div>
                </div>
            );
        }
        
        return content;
    }
}

const maptStateToProps = state => {
    return {
        selectedEvent: state.event.selectedEvent,
        loading: state.event.loading,
        error: state.event.error,
        userId: state.auth.userId,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null,
        tickets: state.order.orderedTickets,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchEvent: (eventName, userId) => dispatch(actions.fetchEvent(eventName, userId)),
        onOrderTicket: (eventData, token, userId) => dispatch(actions.orderTicket(eventData, token, userId))
    }
}

export default connect(maptStateToProps, mapDispatchToProps)(EventFocus);