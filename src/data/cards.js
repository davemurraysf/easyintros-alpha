// data/cards.js

const getCardOrderFromLocalStorage = () => {
  const savedOrder = localStorage.getItem('cardOrder');
  return savedOrder ? JSON.parse(savedOrder) : [];
};

const saveCardOrderToLocalStorage = (cards) => {
  localStorage.setItem('cardOrder', JSON.stringify(cards));
};

export const getInitialCardOrder = () => {
  return getCardOrderFromLocalStorage();
};

export const saveCardOrder = (cards) => {
  saveCardOrderToLocalStorage(cards);
};

export const clearCardOrder = () => {
  localStorage.removeItem('cardOrder');
};
