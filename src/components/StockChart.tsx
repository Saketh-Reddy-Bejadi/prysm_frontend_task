"use client";

import React, { useState, useEffect } from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

interface StockPrice {
    symbol: string;
    date: string;
    adjOpen: number;
    adjHigh: number;
    adjLow: number;
    adjClose: number;
    volume: number;
    formattedDate?: string;
}

interface StockChartProps {
    symbol?: string;
    apiKey?: string;
}

const StockChart: React.FC<StockChartProps> = ({ symbol, apiKey }) => {
    const stockSymbol =
        symbol || process.env.NEXT_PUBLIC_DEFAULT_SYMBOL || "AAPL";
    const apiKeyValue = apiKey || process.env.NEXT_PUBLIC_FMP_API_KEY || "";
    const [data, setData] = useState<StockPrice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timeRange, setTimeRange] = useState<"1M" | "3M" | "6M" | "1Y" | "2Y">(
        "3M"
    );

    const fetchStockData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `https://financialmodelingprep.com/stable/historical-price-eod/non-split-adjusted?symbol=${stockSymbol}&apikey=${apiKeyValue}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch stock data");
            }

            const result = await response.json();

            if (Array.isArray(result) && result.length > 0) {
                // Filter data based on time range
                const now = new Date();
                const monthsBack = getMonthsBack(timeRange);
                const cutoffDate = new Date(
                    now.getFullYear(),
                    now.getMonth() - monthsBack,
                    now.getDate()
                );

                const filteredData = result
                    .filter((item: StockPrice) => new Date(item.date) >= cutoffDate)
                    .reverse()
                    .map((item: StockPrice) => ({
                        ...item,
                        formattedDate: formatDate(item.date),
                    }));

                setData(filteredData);
            } else {
                setError("No data available for this symbol");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const getMonthsBack = (range: string): number => {
        switch (range) {
            case "1M":
                return 1;
            case "3M":
                return 3;
            case "6M":
                return 6;
            case "1Y":
                return 12;
            case "2Y":
                return 24;
            default:
                return 3;
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    useEffect(() => {
        fetchStockData();
    }, [stockSymbol, timeRange]);

    const getCurrentPrice = () => {
        if (data.length === 0) return 0;
        return data[data.length - 1]?.adjClose || 0;
    };

    const getOverallChange = () => {
        if (data.length < 2) return { change: 0, changePercent: 0 };
        const current = data[data.length - 1]?.adjClose || 0;
        const start = data[0]?.adjClose || 0;
        const change = current - start;
        const changePercent = (change / start) * 100;
        return { change, changePercent };
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-zinc-100 rounded-lg shadow-lg">
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-gray-600">
                        Open:{" "}
                        <span className="font-medium">${data.adjOpen?.toFixed(2)}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        High:{" "}
                        <span className="font-medium">${data.adjHigh?.toFixed(2)}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Low: <span className="font-medium">${data.adjLow?.toFixed(2)}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Close:{" "}
                        <span className="font-medium">${data.adjClose?.toFixed(2)}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Volume:{" "}
                        <span className="font-medium">{data.volume?.toLocaleString()}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    const overallChange = getOverallChange();
    const isPositive = overallChange.changePercent >= 0;

    if (loading) {
        return (
            <div className="w-full bg-white rounded-lg shadow-sm border border-zinc-100 p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-white rounded-lg shadow-sm border border-zinc-100 p-6">
                <div className="text-center">
                    <div className="text-red-500 mb-2">Error loading chart data</div>
                    <div className="text-sm text-gray-600">{error}</div>
                    <button
                        onClick={fetchStockData}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-lg shadow-sm border border-zinc-100">
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-zinc-100">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="hidden sm:inline">{stockSymbol} Price Chart</span>
                                <span className="sm:hidden">{stockSymbol}</span>
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                                <span className="text-xl sm:text-2xl font-bold">
                                    ${getCurrentPrice().toFixed(2)}
                                </span>
                                <div
                                    className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium w-fit ${isPositive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {isPositive ? (
                                        <TrendingUp className="w-4 h-4" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4" />
                                    )}
                                    {isPositive ? "+" : ""}
                                    {overallChange.changePercent.toFixed(2)}%
                                    <span className="text-xs hidden sm:inline">
                                        (${overallChange.change.toFixed(2)})
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
                        {(["1M", "3M", "6M", "1Y", "2Y"] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors ${timeRange === range
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-3 sm:p-4">
                <ResponsiveContainer width="100%" height={300} className="sm:!h-[400px]">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={isPositive ? "#10b981" : "#ef4444"}
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={isPositive ? "#10b981" : "#ef4444"}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="formattedDate"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#666" }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#666" }}
                            domain={["dataMin - 5", "dataMax + 5"]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="adjClose"
                            stroke={isPositive ? "#10b981" : "#ef4444"}
                            strokeWidth={2}
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
                    <div>
                        <div className="text-gray-500">Period High</div>
                        <div className="font-semibold">
                            ${Math.max(...data.map((d) => d.adjHigh)).toFixed(2)}
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500">Period Low</div>
                        <div className="font-semibold">
                            ${Math.min(...data.map((d) => d.adjLow)).toFixed(2)}
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500">Avg Volume</div>
                        <div className="font-semibold">
                            {(
                                data.reduce((sum, d) => sum + d.volume, 0) /
                                data.length /
                                1000000
                            ).toFixed(1)}
                            M
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500">Data Points</div>
                        <div className="font-semibold">{data.length}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockChart;
