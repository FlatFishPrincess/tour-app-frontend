import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Typography, CardActions, Button, CardMedia } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Profile() {
   const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Avatar className={classes.avatar}>H</Avatar>
          <Typography gutterBottom variant="h6" component="h2">
            User Name
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            I'm Jiweon Park. I am passionate to traveling all over the world.
            Always carry my laptop to code. I love code! 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Write Post
        </Button>
        <Button size="small" color="primary">
          Edit Profile
        </Button>
      </CardActions>
    </Card>
  )
}
