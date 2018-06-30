import React, { Fragment } from 'react';

import classes from './Modal.css';

import Backdrop from '../../UI/Backdrop/Backdrop';

const modal = (props) => {
    let modalStyle = [classes.Modal, classes.TransitionOut];

    if (props.show) {
        modalStyle = [classes.Modal, classes.TransitionIn];
    }

    let modalContent = null;
    let message = null;

    if (props.type === 'createEvent') {
        message = 'Event Created!'

        if (props.error) {
            message = 'Event Failled To Create!'
        }
        modalContent = (
            <Fragment>
                <Backdrop show={props.show} clicked={props.clicked}/>
                <div className={modalStyle.join(' ')} onClick={props.clicked}>
                    <h1>{message}</h1>
                    <div className={classes.Button}>
                        <button onClick={props.clicked}>Create Another</button>
                        <button onClick={props.returnHome}>Return Home</button>
                    </div>
                </div>
            </Fragment>  
        );
    } else if (props.type === 'buyTicket') {
        message = 'Buy Ticket?'

        if (props.error) {
            message = 'Failed To Purchase Ticket!'
        }
        modalContent = (
            <Fragment>
                <Backdrop show={props.show} clicked={props.clicked}/>
                <div className={modalStyle.join(' ')} onClick={props.clicked}>
                    <h1>{message}</h1>
                    <div className={classes.Button}>
                        {
                            props.isAuthenticated ?
                                <button onClick={() => {
                                    props.purchaseTicket()
                                    props.goToMyTickets()
                                }}>Yes</button>
                                : <button onClick={props.goToSignIn}>Yes</button>
                        }
                        
                        <button onClick={props.clicked}>No</button>
                    </div>
                </div>
            </Fragment>  
        );
    }

    return modalContent
}

export default modal;