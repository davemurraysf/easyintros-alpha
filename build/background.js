// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startScraping') {
    startScrapingWebsites();
  }
});

function startScrapingWebsites() {
  const websites = ['https://example.com', 'https://example2.com', /* Add your URLs here */];

  websites.forEach(async (url) => {
    try {
      const response = await fetch(url);
      const headers = response.headers;
      console.log(`Headers for ${url}:`, headers);
    } catch (error) {
      console.error(`Error while fetching ${url}:`, error);
    }
  });
}

