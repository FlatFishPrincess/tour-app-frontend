import React from 'react'
import Select from 'react-select';
import { makeStyles, Paper, Grid, Typography, Box, Container, TextField, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Upload from './Components/Upload';

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' }
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3)
  },
  title: {
    margin: theme.spacing(3)
  },
  label: {
    marginBottom: theme.spacing(1)
  }
}));


export default function Review() {
  const [country, setCountry] = React.useState(null);
  const [hover, setHover] = React.useState(-1);
  const [rating, setRating] = React.useState(-1);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [files, setFiles] = React.useState([]);

  const classes = useStyles();
  
  const handleChangeCountry = value => {
    setCountry(value);
  };

  const handleChangeRatingActive = (e, value) => {
    setHover(value);
  }

  const handleChangeRating = (e, value) => {
    setRating(value);
  }

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  }

  const handleClickCloseDialog = () => {
    setDialogOpen(false);
  }

  const onFilesAdded = (file) => {
    setFiles(files.concat(file));
  }

  const renderUploadDialog = () => {
    return (
      <Upload 
        open={dialogOpen}
        handleClose={handleClickCloseDialog}
        onFilesAdded={onFilesAdded}
        files={files}
      />
    )
  }

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Typography align="center" variant="h4" className={classes.title}>Write Review!</Typography>
            <Box m={2}>
              <Typography component="label" variant="h6" className={classes.label}>Rating</Typography>
              <Box display="flex">
                <Rating
                  name="hover-side"
                  value={rating}
                  precision={0.5}
                  onChangeActive={handleChangeRatingActive}
                  onChange={handleChangeRating}
                />
                <Box ml={3}><Typography>{labels[hover !== -1 ? hover : rating]}</Typography></Box>
              </Box>
            </Box>
            <Box m={2}>
              <Typography component="label" variant="h6" className={classes.label}>Select Country</Typography>
              <Select
                inputId="react-select-single"
                placeholder="Search a country (start with a)"
                options={suggestions}
                value={country}
                onChange={handleChangeCountry}
              />
            </Box>
            <Box m={2}>
              <Typography component="label" variant="h6">Title</Typography>
              <TextField
                label="Write Title here"
                fullWidth
                />
            </Box>
            <Box m={2}>
            <Typography component="label" variant="h6" className={classes.label}>Wrtie Your Review Title Here</Typography>
              <TextField
                multiline
                fullWidth
                rows={10}
                variant="outlined"
              />
            </Box>
            <Box m={3}>
              <Button variant="outlined" color="primary" onClick={handleClickOpenDialog}>
                Upload Pictures
              </Button>
            </Box>
            <Box m={3} p={3} display="flex" justifyContent="center">
              <Button variant="contained" color="primary" className={classes.button}>
                Save
              </Button>
            </Box>
          </Paper>
        </div>
      </Container>
      {renderUploadDialog()}
    </React.Fragment>  
  )
}
