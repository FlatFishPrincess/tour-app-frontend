import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  withRouter,
  Switch
} from 'react-router-dom';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import Routes from './components/Routes';

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signOut(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log('private route?', {...rest});
  return (
    <Route {...rest} render={(props) => {
      console.log('props?',props);
    return (
      fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: "/login",
        state: { from : props.location }
      }}/>
    )}} />
  )
}

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
        <Route path="/admin" component={Routes} />
        <Route path="/login" component={Login} />
        <Route path="/app" component={Routes} />
        {/* <PrivateRoute path="/protected" component={Protected} /> */}
      </Switch>
    </Router>
  );
}

// const Protected = () => {
//   return <h2>Protected!</h2>
// }

const Dashboard = () => {
  return <h2>App!</h2>;
}

const mapStateToProps = ({ users }) => {
  console.log('state,', users);
  return ({
    users
  })
}

export default connect(mapStateToProps, null)(App);

