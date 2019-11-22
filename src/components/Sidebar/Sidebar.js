import React from 'react'
import { Divider, Drawer, List, ListItem, makeStyles, ListItemIcon, ListItemText } from '@material-ui/core';
import clsx from 'clsx';
import SidebarProfile from './Components/SidebarProfile';
import {
  Dashboard as DashboardIcon,
  PostAdd as PostAddIcon,
  AccountCircle as AccountIcon,
  // PhotoCamera as PhotoCameraIcon,
} from '@material-ui/icons';
import { connect } from 'react-redux';

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
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose, className, user, adminId } = props;
  console.log('adminid?', adminId);
  const classes = useStyles();
  const sidebarNav = [
    {
      title: 'Dashboard',
      href: '/app/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Write Review',
      href: '/app/write-review',
      icon: <PostAddIcon />
    },
    {
      title: 'Account',
      href: '/app/profile',
      icon: <AccountIcon />
    },
  ];

  const sidebarBelow = [
    {
      title: 'Wrtie Post',
      href: '/app/write-review',
      icon: <PostAddIcon />
    },
    // {
    //   title: 'Wrtie Post',
    //   href: '/app/write-review',
    //   icon: <PhotoCameraIcon />
    // },
  ];

  const adminSidebarNav = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: <DashboardIcon />
    },
  ];

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
        <SidebarProfile user={user} adminId={adminId} />
        <Divider className={classes.divider}/>
        <List>
          {user && sidebarNav.map(e => (
            <ListItem button component="a" href={e.href} key={e.href}>
              <ListItemIcon>
                {e.icon}
              </ListItemIcon>
              <ListItemText primary={e.title} />
            </ListItem>
          ))}
          {adminId && adminSidebarNav.map(e=> (
            <ListItem button component="a" href={e.href} key={e.href}>
              <ListItemIcon>
                {e.icon}
              </ListItemIcon>
              <ListItemText primary={e.title} />
            </ListItem>
          ))}
        </List>
        <Divider className={classes.divider}/>
        {
          user && 
          <List>
            {sidebarBelow.map(e => (
              <ListItem button component="a" href={e.href} key={e.href}>
                <ListItemIcon>
                  {e.icon}
                </ListItemIcon>
                <ListItemText primary={e.title} />
              </ListItem>
            ))}
          </List>
        }
      </div>
    </Drawer>
  )
}

const mapStateToProps = state => ({
  user: state.users.user,
  adminId: state.users.adminId
});

export default connect(mapStateToProps, null)(Sidebar);
