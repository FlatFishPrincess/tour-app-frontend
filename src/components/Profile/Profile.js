import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import ProfileCard from './ProfileCard';
import ProfileDetail from './ProfileDetail';
import { connect } from 'react-redux';
import axios from 'axios';
import { addUser } from '../../shared/actions/actions';
import ProfileSnackbar from './ProfileSnackbar';
import AccessDeniedDialog from '../Global/AccessDeniedDialog';
import Upload from '../Review/Components/Upload';

const Profile = (props) => {
  const { user } = props;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [prevImg, setPrevImg] = useState(null);

  const handleChangeUserInfo = (entity) => {
    const data = { ...user, ...entity };
    const UPDATE_USER_URL = `http://localhost:3000/update/user/${user.userId}`;
    axios({
      method: 'put',
      url: UPDATE_USER_URL,
      headers:{
        'Accept': 'application/json'
      },  
      data
    })
    .then(r => {
      fetchUpdatedUser();
    })
    .catch(e => console.log(e))
  }

  const handleSaveProfileInfo = () => {
    const UPDATE_USER_URL = `http://localhost:3000/update/user/profile/${user.userId}`
    const formData = new FormData();
    console.log('profile?',files[0]);
    // files are array, only get one
    formData.append('profile', files[0]);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    
    axios.post(UPDATE_USER_URL,formData,config)
      .then((response) => {
          fetchUpdatedUser();
          setOpenSnackbar(true);
      }).catch((error) => {
        console.log(error);
    });

  }

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  }

  const renderUpdateSuccessSnackbar = () => {
    return (
      <ProfileSnackbar
        open={openSnackbar}
        closeSnackbar={closeSnackbar}
      />
    );
  }

  const fetchUpdatedUser = () => {
    const FETCH_USER = `http://localhost:3000/get/user/${user.userId}`
    const { addUser } = props;
    axios.get(FETCH_USER)
    .then(res => {
      addUser(res.data[0]);
      setOpenSnackbar(true);
    })
    .catch(err => {
      console.log('error occured,', err);
    })
  }

  const onFilesAdded = (file) => {
    setFiles(files.concat(file));
  }

  const handleClickOpenUploadDialog = () => {
    setUploadDialogOpen(true);
  }

  const handleClickCloseUploadDialog = () => {
    setUploadDialogOpen(false);
    if (files[0]) {
      const prevImg = URL.createObjectURL(files[0]);
      setPrevImg(prevImg);
    } 
  }

  const renderUploadDialog = () => {
    return (
      <Upload 
        open={uploadDialogOpen}
        handleClose={handleClickCloseUploadDialog}
        onFilesAdded={onFilesAdded}
        files={files}
      />
    )
  }

  if(!props.user) {
    return (
      <AccessDeniedDialog />
    );
  }

  return (
    <div>
      <Grid container spacing={4}>
      <Grid item lg={4} md={6} xl={4} xs={12}>
        <ProfileCard
          user={user}
          prevImg={prevImg}
          handleChangeUserInfo={handleChangeUserInfo}
          handleUploadProfileOnClick={handleClickOpenUploadDialog}
          handleSaveProfileOnClick={handleSaveProfileInfo}
        />
      </Grid>
      <Grid item lg={8} md={6} xl={8} xs={12}>
        <ProfileDetail user={user} handleChangeUserInfo={handleChangeUserInfo} />
      </Grid>
      </Grid>
      {renderUploadDialog()}
      {renderUpdateSuccessSnackbar()}
    </div>
  )
}

const mapDispatchToProps = {
  addUser
}

const mapStateToProps = state => ({
  user: state.users.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
