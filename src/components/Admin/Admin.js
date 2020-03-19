import React, { useEffect, useState } from 'react'
import LocationCard from './Components/LocationCard';
import LocationTable from './Components/LocationTable';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import AdminSnackbar from './Components/AdminSnackbar';
import UserTable from './Components/UserTable';
import { getLocations, createLocation } from '../../shared/actions/location-action';
import { getUsers } from '../../shared/actions/auth-action';

const Admin = (props) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    function fetchUsersAndLocations() {
      props.getLocations();
      props.getUsers();
    }
    fetchUsersAndLocations();
  }, []);

  const handleSaveLocation = async (data) => {
    try{
      await props.createLocation(data);
      setOpenSnackbar(true);
    } catch(e){
      console.log(e);
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const renderUpdateSnackbar = () => {
    return (
      <AdminSnackbar
        open={openSnackbar}
        closeSnackbar={handleCloseSnackbar}
      />
    )
  }

  return (
    <Grid container spacing={4}>
      <Grid item lg={5} md={5} xl={5} xs={12}>
        <LocationCard handleSaveLocation={handleSaveLocation} />
      </Grid>
      <Grid item lg={7} md={7} xl={7} xs={12}>
        <UserTable users={props.users}/>
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <LocationTable locations={props.locations}/>
      </Grid>
      {renderUpdateSnackbar()}
    </Grid>
  )
}

const mapStateToProps = state => ({
  adminId: state.users.adminId,
  locations: state.locations.locations,
  users: state.users.users
});

const mapDispatchToProps = {
  getLocations,
  createLocation,
  getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
