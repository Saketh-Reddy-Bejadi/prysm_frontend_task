"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import metricsData from "../../metrics.json";

interface Metric {
  id: number;
  name: string;
  pe: number;
  peg: number;
  rsi: number;
}

export default function CustomMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("customMetrics");
    setMetrics(stored ? JSON.parse(stored) : metricsData);
  }, []);

  useEffect(() => {
    localStorage.setItem("customMetrics", JSON.stringify(metrics));
  }, [metrics]);

  const addMetric = () =>
    setMetrics([
      ...metrics,
      {
        id: Date.now(),
        name: `Metric ${metrics.length + 1}`,
        pe: +(Math.random() * 60).toFixed(2),
        peg: +(Math.random() * 3).toFixed(2),
        rsi: Math.floor(Math.random() * 100),
      },
    ]);

  const removeMetric = (id: number) =>
    setMetrics(metrics.filter((m) => m.id !== id));

  return (
    <Card className="mx-auto shadow-lg border border-gray-200 backdrop-blur-lg bg-white/60">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Custom Metrics
          </h1>
          <Button onClick={addMetric} className="rounded-full w-full sm:w-auto">
            <span className="sm:hidden">+ Add</span>
            <span className="hidden sm:inline">+ Add Metric</span>
          </Button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                {["Name", "PE", "PEG", "RSI", "Action"].map((h) => (
                  <th key={h} className="py-2 px-2 sm:px-4 text-left font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((m) => (
                <tr
                  key={m.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="py-2 px-2 sm:px-4 font-medium">{m.name}</td>
                  <td className="py-2 px-2 sm:px-4">{m.pe}</td>
                  <td className="py-2 px-2 sm:px-4">{m.peg}</td>
                  <td className="py-2 px-2 sm:px-4">{m.rsi}</td>
                  <td className="py-2 px-2 sm:px-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeMetric(m.id)}
                      className="text-xs px-2 py-1"
                    >
                      <span className="">Remove</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
