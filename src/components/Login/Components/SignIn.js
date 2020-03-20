import React from 'react'
import { Typography, FormGroup, FormControlLabel, Button, TextField, Switch } from '@material-ui/core';
import { TabPanel } from './TabPanel';

const SignIn = ({ activeTab, classes, isAdmin, handleOnChangeAuth, onChangeRegisterFields, handleOnClickLoginButton }) => {
  return (
    <TabPanel activeTab={activeTab} index={0}>
      <Typography variant="h3" className={classes.greeting}>
        Welcome!
      </Typography>
      <Typography variant="h4" className={classes.subGreeting}>
        Sign In
      </Typography>
      <TextField
        label="Username"
        margin="normal"
        name="username"
        required
        onChange={onChangeRegisterFields}
      />
      <TextField
        label="Password"
        type="password"
        margin="normal"
        name="password"
        required
        onChange={onChangeRegisterFields}
      />
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={isAdmin} onChange={handleOnChangeAuth} />}
          label={!isAdmin ? 'User' : 'Admin'}
        />
      </FormGroup>
      <Button
        onClick={handleOnClickLoginButton}
        variant="contained"
        color="primary"
        size="large"
        className={classes.signInButton}
      >
        Log in
      </Button>
    </TabPanel>
  )
}

export default SignIn;
