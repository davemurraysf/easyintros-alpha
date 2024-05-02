// background.js
let lastCreatedTabId;

// Listener for messages from the controller
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received by background Script", message.action);
  if (message.action === 'navigate') {
    createNewTabAndNavigate(message.url, sendResponse); 
    return true; 
  } else if (message.action === 'sendInput') {
    sendMessageToContent(lastCreatedTabId, { action: 'input', selector: message.selector, value: message.value }, sendResponse);
    return true;
  } else if (message.action === 'clickElement') {
    sendMessageToContent(lastCreatedTabId, { action: 'click', selector: message.selector }, sendResponse);
    return true;
  }else if (message.action === 'clickAndSendKeys') {
    sendMessageToContent(lastCreatedTabId, { action: 'clickAndSendKeys', selector: message.selector, keys: message.keys }, sendResponse);
    return true;
  } else if (message.action === 'closeTab') {
    closeTab(lastCreatedTabId, sendResponse);
    return true;
  } else if (message.action === 'waitFor') {
    waitForTime(message.milliseconds, sendResponse); 
    return true; 
  }
});

// Function to create a new tab and navigate to a URL
function createNewTabAndNavigate(url, sendResponse) {
  console.log("Message Create new tab and navigate to", url);
  chrome.tabs.create({ url: url, active: true }, (tab) => {
    lastCreatedTabId = tab.id;
    sendResponse({ success: true }); 
  });
}


// Function to send a message to a content script
function sendMessageToContent(tabId, message, sendResponse) {
  console.log("Message Send Message to content script", message);
  chrome.tabs.sendMessage(tabId, message, sendResponse);
  sendResponse({ success: true });
}

// Function to close a tab
function closeTab(tabId, sendResponse) {
  console.log("Message Close tab received");
  chrome.tabs.remove(tabId);
  sendResponse({ success: true });
}

// Function to wait for a specified time (in milliseconds)
function waitForTime(milliseconds, sendResponse) {
  console.log("Message Wait received for", milliseconds, "milliseconds");
  setTimeout(() => {
    sendResponse({ success: true }); 
  }, milliseconds);
  return true; 
}



