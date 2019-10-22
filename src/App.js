import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  withRouter,
} from 'react-router-dom';
import Login from './components/Login/Login';

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

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated === true
  ? <p>Welcome! <button onClick={() => { fakeAuth.signOut(() => history.push("/"))}} >Sign out</button></p>
  : <p>You r not logged in</p>
))

function App() {
  return (
    <Router>
      <div>
        {/* <AuthButton /> */}
        <ul>
          <li><Link to="/public">Public</Link></li>
          <li><Link to="/protected">Protected</Link></li>
        </ul>
      </div>
      <div>
        <Route path="/public" component={Dashboard} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    </Router>
  );
}
const Protected = () => {
  return <h2>Protected!</h2>
}

const Dashboard = () => {
  return <h2>App!</h2>;
}


export default App;
