(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/index.ts.f50f30c3.js")
    );
  })().catch(console.error);

})();
