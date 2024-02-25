// background.js
let lastCreatedTabId;

// Listener for messages from the controller
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received by background Script", message.action);
  if (message.action === 'navigate') {
    createNewTabAndNavigate(message.url, sendResponse); // Pass sendResponse to createNewTabAndNavigate
    return true; // Return true to indicate that sendResponse will be called asynchronously
  } else if (message.action === 'sendInput') {
    sendMessageToContent(lastCreatedTabId, { action: 'input', selector: message.selector, value: message.value });
    return true;
  } else if (message.action === 'clickElement') {
    sendMessageToContent(lastCreatedTabId, { action: 'click', selector: message.selector }, sendResponse);
    return true;
  } else if (message.action === 'waitFor') {
    waitForTime(message.milliseconds, sendResponse); // Pass sendResponse to waitForTime
    return true; // Return true to indicate that sendResponse will be called asynchronously
  }
});

// Function to create a new tab and navigate to a URL
function createNewTabAndNavigate(url, sendResponse) {
  console.log("Message Create new tab and navigate to", url);
  chrome.tabs.create({ url: url, active: false }, (tab) => {
    lastCreatedTabId = tab.id;
    sendResponse({ success: true }); // Call sendResponse to send a response to the content script
  });
}


// Function to send a message to a content script
function sendMessageToContent(tabId, message, sendResponse) {
  console.log("Message Send Message to content script", message);
  chrome.tabs.sendMessage(tabId, message, sendResponse);
  sendResponse({ success: true });
}

// Function to close a tab
function closeTab(tabId) {
  console.log("Message Close tab received");
  chrome.tabs.remove(tabId);
}

// Function to wait for a specified time (in milliseconds)
function waitForTime(milliseconds, sendResponse) {
  console.log("Message Wait received for", milliseconds, "milliseconds");
  setTimeout(() => {
    sendResponse({ success: true }); // Call sendResponse to send a response to the content script after waiting
  }, milliseconds);
  return true; // Return true to indicate that sendResponse will be called asynchronously
}



