let classesToHide = [];

const observer = new MutationObserver(hideClasses);

observer.observe(document, {
    childList: true,
    subtree: true
});

function hideClasses() {
    for (let className of classesToHide) {
      let courseElements = document.evaluate(`//div[text() = '${className}']/ancestor::li`, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
      for (let i = 0; i < courseElements.snapshotLength; i++) {
        courseElements.snapshotItem(i).style.display = 'none';
      }
    }
  }
  


// Load the class list from storage
chrome.storage.sync.get('classes', function(data) {
    classesToHide = data.classes || [];
    hideClasses();
});
