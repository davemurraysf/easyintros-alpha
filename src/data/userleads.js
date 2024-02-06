// UserLeads.js

// Function to save user leads data to localStorage
export const saveUserLeads = (userLeads) => {
  // Retrieve existing data from localStorage
  const existingUserLeadsString = localStorage.getItem('userLeads');
  let existingUserLeads = existingUserLeadsString ? JSON.parse(existingUserLeadsString) : [];

  // Update or append values in existingUserLeads
  existingUserLeads = [
    ...existingUserLeads, // Keep existing data
    ...userLeads, // Update or append new data
  ];

  // Save the modified data back to localStorage
  localStorage.setItem('userLeads', JSON.stringify(existingUserLeads));
};

// Function to get user leads data from localStorage
export const getUserLeads = () => {
  const userLeadsString = localStorage.getItem('userLeads');
  return userLeadsString ? JSON.parse(userLeadsString) : [];
};

export const clearUserLeads = () => {
  localStorage.removeItem('userLeads');
};
