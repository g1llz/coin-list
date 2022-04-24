import { GeckoCoinService } from "./service/geckocoin-service";

// @ts-ignore
chrome.runtime.onMessage.addListener(
  (message: string, sender: any, sendResponse: Function) => {
    if (message === "update") {
      const gecko = new GeckoCoinService();
      gecko.execute().then(data => sendResponse(data));
    }

    return true;
  }
);
