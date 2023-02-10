chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.prompt) {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.executeScript(tabs[0].id, {
          code: `document.querySelector("textarea").value = "${request.prompt}"`,
        });
      }
    );
  }
});
