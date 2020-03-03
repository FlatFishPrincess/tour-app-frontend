import React, { Component } from 'react'
import { withStyles, Grid } from '@material-ui/core';
import { styles } from './styles';
import Post from './Components/Post';
import CountryList from './Components/CountryList';
import axios from 'axios';
import { connect } from 'react-redux';
import Loading from '../Global/Loading';
import { getLocations } from '../../shared/actions/actions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      reviews: [],
      isCommentUpdated: false,
      loading: true,
    };
  }

  componentDidMount(){
    const GET_REVIEWS_API = 'http://localhost:3000/get/review';
    const GET_LOCATIONS_API = 'http://localhost:3000/get/location';
    this.setState({ loading: true })
    axios.all([
      axios.get(GET_REVIEWS_API),
      axios.get(GET_LOCATIONS_API),
    ])
    .then(axios.spread((reviewReponse, locationReponse) => {
      const locations = locationReponse.data;
      const reviews = reviewReponse.data;
      this.setState({ locations, reviews, loading: false });
    }));
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

  handleSagaOnClick = () => {
    const { getLocations } = this.props;
    getLocations();
  }

  render() {
    // if(this.state.loading ) {
    //   return <Loading />
    // }
    console.log('location saga?', this.props.locationSaga);
    const { classes, userId } = this.props;
    const { locations, reviews, isCommentUpdated } = this.state;
    return (
      <div className={classes.row}>
        <button onClick={this.handleSagaOnClick}>SAGA</button>
        <Grid container className={classes.grid} spacing={2}>
          <CountryList locations={locations} />
        </Grid>
        <Grid container className={classes.grid} spacing={2}>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={6}>
            {reviews.map(review => (
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
  getLocations
}

const mapStateToProps = state => ({
  userId: state.users.userId,
  locationSaga: state.locations.locations,
  loading: state.locations.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));
