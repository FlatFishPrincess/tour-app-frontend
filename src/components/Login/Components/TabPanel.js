import React from 'react';
import { Typography, Box } from '@material-ui/core';

export const TabPanel = (props) => {
  const { children, activeTab, index, ...other } = props;
  return (
    <Typography
      component="div"
      hidden={activeTab !== index}
      {...other}
    >
      <Box flexDirection="column" display="flex" p={3} width="350px" margin="auto">{children}</Box>
    </Typography>
  );
}