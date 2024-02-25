// content.js

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'input') {
    const inputElement = document.querySelector(message.selector);
    if (inputElement) {
      inputElement.value = message.value;
    }
  } else if (message.action === 'click') {
    const clickElement = document.querySelector(message.selector);
    if (clickElement) {
      clickElement.click();
    }
  }
  
  // Send a response back to the background script
  sendResponse({ success: true });
});





