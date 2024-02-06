import React, { useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
  FileCopy as FileCopyIcon,
  Minimize as MinimizeIcon,
} from '@mui/icons-material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import DraggableCard from '../../components/draggableCard';
import { getInitialCardOrder, saveCardOrder, clearCardOrder } from '../../data/cards';
import Header from '../../components/Header';

const Dashboard = () => {
  const [cards, setCards] = useState([]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) => update(prevCards, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, prevCards[dragIndex]],
      ],
    }));

    // Save the updated card order to local storage
    saveCardOrder(cards);
  }, [cards]);

  const removeCard = useCallback((index) => {
    setCards((prevCards) => update(prevCards, {
      $splice: [
        [index, 1],
      ],
    }));

    // Save the updated card order to local storage
    saveCardOrder(cards);
  }, [cards]);

  const duplicateCard = useCallback((index) => {
    setCards((prevCards) => {
      const cardToDuplicate = prevCards[index];
      const newCard = { id: prevCards.length + 1, text: `Card ${prevCards.length + 1}` };
      const newCards = [...prevCards, newCard];

      // Save the updated card order to local storage
      saveCardOrder(newCards);

      return newCards;
    });
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleAddIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAddNewCard = (newCardCount) => {
    setAnchorEl(null);
    const newCards = [];
    for (let i = 0; i < newCardCount; i++) {
      const newCard = { id: cards.length + i + 1, text: `Card ${cards.length + i + 1}` };
      newCards.push(newCard);
    }
    setCards((prevCards) => [...prevCards, ...newCards]);
    saveCardOrder([...cards, ...newCards]);
  };

  const handleClearAllCards = () => {
    setCards([]);
    clearCardOrder();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box m="20px">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      </Box>
      <Box sx={{ flexGrow: 1, padding: '8px' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={handleAddIconClick}>
              <AddIcon />
            </IconButton>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearAllCards}
            >
              Clear All
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={() => handleAddNewCard(1)}>Add 1 Card</MenuItem>
              <MenuItem onClick={() => handleAddNewCard(2)}>Add 2 Cards</MenuItem>
              <MenuItem onClick={() => handleAddNewCard(3)}>Add 3 Cards</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Grid container spacing={2} justifyContent="center">
          {cards.map((card) => (
            <Grid item key={card.id} sx={{ marginTop: '16px' }}>
              {/* Pass a 'status' prop with a placeholder status value */}
              <DraggableCard
                id={card.id}
                text={card.text}
                moveCard={moveCard}
                removeCard={removeCard}
                duplicateCard={duplicateCard}
                status={card.status || 'active'} // Set the default status here
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </DndProvider>
  );
};

export default Dashboard;
