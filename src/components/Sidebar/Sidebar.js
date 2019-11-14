import React from 'react'
import { Divider, Drawer, List, ListItem, makeStyles } from '@material-ui/core';
import SidebarCard from './Components/SidebarCard';
import clsx from 'clsx';
import SidebarProfile from './Components/SidebarProfile';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

export default function Sidebar(props) {
  const { open, variant, onClose, className, ...rest } = props;
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      variant={variant}
      classes={{ paper: classes.drawer }}
    >
      <div
        className={clsx(classes.root, className)}
      >
        <SidebarProfile />
        <List>
          <ListItem>List Item</ListItem>
        </List>
        <Divider />
        <SidebarCard />
      </div>
    </Drawer>
  )
}
