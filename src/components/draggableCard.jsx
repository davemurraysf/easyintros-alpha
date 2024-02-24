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
import { sendMessageToBackground, listenForMessages, startNavigationWithInput } from '../data/controller';

// Define your draggable item types
const ItemTypes = {
  CARD: 'card',
};

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

  const [status, setStatus] = useState('active');

  useEffect(() => {
    listenForMessages((message) => {
      if (message.status) {
        console.log('Status updated from Chrome storage:', message.status);
        setStatus(message.status);
      }
    });

    // Note: The logic for initializing and listening to chrome.storage changes remains the same
    // Ensure this part is only run in the context of a Chrome extension
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['status'], (result) => {
        if (result.status) {
          setStatus(result.status);
        }
      });

      const handleStorageChange = (changes, area) => {
        if (area === 'local' && changes.status) {
          const newStatus = changes.status.newValue;
          setStatus(newStatus);
        }
      };

      chrome.storage.onChanged.addListener(handleStorageChange);

      return () => chrome.storage.onChanged.removeListener(handleStorageChange);
    } else {
      console.warn('Chrome storage API is not available.');
    }
  }, []);

  const handleStartClick = async () => {
    try {
      console.log('Sending message to background script...');
      await startNavigationWithInput("https://www.instagram.com","dmurraySF");
      console.log('Message sent to background script.');
    } catch (error) {
      console.error('Error sending message to background script:', error.message);
    }
  };

  drag(drop(ref));

  const dummyStatus = {
    'navigation_completed': {
      text: 'Completed',
      color: 'success',
      icon: <CheckCircleOutlineIcon />,
    },
    // Additional statuses as needed
  };

  return (
    <Card ref={ref} sx={{ mb: 1, maxWidth: 300 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Instagram Outreach
        </Typography>
        <Box m={1}>
          <LinearProgress variant="determinate" value={60} />
        </Box>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Button variant="contained" color={dummyStatus[status]?.color} startIcon={dummyStatus[status]?.icon}>
              {dummyStatus[status]?.text || status}
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
