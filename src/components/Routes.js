import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";

import Header from "./Header/Header";
// import Sidebar from "../Sidebar";
import Review from './Review/Review';
import Dashboard from "./Dashboard/Dashboard";

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: `calc(100vw - 240px)`,
    minHeight: "100vh",
  },
}));

const Routes = (props) => {
  const classes = useStyles();

  return (
    <div>
      <>
        <Header  />
        <div className={classes.root}>
          <div className={classes.content}>
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/write-review" component={Review} />
            </Switch>
          </div>
        </div>
      </>
    </div>
  );
}

export default withRouter(Routes);
