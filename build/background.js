// background.js

// Listener for the extension installation event
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Listener for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start_navigation' && sender.tab) {
    // Navigate to the target URL
    const targetUrl = 'https://example.com'; // Change this URL to your target
    chrome.tabs.update(sender.tab.id, { url: targetUrl });

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
