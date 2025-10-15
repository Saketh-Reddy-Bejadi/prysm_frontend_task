import Image from "next/image";
import React from "react";
import {
  Heart,
  ChevronDown,
  WandSparkles,
  Bell,
  ArrowUp,
  ArrowDown,
  Wrench
} from "lucide-react";

interface StockData {
  stock_symbol: string;
  company_name: string;
  exchange: string;
  market_data: {
    last_price: number;
    open: number;
    high: number;
    low: number;
    previous_close: number;
    "52_week_high": number;
    "52_week_low": number;
    volume: number;
    average_volume: number;
  };
  fundamentals: {
    market_cap: number;
    pe_ratio: number;
    pb_ratio: number;
    eps: number;
    dividend_yield: number;
    roe: number;
    debt_to_equity: number;
    revenue: number;
    profit: number;
  };
  technical_indicators: {
    moving_averages: {
      ma_20: number;
      ma_50: number;
      ma_100: number;
      ma_200: number;
    };
    rsi_14: number;
    macd: {
      macd_value: number;
      signal: number;
      histogram: number;
    };
    bollinger_bands: {
      upper_band: number;
      middle_band: number;
      lower_band: number;
    };
  };
  volume_analysis: {
    average_5_day_volume: number;
    average_10_day_volume: number;
    volume_spike: boolean;
  };
  momentum: {
    atr_14: number;
    adx_14: number;
    stochastic_k: number;
    stochastic_d: number;
  };
  analyst_ratings: {
    buy: number;
    hold: number;
    sell: number;
    target_price: number;
  };
  news: Array<{
    date: string;
    headline: string;
    link: string;
  }>;
}
const MainContainer = ({ stockData }: { stockData: StockData }) => {
  const logoUrl = `https://res.cloudinary.com/dyyef3jx1/image/upload/v1/media/india_stocks/images/${stockData.stock_symbol}.NS_irgwjg`;

  const change =
    stockData.market_data.last_price - stockData.market_data.previous_close;
  const changePercent = (change / stockData.market_data.previous_close) * 100;
  const isPositive = changePercent >= 0;
  const currentPosition =
    ((stockData.market_data.last_price - stockData.market_data["52_week_low"]) /
      (stockData.market_data["52_week_high"] -
        stockData.market_data["52_week_low"])) *
    100;
  const fromLow =
    ((stockData.market_data.last_price - stockData.market_data["52_week_low"]) /
      stockData.market_data["52_week_low"]) *
    100;
  const fromHigh =
    ((stockData.market_data["52_week_high"] -
      stockData.market_data.last_price) /
      stockData.market_data["52_week_high"]) *
    100;

  const formatMarketCap = (value: number) => {
    const crores = value / 10000000;
    return `${crores.toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="w-full lg:w-9/12 border bg-white border-zinc-300 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <Image
              alt={stockData.company_name}
              width={60}
              height={60}
              className="rounded-md flex-shrink-0"
              src={logoUrl}
            />
            <h3 className="lg:text-xl text-lg font-semibold">
              {stockData.company_name}
            </h3>
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto">
            <div className="flex items-center gap-2 sm:gap-5 flex-wrap">
              <button className="flex items-center border border-blue-500 rounded-md p-2 text-blue-600">
                <Bell className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 border border-zinc-200 rounded-md p-2">
                <Heart className="w-4 h-4" />
              </button>
              <button className="flex p-2 items-center rounded-md border border-zinc-200 gap-2">
                <Wrench className="w-4 h-4" />
                <span className="hidden sm:inline">Tools</span>
              </button>
              <button className="flex text-white bg-blue-500 p-2 items-center rounded-md gap-2">
                <WandSparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Chat with AI</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3 sm:gap-4 items-center pb-2">
          <div className="bg-zinc-100 font-semibold px-3 py-2 rounded-md text-sm flex items-center flex-shrink-0">
            Large Cap
            <span className="text-gray-700 ml-2">
              {formatMarketCap(stockData.fundamentals.market_cap)}
            </span>
          </div>
          <div className="bg-zinc-100 font-semibold px-3 py-2 rounded-md text-sm flex items-center flex-shrink-0">
            Sector
            <span className="font-semibold text-gray-700 ml-2">Utilities</span>
          </div>
          <div className="bg-zinc-100 font-semibold px-3 py-2 rounded-md text-sm flex items-center flex-shrink-0">
            Industry
            <span className="font-semibold text-gray-700 ml-2 hidden sm:inline">
              Independent Power Producers
            </span>
            <span className="font-semibold text-gray-700 ml-2 sm:hidden">
              Power
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <div className="rounded-lg p-2 w-full max-w-full lg:max-w-lg border border-zinc-200">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600">52W low</div>
                  <div className="bg-gray-50 rounded px-2 py-0.5">
                    <div className="text-sm font-semibold">
                      {stockData.market_data["52_week_low"]}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-50 rounded px-2 py-0.5">
                    <div className="text-sm font-semibold">
                      {stockData.market_data["52_week_high"]}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">52W high</div>
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="relative h-8 my-2">
                <div className="absolute w-full bg-blue-50 h-1.5 top-1/2 -mt-0.75 rounded-full"></div>
                <div
                  className="absolute -top-4 transform -translate-x-1/2"
                  style={{ left: `${currentPosition}%` }}
                >
                  <div className="text-blue-500 bg-white px-2 py-0.5 rounded text-sm font-semibold shadow-sm border border-blue-100">
                    {stockData.market_data.last_price.toFixed(2)}
                  </div>
                </div>
                <div
                  className="absolute bg-blue-400 w-4 h-4 rounded-full top-1/2 -mt-2 border-2 border-white shadow-md"
                  style={{ left: `calc(${currentPosition}% - 8px)` }}
                ></div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between text-xs mt-1 gap-1 sm:gap-0">
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">from 52W Low</span>
                  <span className="text-green-500 font-semibold">
                    {fromLow.toFixed(2)}%
                  </span>
                  <ArrowUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center gap-1">
                  <ArrowDown className="w-4 h-4 text-red-500" />
                  <span className="text-red-500 font-semibold">
                    {fromHigh.toFixed(2)}%
                  </span>
                  <span className="text-gray-400">from 52W High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">
            Adani Power Limited engages in the generation, transmission, and
            sale of electricity under long term power purchase agreements (PPA),
            medium and short term PPA, and on merchant basis in India. The
            company generates electricity through thermal and solar energy
            sources.
          </p>
        </div>
      </div>

      <div className="p-5 border bg-white border-zinc-300 rounded-lg w-full lg:w-4/12">
        <div className="flex items-center gap-2 pb-2">
          <span className="text-lg font-semibold flex-shrink-0">
            ₹{stockData.market_data.last_price.toFixed(2)}
          </span>
          <PriceChangeBadge
            changePercent={changePercent}
            isPositive={isPositive}
          />
        </div>
        <div className="flex flex-col gap-2 py-3">
            <div className="text-xs sm:text-sm">
                As of {new Date().toLocaleDateString()}
            </div>
            <div className="text-xs sm:text-sm">
                Previous Close: ₹{stockData.market_data.previous_close.toFixed(2)}
            </div>
            <div className="text-xs sm:text-sm">
                Open: ₹{stockData.market_data.open.toFixed(2)}
            </div>
            <div className="text-xs sm:text-sm">
                Day's Range: ₹{stockData.market_data.low.toFixed(2)} - ₹{stockData.market_data.high.toFixed(2)}
            </div>
            <div className="text-xs sm:text-sm">
                52 Week Range: ₹{stockData.market_data["52_week_low"].toFixed(2)} - ₹{stockData.market_data["52_week_high"].toFixed(2)}
            </div>  
        </div>
        <div className="w-full flex flex-col gap-3">
          <button className="bg-blue-500 py-2 w-full rounded-lg text-white cursor-pointer hover:bg-blue-600 transition-colors text-sm sm:text-base">
            Add to Basket
          </button>
          <div className="flex gap-2 sm:gap-3">
            <button className="w-1/2 py-2 bg-zinc-200 rounded-lg font-semibold flex px-3 sm:px-5 justify-between cursor-pointer hover:bg-zinc-300 transition-colors text-sm sm:text-base">
              Buy
              <ChevronDown className="w-4 h-4"/>
            </button>
            <button className="w-1/2 py-2 bg-zinc-200 rounded-lg font-semibold flex px-3 sm:px-5 justify-between cursor-pointer hover:bg-zinc-300 transition-colors text-sm sm:text-base">
              Sell
              <ChevronDown className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PriceChangeBadge = ({
  changePercent,
  isPositive,
}: {
  changePercent: number;
  isPositive: boolean;
}) => (
  <div
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors flex-shrink-0 ${
      isPositive
        ? "text-green-600 border-green-600"
        : "text-red-600 border-red-600"
    }`}
  >
    {isPositive ? "+" : ""}
    {changePercent.toFixed(2)}%
  </div>
);

export default MainContainer;
