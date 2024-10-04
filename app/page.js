// app/page.js
"use client";

import { useEffect, useState } from 'react';
import Cointoggle from './components/temp_Cointoggle';
import CandlestickChart from './charts/CandlestickChart';
import useBinanceData from './hooks/useBinanceData';


export default function Home() {
  
  const [selectedCoin, setSelectedCoin] = useState('ethusdt');
  const [interval, setInterval] = useState('1s');

  let chartData = useBinanceData(selectedCoin, interval);
  useEffect(()=>{

    console.log(selectedCoin,"  ",interval);
  },[selectedCoin,interval])

  return (
    <div className="bg-[#eaf5ff] m-auto  ">
  <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
    Binance Market Data for Fintarget
  </h1>

  {/* Coin Toggle */}
  <div className="mb-6 flex justify-center">
    <Cointoggle
      selectedCoin={selectedCoin}
      setSelectedCoin={setSelectedCoin}
    />
  </div>

  {/* Time Interval Selector */}
  <div className="mb-6 flex flex-col items-center">
    <label className="text-lg font-medium text-gray-700 mb-2">
      Time Interval:
    </label>
    <select
      value={interval}
      onChange={(e) => setInterval(e.target.value)}
      className="w-48 p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
    >
      <option value="1s">1 Second</option>
      <option value="1m">1 Minute</option>
      <option value="3m">3 Minutes</option>
      <option value="5m">5 Minutes</option>
    </select>
  </div>

  {/* Candlestick Chart */}
  <div className="mt-8">
    <CandlestickChart chartData={chartData} />
  </div>
</div>
  );
}
