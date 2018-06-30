import React from 'react';

import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let content = (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact>Home</NavigationItem>
            <NavigationItem link='/auth'>Create Event</NavigationItem>
            <NavigationItem link='/auth'>Sign In</NavigationItem>
        </ul>
    );
    if (props.isAuthenticated) {
        content = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link='/' exact>Home</NavigationItem>
                <NavigationItem link='/myTickets'>My Tickets</NavigationItem>
                <NavigationItem link='/createEvent'>Create Event</NavigationItem>
                <NavigationItem link='/signout'>Sign Out</NavigationItem>
            </ul>
        );
    }
    return content;
}

export default navigationItems;