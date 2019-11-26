import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

function Loading() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="primary" />
    </Box>
  )
}

export default Loading
