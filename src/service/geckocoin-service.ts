import { ResponseData } from "../renders/content-render";

export class GeckoCoinService {
  private coinIds = ["elrond-erd-2", "bitcoin", "ethereum"];
  private baseUrl = "https://api.coingecko.com/api/v3/coins/";
  private qryStrg = "?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";

  private coins = [];

  async execute(): Promise<ResponseData[]> {
    try {
      const promises = this.generatePromises();
      const result = await Promise.all(promises);

      for (const item of result) {
        const data = await item.json();

        console.log(
          `[Coinlist] - ${data.name} price (usd):`,
          data.market_data.current_price.usd
        );

        const {
          name,
          symbol,
          image: { thumb },
          market_data: {
            current_price,
            price_change_percentage_24h,
            price_change_percentage_7d,
          },
        } = data;

        this.coins.push({
          data: {
            thumb,
            name,
            symbol,
            marketData: {
              price: current_price.usd,
              percentage24h: price_change_percentage_24h,
              percentage7d: price_change_percentage_7d,
            },
          },
          error: null,
        });
      }

      return this.coins;
    } catch (error) {
      console.log(`[Coinlist] - Error: ${error}`);
      return [{
        data: null,
        error: { message: "Houston we have a problem! Try again later." },
      }];
    }
  }

  private generatePromises() {
    return this.coinIds.map((coinId) =>
      fetch(this.mountUrl(coinId), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  }

  private mountUrl(coinId: string) {
    return this.baseUrl + coinId + this.qryStrg;
  }
}
