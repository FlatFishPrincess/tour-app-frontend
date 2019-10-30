import React from 'react'
import { Grid } from '@material-ui/core';
import ProfileCard from './ProfileCard';
import ProfileDetail from './ProfileDetail';

export default function Profile() {
  return (
    <div>
      <Grid container spacing={4}>
      <Grid item lg={4} md={6} xl={4} xs={12}>
        <ProfileCard />
      </Grid>
      <Grid item lg={8} md={6} xl={8} xs={12}>
        <ProfileDetail />
      </Grid>
      </Grid>
    </div>
  )
}
