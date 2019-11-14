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

export default function SidebarCard() {
   const classes = useStyles();

  return (
    <Card>
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
