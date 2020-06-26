

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
   if (request.errorMessage === 'error'){
   chrome.tabs.create({ url: request.url});
}});

