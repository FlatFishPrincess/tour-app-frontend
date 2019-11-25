import React from 'react'
import { Card, CardContent, Typography, Divider, CardActions, Button, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SERVER_HOST } from '../../shared/utils/server.util';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    backgroundColor: deepOrange[500],
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

export default function ProfileCard(props) {
  const classes = useStyles();
  const { user, handleUploadProfileOnClick, handleSaveProfileOnClick, prevImg } = props;
  return (
    <Card>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {`${user.profile}`}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={prevImg
                ? prevImg
                : user.photo && `${SERVER_HOST}/${user.photo}`
                }
          >
            {!user.photo && user.firstName.substring(0,2)}
          </Avatar>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          onClick={handleUploadProfileOnClick}
        >
          Upload picture
        </Button>
        <Button
          variant="text"
          color="primary"
          onClick={handleSaveProfileOnClick}
        >
          Save picture
        </Button>
      </CardActions>
    </Card>
  )
}
