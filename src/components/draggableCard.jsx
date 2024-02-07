import React, { useRef, useState, useEffect } from 'react';
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
import { sendMessageToBackground, listenForBackgroundMessages } from '../data/controller';

// Define your draggable item types
const ItemTypes = {
  CARD: 'card',
};

// Draggable Card Component
const DraggableCard = ({ id, index, moveCard, removeCard, duplicateCard, type = 'active' }) => {
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

  // State to hold the status
  const [status, setStatus] = useState('active');

  // Effect to listen for messages from the background script
  useEffect(() => {
    // Check if the 'chrome' object is defined (i.e., in a Chrome extension context)
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
      const handleMessage = (message) => {
        console.log('Message recieved')
        if (message && message.status === 'navigation_completed') {
          setStatus('finished');
        }
      };

      // Listen for messages from the background script
      listenForBackgroundMessages(handleMessage);

      // Clean up the listener when component unmounts
      return () => {
        // Remove the listener
      };
    } else {
      console.warn('Chrome runtime API is not available.');
    }
  }, []);

  // Function to handle the "Start" button click
  const handleStartClick = async () => {
    try {
      // Send a message to the background script to trigger the navigation action
      await sendMessageToBackground({ action: 'start_navigation' });
    } catch (error) {
      console.error('Error sending message to background script:', error.message);
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
            <Button variant="contained" color={dummyStatus[status]?.color} startIcon={dummyStatus[status]?.icon}>
              {dummyStatus[status]?.text}
            </Button>
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



