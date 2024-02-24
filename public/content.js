// content.js
/*
// Declare the variable outside the if statement
let moreInformationLink = document.querySelector('a[href="https://www.iana.org/domains/example"]');

// Check if the variable has already been declared and select the link
if (moreInformationLink) {
    // Simulate a click on the "More information..." link
    moreInformationLink.click();
}
*/
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
    // Check if the message contains an input value
    if (message.inputValue) {
      const usernameInput = document.querySelector('input[aria-label="Phone number, username, or email"][name="username"]');
      if (usernameInput) {
        // Set the value of the input field to the received value
        usernameInput.value = message.inputValue;
      } else {
        console.error('Username input field not found.');
      }
    } else {
      console.error('Invalid message received from background:', message);
    }
  }
});

