import { Data, ResponseData } from "../main";
import { VariantRender } from "./variant-render";

export class ContentRender {
  constructor(private data: ResponseData[]) {}

  execute() {
    return this.data.map((item) => {
      return this.createContent(item.data);
    });
  }

  private createContent({ name, symbol, marketData, thumb }: Data) {
    const spanSymbol = document.createElement("span");
    spanSymbol.innerText = symbol;

    const divSymbol = document.createElement("div");
    divSymbol.classList.add("coin-symbol");
    divSymbol.appendChild(spanSymbol);

    const spanName = document.createElement("span");
    spanName.innerText = name;

    const divName = document.createElement("div");
    divName.classList.add("coin-name");
    divName.appendChild(spanName);

    const imgThumb = document.createElement("img");
    imgThumb.setAttribute("src", thumb);

    const divIcon = document.createElement("div");
    divIcon.classList.add("coin-icon");
    divIcon.appendChild(imgThumb);

    const spanPrice = document.createElement("span");
    spanPrice.innerText = this.formatPrice(marketData.price);

    const divPrice = document.createElement("div");
    divPrice.classList.add("coin-price");
    divPrice.appendChild(spanPrice);

    const main = document.createElement("div");
    main.classList.add("coin-content");
    main.append(
      divIcon,
      divSymbol,
      divName,
      divPrice,
      VariantRender.execute(marketData)
    );

    const row = document.createElement("li");
    row.appendChild(main);

    return row;
  }

  private formatPrice(value: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }
}
