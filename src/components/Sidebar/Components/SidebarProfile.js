import React from 'react'
import { Avatar, Typography, makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

export default function SidebarProfile() {
  const classes = useStyles();

  const user = {
    name: 'Jiweon Park',
    // avatar: '/images/avatars/avatar_11.png',
    profile: "I'm Jiweon Park. I am passionate to traveling all over the world. Always carry my laptop to code. I love code!"
  };

  return (
    <div className={classes.root}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar && user.avatar}
        to="/app/profile"
      >
        {user.avatar ? '' : user.name.substring(0,2)}
      </Avatar>
       <Typography
        className={classes.name}
        variant="h6"
        gutterBottom={true}
        color='primary'
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.profile}</Typography>
    </div>
  )
}
