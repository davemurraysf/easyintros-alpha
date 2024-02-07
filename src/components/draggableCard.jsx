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

// Function to send a message to the background script
const sendMessageToBackground = async (message) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(response);
      }
    });
  });
};

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

  // Function to update status in Chrome storage
  const updateStatusInStorage = (newStatus) => {
    chrome.storage.local.set({ status: newStatus }, () => {
      console.log('Status updated in Chrome storage:', newStatus);
    });
  };

  // Effect to listen for messages from the background script
  useEffect(() => {
    // Check if the 'chrome' object is defined (i.e., in a Chrome extension context)
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
      const handleMessage = (message) => {
        console.log('Message received:', message); // Debugging: Log received message
        if (message && message.status) {
          setStatus(message.status);
        }
      };

      // Listen for messages from the background script
      chrome.runtime.onMessage.addListener(handleMessage);

      // Clean up the listener when component unmounts
      return () => {
        chrome.runtime.onMessage.removeListener(handleMessage);
      };
    } else {
      console.warn('Chrome runtime API is not available.');
    }
  }, []);

  // Function to handle the "Start" button click
  const handleStartClick = async () => {
    try {
      // Send a message to the background script to trigger the navigation action
      console.log('Sending message to background script...');
      await sendMessageToBackground({ action: 'start_navigation' });
      console.log('Message sent to background script.'); // Debugging: Log message sent

      // Update status locally
      setStatus('pending');

      // Update status in Chrome storage
      updateStatusInStorage('pending');
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





