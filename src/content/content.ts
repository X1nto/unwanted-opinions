const opinionator = document.createElement('script');
opinionator.src = chrome.runtime.getURL('opinionator.js');
document.documentElement.appendChild(opinionator);
