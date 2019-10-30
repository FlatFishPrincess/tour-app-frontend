import React from 'react'
import { Card, Divider, CardHeader, TextField, Grid, CardContent, Button, CardActions } from '@material-ui/core';
export default function LocationCard() {
  return (
    <Card>
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="This location will be displayed in user page"
          title="Setting Location"
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
                // helperText="Please specify the first name"
                label="Location name"
                margin="dense"
                name="location"
                // onChange={handleChange}
                required
                // value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                margin="dense"
                name="country"
                // onChange={handleChange}
                required
                // value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={10}
                margin="dense"
                name="description"
                required
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
            Save Location
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
