import React, { Component } from 'react'
import { withStyles, Grid } from '@material-ui/core';
import { styles } from './styles';
import Post from './Components/Post';
import CountryList from './Components/CountryList';

class Dashboard extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.row}>
        <Grid container className={classes.grid} spacing={2}>
          <CountryList />
        </Grid>
        <Grid container className={classes.grid} spacing={2}>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={6}>
            <Post />
            <Post />
            <Post />
            <Post />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard);
