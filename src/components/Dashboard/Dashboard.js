import React, { Component } from 'react'
import { withStyles, Grid } from '@material-ui/core';
import { styles } from './styles';
import Post from './Components/Post';
import CountryList from './Components/CountryList';
import axios from 'axios';
import { connect } from 'react-redux';
import { getReviews } from '../../shared/actions/review-action';
import { getLocations } from '../../shared/actions/location-action';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentUpdated: false
    };
  }

  componentDidMount(){
    this.props.getReviews();
    this.props.getLocations();
  }

  handlePostCommentOnSave = (comment, reviewId) => {
    const { userId } = this.props;
    if(!userId) {
      // redirect to login page
      // alert('no user Id Found!');
      return;
    }
    const CREATE_COMMENT_URL = 'http://localhost:3000/create/comment';
    const createdDate = new Date().toISOString().substr(0,10);
    this.setState({isCommentUpdated: false})
    const data = {
      userId: userId,
      createdDate: createdDate,
      comment: comment,
      reviewId: reviewId
    };

    axios({
      method: 'post',
      url: CREATE_COMMENT_URL,
      headers:{
        'Accept': 'application/json'
      },  
      data
    })
    .then(r => {
      this.setState({ isCommentUpdated: true })
    })
    .catch(e => console.log(e))
  }

  render() {
    console.log('location saga?', this.props.locations);
    const { classes, userId, locations, reviews, locationLoading } = this.props;
    const { isCommentUpdated } = this.state;
    return (
      <div className={classes.row}>
        <Grid container className={classes.grid} spacing={2}>
          <CountryList locationLoading={locationLoading} locations={locations} />
        </Grid>
        <Grid container className={classes.grid} spacing={2}>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={6}>
            {reviews && reviews.map(review => (
              <Post
                review={review}
                key={review.reviewId}
                handleSaveComment={this.handlePostCommentOnSave}
                storedUserId={userId}
                isCommentUpdated={isCommentUpdated}
                />
            ))}
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getLocations,
  getReviews
}

const mapStateToProps = state => ({
  userId: state.users.userId,
  locations: state.locations.locations,
  locationLoading: state.locations.loading,
  reviews: state.reviews.reviews
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));
