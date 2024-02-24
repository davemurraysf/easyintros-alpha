// controller.js

// Function to send a message to the background script
export const sendMessageToBackground = async (message) => {
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response);
        }
      });
    });
  } else {
    console.warn('chrome.runtime.sendMessage is not available.');
    return Promise.reject(new Error('chrome.runtime.sendMessage is not available.'));
  }
};

// Function to start navigation
export const startNavigation = async (targetUrl) => {
  const message = {
    action: 'start_navigation',
    targetUrl: targetUrl, // Pass the targetUrl as part of the message
  };
  return sendMessageToBackground(message);
};

// Function to start navigation with input value
export const startNavigationWithInput = async (targetUrl, inputValue) => {
  const message = {
    action: 'start_navigation_with_input',
    targetUrl: targetUrl,
    inputValue: inputValue,
  };
  return sendMessageToBackground(message);
};

// Function to listen for messages from the background script
export const listenForMessages = (handleMessage) => {
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      handleMessage(message, sender, sendResponse);
      // Return true if you wish to send a response asynchronously (only required for onMessage event)
      return true;
    });
  } else {
    console.warn('chrome.runtime.onMessage is not available.');
  }
};
