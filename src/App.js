import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Toolbar from './components/Navigation/Toolbar/Toolbar';
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer';
import EventList from './containers/EventList/EventList';
import EventFocus from './containers/EventFocus/EventFocus';
import Auth from './containers/Auth/Auth';
import SignOut from './containers/Auth/SignOut/SignOut';
import CreateEvent from './containers/CreateEvent/CreateEvent';
import MyTickets from './containers/MyTickets/MyTickets';

import * as actions from './store/actions/index';

class App extends Component {
  state = {
    showSideDrawer: false,
  }

  componentWillMount = () => {
    this.props.onTryAutoSignUp();
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    const toggleDrawer = this.state.showSideDrawer;
    this.setState({showSideDrawer: !toggleDrawer});
  }

  render() {
    let route = (
      <Switch>
        <Route path='/' exact component={EventList} />
        <Route path='/auth' exact component={Auth} />
        <Route path='/signout' exact component={SignOut} />
        <Route path='/createEvent' exact component={CreateEvent} />
        <Route path='/myTickets' exact component={MyTickets} />
        <Route path='/:eventName/:userId' exact component={EventFocus}/>
        <Route path='/myTickets/:eventName/:userId' exact component={EventFocus}/>
        {/* If no routes match, then redirect to home page */}
        <Redirect to='/' />
      </Switch>
    );

    return (
      <div>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
          open={this.state.showSideDrawer}
          isAuthenticated={this.props.isAuthenticated}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        {route}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
