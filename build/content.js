// content.js

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sendResponse) => {
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
  }else if (message.action === 'clickAndSendKeys') {
    const element = document.querySelector(message.selector);
    if (element) {
      element.click();
      element.value = message.keys; 
      console.log('Clicked on input element and sent keys:', message.keys);
    } else {
      console.error('Input element not found.');
    }
  }
  
  // Send a response back to the background script
  sendResponse({ success: true });
});





