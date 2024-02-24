// background.js

// Listener for the extension installation event
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  // Set initial data in Chrome storage
  chrome.storage.local.set({ status: 'active' }, () => {
    console.log('Initial status set in Chrome storage');
  });
});

// Function to send a message to the content script
function sendMessageToContent(tabId, message) {
  console.log("Sent message to dom")
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(response);
      }
    });
  });
}


// Keep track of tabs that are waiting for navigation completion
const tabsWaitingForNavigation = {};

// Listener for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start_navigation') {
    const targetUrl = message.targetUrl; // Extract targetUrl from the message

    // Navigate to the target URL in a new tab
    chrome.tabs.create({ url: targetUrl, active: false }, (tab) => {
      // Function to handle tab update
      function handleTabUpdate(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === 'complete') {
          // Update the status in Chrome storage to indicate navigation completion
          chrome.storage.local.set({ status: 'navigation_completed' }, () => {
            console.log('Navigation status updated to completed');
          });

          // Close the tab after navigation is complete
          chrome.tabs.remove(tab.id);

          // Cleanup: Remove the update listener to prevent memory leaks
          chrome.tabs.onUpdated.removeListener(handleTabUpdate);
        }
      }

      // Listen for tab updates to detect when navigation is complete
      chrome.tabs.onUpdated.addListener(handleTabUpdate);
    });

    // Return true to indicate an asynchronous response is expected
    return true;
  } else if (message.action === 'start_navigation_with_input') {
    const targetUrl = message.targetUrl;
    const inputValue = "dmurraySF";

    // Navigate to the target URL in a new tab
    chrome.tabs.create({ url: targetUrl, active: false }, (tab) => {
      // Send input value to content script
      sendMessageToContent(tab.id, { inputValue });

      // Function to handle tab update
      function handleTabUpdate(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === 'complete') {
          // Update the status in Chrome storage to indicate navigation completion
          chrome.storage.local.set({ status: 'navigation_completed' }, () => {
            console.log('Navigation status updated to completed');
          });

          // Close the tab after navigation is complete
          //chrome.tabs.remove(tab.id);

          // Cleanup: Remove the update listener to prevent memory leaks
          //chrome.tabs.onUpdated.removeListener(handleTabUpdate);
        }
      }

      // Listen for tab updates to detect when navigation is complete
      chrome.tabs.onUpdated.addListener(handleTabUpdate);
    });

    // Return true to indicate an asynchronous response is expected
    return true;
  } else {
    console.error('Invalid message or sender information.');
    sendResponse({ error: 'Invalid message or sender information.' });
    return false;
  }
});

// Listen for changes to status in Chrome storage
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.status) {
    const newStatus = changes.status.newValue;
    console.log('New status received from Chrome storage:', newStatus);

    // Optionally, send the new status to content scripts or other parts of your extension as needed
    // This part remains the same as before, adjust according to your specific requirements
  }
});

function isValidMessage(message) {
  // Add logic to validate the message
  // For example, check if the message is of a certain type or has required properties
  return true; // Placeholder return value
}

function isValidSender(sender) {
  // Add logic to validate the sender
  // For example, check if the sender is from an expected origin or has required properties
  return true; // Placeholder return value
}






  