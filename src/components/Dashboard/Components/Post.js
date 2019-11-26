import React, { useEffect, useRef } from 'react'
import { Box, makeStyles, Card, CardHeader, Avatar, IconButton, Collapse, CardMedia, CardContent, CardActions, Typography, TextField, Button, MobileStepper } from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  ExpandMore as ExpandMoreIcon,
  Comment as CommentIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon
} from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';
import axios from 'axios';
import { deepOrange, red } from '@material-ui/core/colors';
import Comment from './Comment';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { SERVER_HOST } from '../../../shared/utils/server.util';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    margin: `0 auto ${theme.spacing(4)}px auto`,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: deepOrange[500],
  },
  comments: {
    color: theme.palette.primary,
  },
  favIcon: {
    color: red[500]
  },
  writeCommentWrapper: {
    display: 'flex',
    justifyConent: 'space-between'
  },
  img: {
    height: 255,
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    objectFit: 'cover'
  },
}));


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Post(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [photos, setPhotos] = React.useState([]);
  const [fav, setFav] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState('');
  const [isCommentUpdated, setIsCommentUpdated] = React.useState(false);
  const { review, handleSaveComment, storedUserId } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = photos.length;

  const prevCommentUpdated = usePrevious(isCommentUpdated);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function fetchUserAndComments() {
      await fetchUser();
      await fetchComment();
      await fetchPhotos();
    }
    // Execute the created function directly
    fetchUserAndComments();
  
    if(prevCommentUpdated !== isCommentUpdated) {
      fetchComment();
      setIsCommentUpdated(false);
     }
  }, [isCommentUpdated]);


  const fetchUser = () => {
    const FETCH_USER = `http://localhost:3000/get/user/${review.userId}`
    axios.get(FETCH_USER)
    .then(res => {
      setUser(res.data[0]);
    })
    .catch(err => {
      console.log('error occured,', err);
    })
  }

  const fetchComment = () => {
    const FETCH_COMMENT = `http://localhost:3000/get/comment/review/${review.reviewId}`;
    axios.get(FETCH_COMMENT)
    .then(res => {
      setComments(res.data);
    })
    .catch(err => {
      console.log('error occured,', err);
    })
  }

  const fetchPhotos = () => {
    const FETcH_REVIEW_PHOTOS = `http://localhost:3000/get/review/photo/${review.reviewId}`;
    axios.get(FETcH_REVIEW_PHOTOS)
    .then(res => {
      setPhotos(res.data);
    })
    .catch(err => {
      console.log('error occured,', err);
    })
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleFavIconColor = () => {
    setFav(!fav);
  }

  const handleSendPostOnClick = e => {
    e.preventDefault();
    handleSaveComment(commentValue, review.reviewId);
    setIsCommentUpdated(true);
    setCommentValue('');
  }

  const handleWriteCommentOnChange = e => {
    const { value } = e.target;
    setCommentValue(value);
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  const renderPhotos = () => {
    if(maxSteps === 0) {
      return (
        <CardMedia
        className={classes.media}
        image={`${SERVER_HOST}/public/shared/notfound.png`}
      />
      )
    }
    return (
      <React.Fragment>
      <AutoPlaySwipeableViews
        axis='x'
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {photos.map((step, index) => (
          <div >
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={`${SERVER_HOST}/${step.path}`} alt='Review Photos' />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            <KeyboardArrowRightIcon />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeftIcon />
            Back
          </Button>
        }
      />
      </React.Fragment>
    )
  }

  console.log('photos?', photos)

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {user.firstName && user.firstName.substring(0,2)}
          </Avatar>
        }
        action={
          <IconButton aria-label="Settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${user.firstName} ${user.lastName}`}
        subheader={review.createdDate}
      />
      {renderPhotos()}
      <CardContent>
        <Typography gutterBottom paragraph>
          {review.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {review.reviewDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon onClick={toggleFavIconColor} className={clsx({[classes.favIcon]: fav})}/>
        </IconButton>
        <IconButton aria-label="Share">
          <CommentIcon onClick={handleExpandClick}/>
        </IconButton>
        <Box component="fieldset" borderColor="transparent">
          <Rating value={review.rating} readOnly />
        </Box>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {
            comments.length > 0
            ?
            comments.map(comment => (
              <Comment comment={comment} key={comment.commentId}/>
            ))
            :
            <Typography>No comment found</Typography>
          }
          {
            storedUserId && 
            <div className={classes.writeCommentWrapper}>
              <TextField
                label="Write Comment"
                margin="normal"
                variant="outlined"
                fullWidth
                name="comment"
                onChange={handleWriteCommentOnChange}
                value={commentValue}
              />
              <Button
                color='primary'
                // variant="contained"
                onClick={handleSendPostOnClick}
              >
                Send
              </Button>
            </div>
          }
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Post
