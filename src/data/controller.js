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
/* 
--------------------------------------------------------------------------------------------------------------------
IG Login build
--------------------------------------------------------------------------------------------------------------------
*/
export async function IGLogin() {
  try {
    console.log("Message recieved by controller")
    await sendMessageToBackground({ action: 'navigate', url: 'https://www.instagram.com/direct/t/17847198236521518' });
    console.log("Navigated to instagram")
    console.log("Starting Wait")
    await sleep(30000)
    console.log("Wating complete")
    await sendMessageToBackground({ action: 'clickAndSendKeys', selector: 'input[name="username"]', keys: 'dmurraySF' });
    console.log("Text inputed")
    console.log("Starting Wait ")
    await sleep(30000)
    console.log("Wating complete")
    //await sendMessageToBackground({ action: 'closeTab'});
    //console.log("Tab closed")
  } catch (error) {
    console.error('Error performing actions:', error);
  }
}
// Example usage:
// sendMessageToBackground({ action: 'navigate', url: 'https://example.com' });
// sendMessageToBackground({ action: 'sendInput', selector: 'input#username', value: 'example_username' });
// sendMessageToBackground({ action: 'clickElement', selector: 'button#submit' });
// sendMessageToBackground({ action: 'waitFor', milliseconds: 3000 });