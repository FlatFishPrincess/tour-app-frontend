import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
  CardActions,
  Button,
  Avatar,
  Grid,
  TextField,

} from '@material-ui/core';

export default function ProfileDetail() {
  return (
    <Card>
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="User name"
                margin="dense"
                name="userName"
                // onChange={handleChange}
                required
                // value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                margin="dense"
                name="password"
                type="password"
                // onChange={handleChange}
                required
                // value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Profile"
                multiline
                rows={10}
                margin="dense"
                name="profile"
                // onChange={handleChange}
                // value={values.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
          >
            Save Profile
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
