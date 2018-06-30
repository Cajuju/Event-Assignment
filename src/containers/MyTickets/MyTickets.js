import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './MyTickets.css';
import ticket_purchased from '../../assets/imgs/icon/ticket_purchased.png';

import Card from '../../components/UI/Card/Card';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class MyTickets extends Component {
    componentDidMount = () => {
        if (this.props.token) {
            this.props.onFetchMyTickets(this.props.token, this.props.userId);
        }
    }

    // shouldComponentUpdate = (nextProps) => {
    //     return !this.props.tickets || !this.props.token;
    // }

    // componentWillUpdate = () => {
    //     if (this.props.token) {
    //         this.props.onFetchMyTickets(this.props.token, this.props.userId);
    //     } else {
    //         this.setState({ update: true });
    //     }
    // }

    getFormattedTime = (time) => {
        const splitTime = time.split(':');
        const hours24 = parseInt(splitTime[0], 10);
        const hours = ((hours24 + 11) % 12) + 1;
        const amPm = hours24 > 11 ? 'PM' : 'AM';
        const min = splitTime[1];
        const result = hours + ':' + min +  amPm;
        return result;
    }

    render() {
        let content = null;
        let card = null;
        if (this.props.tickets) {
            if (this.props.tickets) {
                for (let ticket in this.props.tickets) {
                    const {events, organizer} = this.props.tickets[ticket];
                    card = (
                        <Link
                            style={{textDecoration: 'none', color: 'black'}}
                            to={this.props.match.url + '/' + events.name + "/" + organizer.userId}
                            key={ticket}
                        >
                            <Card
                                event={events}
                                organizer={organizer}
                                formatTime={(time) => this.getFormattedTime(time)}
                                ticketPurchasedIcon={ticket_purchased}
                                purchased={true}
                            />
                        </Link>
                    );
                }
            } else {
                card = <h1>You have no tickets</h1>
            }
            
            content = (
                <div className={classes.Cards}>
                    {card}
                </div>
            )

            if (this.props.loading) {
                content = <Spinner />
            }
        }
        return (
            <div className={classes.MyTickets}>
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        error: state.order.error,
        tickets: state.order.orderedTickets,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMyTickets: (token, userId) => dispatch(actions.fetchMyTickets(token, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTickets);