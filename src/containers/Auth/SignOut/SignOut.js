import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class SignOut extends Component {
    componentDidMount () {
        this.props.onSignOut(this.props.history);
    }

    render() {
        return (
            <Redirect to='/' />
        );
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSignOut: () => dispatch(actions.signout()),
    };
}

export default connect(null, mapDispatchToProps)(SignOut);