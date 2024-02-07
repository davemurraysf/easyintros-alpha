// background.js

// Listener for the extension installation event
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Set data in Chrome storage
chrome.storage.local.set({ status: 'active' }, () => {
  console.log('Initial status set in Chrome storage');
});

// Keep track of tabs that are waiting for navigation completion
const tabsWaitingForNavigation = {};

// Listener for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Your existing code to handle the message
  if (message.action === 'start_navigation') {
    // Navigate to the target URL in a new tab in the background
    const targetUrl = 'https://example.com'; // Change this URL to your target
    chrome.tabs.create({ url: targetUrl, active: false }, (tab) => {
      // Store tab ID in the list of tabs waiting for navigation completion
      tabsWaitingForNavigation[tab.id] = sendResponse;

      // Listen for tab updates to detect navigation completion
      chrome.tabs.onUpdated.addListener((tabId, changeInfo, updatedTab) => {
        if (tabId === tab.id && changeInfo.status === 'complete') {
          // Send a message back to the React app indicating navigation completion
          sendResponse({ status: 'navigation_completed' });

          // Close the tab after navigation is complete
          chrome.tabs.remove(tab.id);

          // Remove the tab ID from the list of tabs waiting for navigation completion
          delete tabsWaitingForNavigation[tab.id];
        }
      });
    });

    // Return true to indicate you wish to send a response asynchronously
    return true;
  } else {
    console.error('Invalid message or sender information.');
    // Always send a response back, even if it's an error
    sendResponse({ error: 'Invalid message or sender information.' });
    return false;
  }
});

// Listen for changes to status in Chrome storage
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.status) {
    const newStatus = changes.status.newValue;
    console.log('New status received from Chrome storage:', newStatus);

    // Send message to content script with the new status
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { status: newStatus }, (response) => {
          console.log('Message sent to content script with new status:', newStatus);
        });
      }
    });
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


  