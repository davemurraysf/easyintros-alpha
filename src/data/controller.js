// controller.js

// Function to send a message to the background script
export const sendMessageToBackground = async (message) => {
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
    return new Promise((resolve, reject) => {
      console.log('Sending message to background script:', message);
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message to background script:', chrome.runtime.lastError.message);
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          console.log('Received response from background script:', response);
          resolve(response);
        }
      });
    });
  } else {
    console.warn('chrome.runtime.sendMessage is not available.');
    return Promise.reject(new Error('chrome.runtime.sendMessage is not available.'));
  }
};

// Function to listen for messages from the background script
export const listenForMessages = (handleMessage) => {
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      handleMessage(message, sender, sendResponse);
      return true;
    });
  } else {
    console.warn('chrome.runtime.onMessage is not available.');
  }
};
/* 
--------------------------------------------------------------------------------------------------------------------
Sleep Funtion
--------------------------------------------------------------------------------------------------------------------
*/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/* 
--------------------------------------------------------------------------------------------------------------------
Example to test controls
--------------------------------------------------------------------------------------------------------------------
*/
export async function navigateAndWaitAndClick(url, waitTime, elementSelector) {
  try {
    console.log("Message recieved by controller")
    await sendMessageToBackground({ action: 'navigate', url: url });
    console.log("Navigated")
    await sleep(30000)
    console.log("Wating")
    await sendMessageToBackground({ action: 'clickElement', selector: elementSelector });
    console.log("clicked")
    await sendMessageToBackground({ action: 'closeTab'});
    console.log("Tab closed")
  } catch (error) {
    console.error('Error performing actions:', error);
  }
}