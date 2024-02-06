// userinfo.js

// Function to save user info to localStorage
export const saveUserInfo = (userInfo) => {
  // Retrieve existing data from localStorage
  const existingUserInfoString = localStorage.getItem('userInfo');
  let existingUserInfo = existingUserInfoString ? JSON.parse(existingUserInfoString) : {};

  // Update or append values in existingUserInfo
  existingUserInfo = {
      ...existingUserInfo, // Keep existing data
      ...userInfo, // Update or append new data
  };

  // Save the modified data back to localStorage
  localStorage.setItem('userInfo', JSON.stringify(existingUserInfo));
};

// Function to get user info from localStorage
export const getUserInfo = () => {
  const userInfoString = localStorage.getItem('userInfo');
  return userInfoString ? JSON.parse(userInfoString) : null;
};

export const clearUserInfo = () => {
  localStorage.removeItem('userInfo');
};