import { ContentRender } from "./renders/content-render";

export type MarketData =  {
  price: number;
  percentage24h: number;
  percentage7d: number;
};

export type Data = {
  name: string;
  symbol: string;
  thumb: string;
  marketData: MarketData;
};

export type ResponseData = {
  data: Data | null;
  error: null | { message: string };
};

// @ts-ignore
chrome.runtime.sendMessage("update", (response: ResponseData[]) => {
  // TODO: Error feedback
  // document.querySelector("small").innerHTML = JSON.stringify(response);

  if (response.length) {
    const render = new ContentRender(response);
    const content = render.execute();
    document.querySelector("ul").append(...content);
  }
});
