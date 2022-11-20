getStorage().then((storage) => {
  //stolen from Eight Dollars
  const settings = document.createElement('div');
  settings.id = 'unwanted-opinions-settings';
  settings.innerHTML = JSON.stringify(storage);
  document.body.appendChild(settings);

  const opinionator = document.createElement('script');
  opinionator.src = getUrl('opinionator.js');
  document.head.appendChild(opinionator);
});

async function getStorage(): Promise<{ [key: string]: any }> {
  if (typeof browser !== 'undefined') {
    return browser.storage.local.get();
  } else {
    return chrome.storage.local.get();
  }
}

function getUrl(path: string): string {
  if (typeof browser !== 'undefined') {
    return browser.runtime.getURL(path);
  } else {
    return chrome.runtime.getURL(path);
  }
}
