import React from "react";
import {
  Grid,
  withStyles,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Box
} from "@material-ui/core";
import { withRouter, Redirect } from "react-router-dom";
import { fakeAuth } from '../../App';
import { styles } from './styles';

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    activeTab: 0
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }

  handleChange = (e, activeTab) => {
    this.setState({ activeTab });
  }

  TabPanel = (props) => {
    const { children, activeTab, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        hidden={activeTab !== index}
        {...other}
      >
        <Box flexDirection="column" display="flex" p={3}>{children}</Box>
      </Typography>
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
        <div className={classes.logotypeContainer}>
          <img src="https://source.unsplash.com/user/jplenio/1600x900/" alt="logo" className={classes.loginImage} />
        </div>
        <div className={classes.formContainer}>
         <Tabs
          value={activeTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Sign In" />
          <Tab label="Register" />
        </Tabs>
        <this.TabPanel activeTab={activeTab} index={0}>
          <Typography variant="h3" className={classes.greeting}>
            Welcome!
          </Typography>
          <Typography variant="h4" className={classes.subGreeting}>
            Sign In
          </Typography>
          <TextField
            label="Username"
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            margin="normal"
          />
          <Button
            onClick={this.login}
            variant="contained"
            color="primary"
            size="large"
            className={classes.signInButton}
          >
            Log in
          </Button>
        </this.TabPanel>
        <this.TabPanel activeTab={activeTab} index={1}>
          Register!
        </this.TabPanel>
        </div>
      </Grid>
    )
  }
}


export default withStyles(styles)(withRouter(Login));
