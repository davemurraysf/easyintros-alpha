// DraggableCard.js

import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
  Button,
  Grid,
} from '@mui/material';

const DraggableCard = () => {
  const handleStartClick = () => {
    // Send a message to the background script to trigger the action
    chrome.runtime.sendMessage({ action: 'startScraping' });
  };

  return (
    <Card sx={{ mb: 1, maxWidth: 300 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Website Scraper
        </Typography>
        <Box m={1}>
          <LinearProgress variant="determinate" value={0} />
        </Box>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleStartClick}>
              Start
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DraggableCard;
