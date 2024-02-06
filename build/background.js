
const { chrome } = require("chrome");

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start_navigation' && sender && sender.tab && sender.tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: startNavigation,
    });
  } else {
    console.error('Invalid message or sender information.');
  }
});

function startNavigation() {
  // Change this URL to the one you want to navigate to
  const targetUrl = 'https://example.com';

  // Navigate to the target URL
  chrome.tabs.update({ url: targetUrl });
}

