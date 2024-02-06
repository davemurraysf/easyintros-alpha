import React, { useRef, useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  IconButton,
  Typography,
  Grid,
  LinearProgress,
  Button,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  FileCopy as FileCopyIcon,
  Minimize as MinimizeIcon,
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

  const [text] = useState('Active Outreach'); // Change the title

  // Dummy data for progress bars (You can replace with actual data)
  const instagramProgress = 60; // Progress value for Instagram
  const facebookProgress = 40; // Progress value for Facebook

  // Placeholder for status indicator based on the 'status' prop
  const getStatusIndicator = () => {
    switch (status) {
      case 'paused':
        return (
          <Button variant="contained" color="warning" startIcon={<PauseIcon />}>
            Paused
          </Button>
        );
      case 'stopped':
        return (
          <Button variant="contained" color="error" startIcon={<PlayArrowIcon />}>
            Stopped
          </Button>
        );
      case 'active':
        return (
          <Button variant="contained" color="primary" startIcon={<PlayArrowIcon />}>
            {type === 'active' ? 'Active' : 'Default'}
          </Button>
        );
      case 'finished':
        return (
          <Button variant="contained" color="success" startIcon={<CheckCircleOutlineIcon />}>
            Finished
          </Button>
        );
      default:
        // Dummy status indicator when 'status' is not one of the above
        return (
          <Button variant="contained" color="info">
            Dummy Status
          </Button>
        );
    }
  };

  const handlePauseInstagram = () => {
    // Add logic to pause Instagram outreach
  };

  const handleStartInstagram = () => {
    // Add logic to start Instagram outreach
  };

  const handlePauseFacebook = () => {
    // Add logic to pause Facebook outreach
  };

  const handleStartFacebook = () => {
    // Add logic to start Facebook outreach
  };

  drag(drop(ref));

  return (
    <Card ref={ref} sx={{ mb: 1, width: '100%', padding: '8px' }}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h5" gutterBottom>
              {text}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {/* Place the status indicator next to the progress bar */}
            {getStatusIndicator()}
          </Grid>
          <Grid item xs={3}>
            <div>
              <IconButton onClick={() => duplicateCard(index)}>
                <FileCopyIcon />
              </IconButton>
              <IconButton onClick={() => removeCard(index)}>
                <DeleteIcon />
              </IconButton>
              <IconButton>
                <MinimizeIcon />
              </IconButton>
              <IconButton>
                <PauseIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography>Instagram Outreach:</Typography>
          </Grid>
          <Grid item xs={3}>
            <Box m={1}> {/* Add margin around the progress bar */}
              <LinearProgress variant="determinate" value={instagramProgress} />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="contained" color="primary" onClick={handlePauseInstagram}>
                Pause
              </Button>
              <Button variant="contained" color="primary" onClick={handleStartInstagram}>
                Start
              </Button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography>Facebook Outreach:</Typography>
          </Grid>
          <Grid item xs={3}>
            <Box m={1}> {/* Add margin around the progress bar */}
              <LinearProgress variant="determinate" value={facebookProgress} />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="contained" color="primary" onClick={handlePauseFacebook}>
                Pause
              </Button>
              <Button variant="contained" color="primary" onClick={handleStartFacebook}>
                Start
              </Button>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DraggableCard;





