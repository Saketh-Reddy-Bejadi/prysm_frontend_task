import Navbar from "@/components/Navbar";
import StockChart from "@/components/StockChart";
import StockAnalysis from "@/components/StockAnalysis";
import stockData from "../../data.json";
import React from "react";
import MainContainer from "@/components/MainContainer";
import CustomMetrics from "@/components/CustomMetrics";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-16 sm:pt-20 lg:pt-25 p-4 sm:p-6 lg:p-10 bg-zinc-100 space-y-4 sm:space-y-6">
        <MainContainer stockData={stockData} />
        <CustomMetrics />
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="w-full lg:w-[73%]">
            <StockChart />
          </div>
          <StockAnalysis stockData={stockData} />
        </div>
      </div>
    </div>
  );
};

export default page;
