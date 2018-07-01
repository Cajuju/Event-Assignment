import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './EventList.css';
import ticket from '../../assets/imgs/icon/ticket.png';
import ticket_purchased from '../../assets/imgs/icon/ticket_purchased.png';

import Card from '../../components/UI/Card/Card';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class EventList extends Component {

    componentDidMount = () => {
        this.props.onFetchEvents();
        if (this.props.token && !this.props.tickets) {
            this.props.onFetchMyTickets(this.props.token, this.props.userId);
        }
    }

    shouldComponentUpdate = (nextProps) => {
        return this.props.events !== nextProps.events
    }

    componentWillUpdate = () => {
        this.props.onFetchEvents();
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


    render () {
        let content = null;
        if (!this.props.loading) {
            if (!this.props.events && !this.props.isAuthenticated) {
                content = (
                    <div className={classes.Container}>
                        <h3>Sorry! No Event Available</h3>
                        <h5>Sign In to be able to Create Event</h5>
                    </div>
                );
            } else if (!this.props.events && this.props.isAuthenticated) {
                content = (
                    <div className={classes.Container}>
                        <h3>Sorry! No Event Available</h3>
                    </div>
                );
            }
        } else {
            content = <Spinner />;
        }

        let card = null;

        if (this.props.events) {
            const message = <h5>Events</h5>
            if (this.props.isAuthenticated && this.props.tickets) {
                card = this.props.events.map((event, index) => {
                    const isPurchased = this.props.tickets.hasOwnProperty(event.event_Id);
                    return (
                        <div className={classes.Cards} key={index}>
                            <Link
                                style={{textDecoration: 'none', color: 'black'}}
                                to={this.props.match.url + event.event.name + "/" + event.organizer.userId}
                            >
                                <Card
                                    event={event.event}
                                    organizer={event.organizer}
                                    formatTime={(time) => this.getFormattedTime(time)}
                                    ticketIcon={ticket}
                                    ticketPurchasedIcon={ticket_purchased}
                                    purchased={isPurchased}
                                />
                            </Link>
                        </div>
                    );
                });
            } else {
                card = this.props.events.map((event, index) => {
                    return (
                        <div className={classes.Cards} key={index}>
                            <Link
                                style={{textDecoration: 'none', color: 'black'}}
                                to={this.props.match.url + event.event.name + "/" + event.organizer.userId}
                            >
                                <Card
                                    event={event.event}
                                    organizer={event.organizer}
                                    formatTime={(time) => this.getFormattedTime(time)}
                                    ticketIcon={ticket}
                                    ticketPurchasedIcon={ticket_purchased}
                                    purchased={false}
                                />
                            </Link>
                        </div>
                    );
                });
            }
            content = (
                <div className={classes.Container}>
                    {message}
                    <div className={classes.EventList}>
                        {card}
                    </div>
                </div>
            );
        }

        return content;
    };
}

const mapStateToProps = state => {
    return {
        events: state.event.eventsList,
        myEvents: state.event.myEvents,
        myRecentEvent: state.event.myRecentEvent,
        isAuthenticated: state.auth.token !== null,
        loading: state.event.loading,
        tickets: state.order.orderedTickets,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchEvents: () => dispatch(actions.fetchEvents()),
        onFetchMyTickets: (token, userId) => dispatch(actions.fetchMyTickets(token, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);