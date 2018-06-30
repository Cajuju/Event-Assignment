import React from 'react';

import classes from './Card.css';

const card = (props) => {
    return (
        <div className={classes.Card}>
            <h3>{props.event.name}</h3>
            <div className={classes.Row}>
                <p>{props.event.date + '  '}</p>
                <p>{props.formatTime(props.event.time)}</p>
            </div>
            <p>{props.event.location}</p>
            <p>{props.event.description}</p>
            <div className={classes.Organizer}>
                <div className={classes.RemoveFlex}>
                    <p><strong>Organizer:</strong></p>
                    <p>{props.organizer.name}</p>
                </div>
                {props.purchased ? 
                    <img src={props.ticketPurchasedIcon} alt='purchased' />
                    : <img src={props.ticketIcon} alt='ticketIcon' /> 
                }
            </div>
        </div>
    );
};

export default card;