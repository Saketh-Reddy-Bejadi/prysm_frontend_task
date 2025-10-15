"use client";

import React, { useState } from "react";
import { Info, Sparkles, LockKeyhole, Wand } from "lucide-react";

interface AnalysisMetric {
  name: string;
  value: string;
  rating: "Good" | "Fair" | "Poor" | "Extremely Poor";
  description?: string;
}

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

interface StockAnalysisProps {
  stockData: StockData;
}

const StockAnalysis: React.FC<StockAnalysisProps> = ({ stockData }) => {
  const [activeTab, setActiveTab] = useState<"Short" | "Mid" | "Long">("Short");

  const calculatePrysmScore = (): number => {
    let score = 50;

    const rsi = stockData.technical_indicators.rsi_14;
    if (rsi >= 30 && rsi <= 70) score += 10;
    else if (rsi < 20 || rsi > 80) score -= 15;
    else score -= 5;

    const pe = stockData.fundamentals.pe_ratio;
    if (pe >= 10 && pe <= 20) score += 15;
    else if (pe >= 5 && pe < 10) score += 10;
    else if (pe < 5) score -= 10;
    else if (pe > 30) score -= 15;

    const roe = stockData.fundamentals.roe;
    if (roe >= 15) score += 15;
    else if (roe >= 10) score += 10;
    else if (roe >= 5) score += 5;
    else score -= 10;

    const debtToEquity = stockData.fundamentals.debt_to_equity;
    if (debtToEquity <= 0.5) score += 10;
    else if (debtToEquity <= 1) score += 5;
    else if (debtToEquity > 2) score -= 15;
    else score -= 5;

    return Math.max(0, Math.min(100, score));
  };

  const getRating = (
    value: number,
    thresholds: { good: number; fair: number; poor: number }
  ): AnalysisMetric["rating"] => {
    if (value >= thresholds.good) return "Good";
    if (value >= thresholds.fair) return "Fair";
    if (value >= thresholds.poor) return "Poor";
    return "Extremely Poor";
  };

  const calculateProfitGrowth = (): number => {
    const profitMargin =
      (stockData.fundamentals.profit / stockData.fundamentals.revenue) * 100;
    return profitMargin > 10 ? 15.5 : -12.3;
  };

  const calculateSalesGrowth = (): number => {
    return stockData.fundamentals.revenue > 100000000000 ? 8.2 : 5.1;
  };

  const prysmScore = calculatePrysmScore();

  const metrics: AnalysisMetric[] = [
    {
      name: "RSI (14-day)",
      value: stockData.technical_indicators.rsi_14.toFixed(2),
      rating: getRating(stockData.technical_indicators.rsi_14, {
        good: 40,
        fair: 30,
        poor: 20,
      }),
    },
    {
      name: "EMA (50-day)",
      value: stockData.technical_indicators.moving_averages.ma_50.toFixed(2),
      rating:
        stockData.market_data.last_price >
        stockData.technical_indicators.moving_averages.ma_50
          ? "Good"
          : "Poor",
    },
    {
      name: "1Y Profit Growth",
      value: calculateProfitGrowth().toFixed(2),
      rating: getRating(calculateProfitGrowth(), {
        good: 10,
        fair: 5,
        poor: 0,
      }),
    },
    {
      name: "1Y Sales Growth",
      value: calculateSalesGrowth().toFixed(2),
      rating: getRating(calculateSalesGrowth(), { good: 10, fair: 5, poor: 0 }),
    },
    {
      name: "Current PE (TTM)",
      value: stockData.fundamentals.pe_ratio.toFixed(2),
      rating: getRating(stockData.fundamentals.pe_ratio, {
        good: 15,
        fair: 10,
        poor: 5,
      }),
      description: `PE ratio of ${stockData.fundamentals.pe_ratio.toFixed(
        2
      )} indicates ${
        stockData.fundamentals.pe_ratio < 10
          ? "undervaluation"
          : "fair valuation"
      }.`,
    },
    {
      name: "Current PB (TTM)",
      value: stockData.fundamentals.pb_ratio.toFixed(2),
      rating: getRating(stockData.fundamentals.pb_ratio, {
        good: 2,
        fair: 1.5,
        poor: 1,
      }),
      description: `PB ratio of ${stockData.fundamentals.pb_ratio.toFixed(
        2
      )} suggests ${
        stockData.fundamentals.pb_ratio < 1.5
          ? "good value"
          : "premium valuation"
      }.`,
    },
  ];

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Good":
        return "bg-green-200 text-green-500";
      case "Fair":
        return "bg-yellow-100 text-yellow-500";
      case "Poor":
        return "bg-red-200 text-red-500";
      case "Extremely Poor":
        return "bg-red-200 text-red-500";
      default:
        return "bg-gray-200 text-gray-500";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "rgb(76, 175, 80)";
    if (score >= 50) return "rgb(255, 193, 7)";
    if (score >= 25) return "rgb(255, 152, 0)";
    return "rgb(244, 67, 54)";
  };

  return (
    <div className="w-full lg:w-[27%]">
      <div className="p-4 rounded-lg mb-1 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex flex-row items-center">
            <span className="font-semibold">Prysm Score:</span>
            <Info className="w-4 h-4 text-gray-400 cursor-pointer mx-2 self-center" />
            <span className="text-primary cursor-pointer hover:text-primary/80 transition-colors mx-1 self-center flex flex-row items-center gap-1">
              Why?
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <span className="font-bold text-lg">{prysmScore}</span>
        </div>

        <div className="mt-3">
          <div
            className="w-full h-3 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgb(232, 245, 232)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                backgroundColor: getScoreColor(prysmScore),
                width: `${prysmScore}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex flex-row items-center">
            <span className="font-semibold">Prysm Rank:</span>
            <Info className="w-4 h-4 text-gray-400 cursor-pointer mx-2 self-center" />
          </div>
          <div className="cursor-pointer hover:scale-110 transition-transform">
            <LockKeyhole className="w-5 h-5 text-primary transition-opacity duration-500 opacity-100" />
          </div>
        </div>
      </div>

      <button className="mt-3 text-base sm:text-lg text-white bg-black flex w-full items-center gap-3 justify-center py-2 rounded-lg font-semibold px-3">
        <Wand className="w-5 h-5 text-white" />
        <span className="">Generate AI Report</span>
      </button>

      <div className="rounded-md bg-white p-4 mt-3">
        <div className="flex gap-2 mb-4 w-full bg-gray-200 p-1 rounded-xl border border-gray-200/50">
          {(["Short", "Mid", "Long"] as const).map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-1 flex items-center justify-center gap-1 px-4 py-2 h-8 text-xs sm:text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white text-blue-600 shadow-sm border border-blue-100"
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
              }`}
            >
              <span>{tab}</span>
              <Info className="w-4 h-4 text-blue-500 cursor-pointer" />
            </div>
          ))}
        </div>

        <div>
          {metrics.map((metric, index) => (
            <div key={metric.name}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center space-x-1">
                  <span className="font-medium text-sm">{metric.name}</span>
                  <Info className="w-4 h-4 text-gray-400 cursor-pointer ml-1" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 font-medium text-sm">
                    {metric.value}
                  </span>
                  <div className="ml-auto">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium max-h-fit self-center ${getRatingColor(
                        metric.rating
                      )}`}
                    >
                      {metric.rating}
                    </span>
                  </div>
                </div>
              </div>

              {metric.description && (
                <p className="text-xs my-2">{metric.description}</p>
              )}

              {index < metrics.length - 1 && <hr className="my-2" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis;
