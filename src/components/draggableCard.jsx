import React, { useRef, useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
  Button,
  Grid,
} from '@mui/material';
import {
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';
import { useDrag, useDrop } from 'react-dnd';

// Define your draggable item types
const ItemTypes = {
  CARD: 'card',
};

// Draggable Card Component
const DraggableCard = ({ id, index, moveCard, removeCard, duplicateCard, status, type = 'active' }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id, index },
  });

  const [text] = useState('Instagram Outreach'); // Change the title
  const instagramProgress = 60; // Progress value for Instagram

  // Define dummy status data
  const dummyStatus = {
    paused: {
      text: 'Paused',
      color: 'warning',
      icon: <PauseIcon />,
    },
    stopped: {
      text: 'Stopped',
      color: 'error',
      icon: <PlayArrowIcon />,
    },
    active: {
      text: type === 'active' ? 'Active' : 'Default',
      color: 'primary',
      icon: <PlayArrowIcon />,
    },
    finished: {
      text: 'Finished',
      color: 'success',
      icon: <CheckCircleOutlineIcon />,
    },
  };

  // Define a function to get the status indicator based on the 'status' prop
  const getStatusIndicator = () => {
    const statusData = dummyStatus[status] || null;
    if (statusData) {
      return (
        <Button variant="contained" color={statusData.color} startIcon={statusData.icon}>
          {statusData.text}
        </Button>
      );
    }
    return null;
  };

  // Function to handle the "Start" button click
// Function to handle the "Start" button click
const handleStartClick = () => {
  // Check if the 'chrome' object is defined (i.e., in a Chrome extension context)
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    // Send a message to the background script to trigger the navigation action
    chrome.runtime.sendMessage({ action: 'start_navigation' });
  } else {
    // Handle the case where 'chrome' is not defined or doesn't have the 'runtime' property
    console.error('The "chrome.runtime" API is not available in this environment.');
  }
};




  drag(drop(ref));

  return (
    <Card ref={ref} sx={{ mb: 1, maxWidth: 300 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {text}
        </Typography>
        <Box m={1}>
          <LinearProgress variant="determinate" value={instagramProgress} />
        </Box>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            {getStatusIndicator()}
          </Grid>
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








