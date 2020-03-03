import React from 'react';
import { AppBar,  Toolbar, IconButton, MenuItem, Menu } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';
// import { fakeAuth } from '../../App';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import LOGO from '../../static/LOGO2.png';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  title: {
    textDecoration: 'none',
    color: 'white',
  }
}));

export default function Header(props) {
  // const [auth, setAuth] = React.useState(true);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { className, onSidebarOpen, ...rest } = props;

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const AuthButton = withRouter(({ history }) => (
  //   fakeAuth.isAuthenticated === true
  //   ? <p>Welcome! <button onClick={() => { fakeAuth.signOut(() => history.push("/"))}} >Sign out</button></p>
  //   : <p>You r not logged in</p>
  // ))

  return (
    // <div className={classes.root}>
      <AppBar
       className={clsx(classes.root, className)}
       color="secondary"
      >
      <Toolbar>
        <Link to="/app/dashboard">
          <img src={LOGO} width="220px" alt="logo"/>
        </Link>
        <div className={classes.flexGrow} />
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem component="a" href='/app/profile'>Profile</MenuItem>
            </Menu>
          </div>
      </Toolbar>
    </AppBar>
  )
}
      