import React from 'react';

import classes from './DrawerToggle.css'

const drawerToggle = (props) => {
    let attachedClasses = [classes.DrawerToggle, classes.Close]
    if (props.open) {
        attachedClasses = [classes.DrawerToggle, classes.Open]
    }
    return (
        <div onClick={props.clicked} className={attachedClasses.join(' ')}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default drawerToggle;