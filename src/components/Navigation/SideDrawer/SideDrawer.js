import React, { Fragment } from 'react';

import classes from './SideDrawer.css';

import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Open];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Close];
    }
    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <nav onClick={props.closed}>
                    <NavigationItems isAuthenticated={props.isAuthenticated}/>
                </nav>
            </div>
        </Fragment>
    );
}

export default sideDrawer;