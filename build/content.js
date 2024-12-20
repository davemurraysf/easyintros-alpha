// content.js

// Declare the variable outside the if statement
let moreInformationLink = document.querySelector('a[href="https://www.iana.org/domains/example"]');

// Check if the variable has already been declared and select the link
if (moreInformationLink) {
    // Simulate a click on the "More information..." link
    moreInformationLink.click();
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Check if the message contains a status property
  if (message.status) {
    const newStatus = message.status;
    console.log('Received new status from background:', newStatus);

    // Update content script behavior or appearance based on the new status
    // For example, you can change the behavior of certain elements or perform other actions
    // based on the new status received from the background script.
  } else {
    console.error('Invalid message received from background:', message);
  }
});
