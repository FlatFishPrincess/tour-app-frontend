import React from 'react'
import { Card, CardContent, Typography, Divider, CardActions, Button, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

export default function ProfileCard() {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              Jiweon Park
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              profile detail will be displayed here! 
              This is Jiweon Park, I love codeing and traveling! 
              Wannt be a nomad coder :)
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            // src={user.avatar}
          >
            JP
          </Avatar>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  )
}
