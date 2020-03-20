import React from 'react'
import { Typography, Box, Button, TextField } from '@material-ui/core';
import { TabPanel } from './TabPanel';

const Register = ({ activeTab, classes, onChangeRegisterFields, onClickRegister }) => {
  return (
    <TabPanel activeTab={activeTab} index={1}>
      <Typography variant="h3" className={classes.greeting}>
        Welcome!
      </Typography>
      <Typography variant="h4" className={classes.subGreeting}>
        Register
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <TextField
          label="First Name"
          margin="normal"
          name="firstName"
          required
          onChange={onChangeRegisterFields}
        />
        <TextField
          label="Last Name"
          margin="normal"
          name="lastName"
          required
          onChange={onChangeRegisterFields}
        />
      </Box>
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
      <TextField
        label="email"
        type="email"
        margin="normal"
        name="email"
        required
        onChange={onChangeRegisterFields}
      />
        <TextField
        label="Phone Number"
        margin="normal"
        name="phoneNum"
        onChange={onChangeRegisterFields}
      />
      <TextField
        label="Type your Personal Fav or anything!"
        margin="normal"
        name="profile"
        onChange={onChangeRegisterFields}
        multiline
        rows={3}
      />
      <Button
        onClick={onClickRegister}
        variant="contained"
        color="primary"
        size="large"
        className={classes.signInButton}
      >
        Register
      </Button>
    </TabPanel>
  )
}

export default Register;
