import React from 'react'
import Select from 'react-select';
import { makeStyles, Paper, Grid, Typography, Box, Container, TextareaAutosize, TextField } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

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
  title: {
    margin: theme.spacing(3)
  },
}));


export default function Review() {
  const [country, setCountry] = React.useState(null);
  const [hover, setHover] = React.useState(-1);
  const [rating, setRating] = React.useState(-1);
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

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <Paper>
          <Typography align="center" variant="h4" className={classes.title}>Write Review!</Typography>
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
              margin="normal"
              fullWidth
              />
          </Box>
          <Box m={2}>
          <Typography component="label" variant="h6" className={classes.label}>Wrtie Your Review Title Here</Typography>
            <TextField
              placeholder="Write review here"
              multiline
              fullWidth
              rows={10}
              variant="outlined"
            />
          </Box>
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
              <Typography ml={3}>{labels[hover !== -1 ? hover : rating]}</Typography>
            </Box>
          </Box>
        </Paper>
      </div>
    </Container>
  )
}
