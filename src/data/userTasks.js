// UserTasks.js

// Function to save user Tasks data to localStorage
export const saveUserTasks = (userTasks) => {
  // Retrieve existing data from localStorage
  const existingUserTasksString = localStorage.getItem('userTasks');
  let existingUserTasks = existingUserTasksString ? JSON.parse(existingUserTasksString) : [];

  // Update or append values in existingUserTasks
  existingUserTasks = [
    ...existingUserTasks, // Keep existing data
    ...userTasks, // Update or append new data
  ];

  // Save the modified data back to localStorage
  localStorage.setItem('userTasks', JSON.stringify(existingUserTasks));
};

// Function to get user Tasks data from localStorage
export const getUserTasks = () => {
  const userTasksString = localStorage.getItem('userTasks');
  return userTasksString ? JSON.parse(userTasksString) : [];
};

export const clearUserTasks = () => {
  localStorage.removeItem('userTasks');
};
