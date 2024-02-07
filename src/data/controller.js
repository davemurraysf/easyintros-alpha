// controller.js

// Function to send a message to the background script
export const sendMessageToBackground = async (message) => {
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
  
  // Function to listen for messages from the background script
  export const listenForBackgroundMessages = (callback) => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      // Ensure that the message is from the background script
      if (sender.id === chrome.runtime.id) {
        // Invoke the callback function and pass the message and sendResponse function
        callback(message, sendResponse);
        // Return true to indicate that the response will be sent asynchronously
        return true;
      }
    });
  };
  