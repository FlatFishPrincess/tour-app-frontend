import React from 'react'
import LocationCard from './Components/LocationCard';
import LocationTable from './Components/LocationTable';
import AdminProfile from './Components/AdminProfile';
import { Grid } from '@material-ui/core';

export default function Admin() {
  return (
    <Grid container spacing={4}>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <AdminProfile />
        <LocationTable />
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <LocationCard />
      </Grid>
    </Grid>
  )
}
