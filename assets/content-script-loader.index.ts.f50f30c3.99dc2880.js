(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/worker.ts.js")
    );
  })().catch(console.error);

})();
