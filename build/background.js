// background.js

// Listener for the extension installation event
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Listener for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message);
  console.log('Sender information:', sender);
  
  // Your existing code to handle the message
  if (message.action === 'start_navigation') {
      // Navigate to the target URL in a new tab in the background
      const targetUrl = 'https://example.com'; // Change this URL to your target
      chrome.tabs.create({ url: targetUrl, active: false });

      // Optionally send a response back to the sender
      sendResponse({status: 'navigation_started'});
  } else {
      console.error('Invalid message or sender information.');
      // Always send a response back, even if it's an error
      sendResponse({error: 'Invalid message or sender information.'});
  }

  // Return true to indicate you wish to send a response asynchronously
  return true;
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
