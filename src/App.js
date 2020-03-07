import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import Routes from './components/Routes';

const App = (props) =>  {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <Route
          exact
          path="/admin"
          render={() => <Redirect to="/admin/dashboard" />}
        />
        <Route path="/admin" component={Routes} />
        <Route path="/login" component={Login} />
        <Route path="/app" component={Routes} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  userId: state.users.userId
});

export default connect(mapStateToProps, null)(App);
