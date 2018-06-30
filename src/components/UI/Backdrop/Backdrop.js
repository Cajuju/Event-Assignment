import React from 'react';

import classes from './Backdrop.css'

const backdrop = (props) => {
    let attachedClasses = [classes.Backdrop, classes.FadeOut];
    if (props.show) {
        attachedClasses = [classes.Backdrop, classes.FadeIn];
    }
    return (
        <div className={attachedClasses.join(' ')} onClick={props.clicked}></div>
    );
};

export default backdrop;