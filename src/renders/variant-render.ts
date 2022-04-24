import { MarketData } from "../main";

export class VariantRender {
  static execute(data: MarketData) {
    const { percentage24h, percentage7d } = data;

    const twentyFourPercent = VariantRender.setPercent(percentage24h);
    const sevenDaysPercent = VariantRender.setPercent(percentage7d);

    const class24Hour = VariantRender.setCorrectClass(percentage24h);
    const class7Days = VariantRender.setCorrectClass(percentage7d);

    const span24hour = document.createElement("span");
    span24hour.classList.add(`coin-twenty-four-h-${class24Hour}`);
    span24hour.innerText = twentyFourPercent;

    const mainSpan24hour = document.createElement("span");
    mainSpan24hour.innerText = "24h:";
    mainSpan24hour.appendChild(span24hour);

    const span7Days = document.createElement("span");
    span7Days.classList.add(`coin-seven-d-${class7Days}`);
    span7Days.innerText = sevenDaysPercent;

    const mainSpan7Days = document.createElement("span");
    mainSpan7Days.innerText = "7d:";
    mainSpan7Days.appendChild(span7Days);

    const main = document.createElement("div");
    main.classList.add("coin-content-variant");
    main.append(mainSpan24hour, mainSpan7Days);

    return main;
  }

  private static setPercent(value: number) {
    return `${value.toFixed(2)}%`;
  }

  private static setCorrectClass(value: number) {
    return value > 0 ? "up" : "down";
  }
}
