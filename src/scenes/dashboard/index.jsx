import React, { useEffect } from 'react';
import {
  Box,
  Container,
} from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableCard from '../../components/draggableCard';
import Header from '../../components/Header';

const cardStyle = {
  maxWidth: 300, // Maximum width of 300px for the card
};

const Dashboard = () => {
  useEffect(() => {
    // Load card order from local storage or set the default card
    const savedCards = localStorage.getItem('cardOrder');
    if (!savedCards) {
      const defaultCard = { id: 1, text: 'Default Card', status: 'active' };
      localStorage.setItem('cardOrder', JSON.stringify([defaultCard]));
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box m="20px">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      </Box>
      <Container sx={cardStyle}>
        <DraggableCard
          id={1}
          index={0}
          moveCard={() => {}}
          status="active"
        />
      </Container>
    </DndProvider>
  );
};

export default Dashboard;




