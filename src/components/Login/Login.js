import React from "react";
import {
  Grid,
  withStyles,
  Tabs,
  Tab,
  Snackbar,
  SnackbarContent,
  IconButton
} from "@material-ui/core";
import { withRouter, Redirect } from "react-router-dom";
import { styles } from './styles';
import clsx from 'clsx';
import axios from 'axios';
import { Close as CloseIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { addUserId, addAdminId, loginAdmin } from '../../shared/actions';
import SignIn from "./Components/SignIn";
import Register from "./Components/Register";
import { createUser, loginUser } from '../../shared/actions/auth-action';

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    activeTab: 0,
    isAdmin: false
  }

  onChangeHandleTabs = (e, activeTab) => {
    this.setState({ activeTab });
  }

  onClickRegister = async (e) => {
    e.preventDefault();
    const { activeTab, redirectToReferrer, snackbarOpen, ...data } = this.state;
    data["userId"] = data.username; // FIXME:  should be handled in backend
    try{
      await this.props.createUser(data);
      this.setState({ snackbarOpen: true, activeTab: 0 })
    } catch(e){
      console.log(e);
    }
  }

  handleOnClickLoginButton = e => {
    e.preventDefault();
    const { isAdmin } = this.state;
    if (isAdmin) {
      this.renderAdminLogin();
    } else {
      this.renderUserLogin();
    }
  }

  renderUserLogin = async () => {
    const { username, password } = this.state;
    try{
      await this.props.loginUser(username, password);
      this.setState({ redirectToReferrer: true })
    } catch(e){
      console.log(e);
    }
    // const LOGIN_USER_URL = 'http://localhost:3000/login/user';
    // axios({
    //   method: 'post',
    //   url: LOGIN_USER_URL,
    //   headers:{
    //     'Accept': 'application/json'
    //   },  
    //   data: {
    //     username: username,
    //     password: password
    //   }
    // })
    // .then(r => {
    //   this.props.addUserId(r.data[0].userId);
    //   this.props.addUser(r.data[0]);
    //   this.setState({ redirectToReferrer: true })
    // })
    // .catch(e => console.log(e))
  }

  renderAdminLogin = async() => {
    const { username, password } = this.state;
    // FIXME: force to make a userID
    const adminId = await this.props.loginAdmin(username, password);
    this.props.addAdminId(adminId);
    this.props.history.push('/admin/dashboard');
    // axios({
    //   method: 'post',
    //   url: LOGIN_ADMIN_URL,
    //   headers:{
    //     'Accept': 'application/json'
    //   },  
    //   data: {
    //     adminId: username,
    //     adminpassword: password
    //   }
    // })
    // .then(r => {
    //   this.props.addAdminId(r.data);
    //   // FIXME: force to set null user
    //   this.props.addUserId(null);
    //   this.props.addUser(null);
    //   this.props.history.push('/admin/dashboard');
    // })
    // .catch(e => console.log(e))
  }

  onChangeRegisterFields = e => {
    const { name, value } = e.target;
    this.setState({[name] : value});
  }

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  }

  onPopupSnackbar = () => {
    const { classes } = this.props;
    const { snackbarOpen, username } = this.state;
    return(
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={this.handleCloseSnackbar}
      >
        <SnackbarContent
          className={clsx(classes.success)}
          message={
            <span className={classes.message}>
              Successfully Registered, hi {username}!
            </span>
          }
          action={[
            <IconButton key="close" color="inherit" onClick={this.handleCloseSnackbar}>
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }

  handleOnChangeAuth = (e) => {
    this.setState(prevState => ({
      isAdmin: !prevState.isAdmin
    }));
  }

  renderSignInPanel = () => {
    const { classes } = this.props;
    const { activeTab, isAdmin } = this.state;
    return (
      <SignIn
        activeTab={activeTab}
        classes={classes}
        isAdmin={isAdmin}
        handleOnChangeAuth={this.handleOnChangeAuth}
        onChangeRegisterFields={this.onChangeRegisterFields}
        handleOnClickLoginButton={this.handleOnClickLoginButton}
      />
    );
  }

  renderRegisterPanel = () => {
    const { classes } = this.props;
    const { activeTab } = this.state;
    return (
      <Register
        activeTab={activeTab}
        classes={classes}
        onChangeRegisterFields={this.onChangeRegisterFields}
        onClickRegister={this.onClickRegister}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { redirectToReferrer, activeTab } = this.state
    const { from } = this.props.location.state || { from: {pathname: "/" }}
    if(redirectToReferrer === true) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <Grid container className={classes.container}>
        <div className={clsx(classes.logotypeContainer, activeTab===1 && classes.registerPhoto )}>
          <img src="https://source.unsplash.com/user/jplenio/1600x900/" alt="logo" className={classes.loginImage} />
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <div>
              <Tabs
                value={activeTab}
                onChange={this.onChangeHandleTabs}
                indicatorColor="primary"
                textColor="primary"
                centered
                variant="fullWidth"
              >
                <Tab label="Sign In" />
                <Tab label="Register" />
              </Tabs>
            </div>
            {this.renderSignInPanel()}
            {this.renderRegisterPanel()}
          </div>
        </div>
        {this.onPopupSnackbar()}
      </Grid>
    )
  }
}

const mapDispatchToProps = {
  addUserId,
  addAdminId,
  loginAdmin,
  createUser,
  loginUser
}

// const mapStateToProps = ({ users }) => {
//   console.log('state,', users);
//   return ({
//     users
//   })
// }

export default connect(null, mapDispatchToProps)(
  withStyles(styles)(
    withRouter(Login)
  )
);
