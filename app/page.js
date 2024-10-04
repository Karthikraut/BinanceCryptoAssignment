// app/page.js
"use client";

import { useEffect, useState } from 'react';
import Cointoggle from './components/Cointoggle';
import CandlestickChart from './charts/CandlestickChart';
import useBinanceData from './hooks/useBinanceData';


export default function Home() {
    
  const [selectedCoin, setSelectedCoin] = useState('ethusdt');
  const [interval, setInterval] = useState('1m');

  let chartData = useBinanceData(selectedCoin, interval);
  useEffect(()=>{

    console.log(selectedCoin,"  ",interval);
  },[selectedCoin,interval])

  return (
    <div className="container">
      <h1>Binance Market Data</h1>

      <Cointoggle selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />

      <div>
        <label>Time Interval: </label>
        <select value={interval} onChange={(e) => setInterval(e.target.value)}>
          <option value="1s">1 Second</option>
          <option value="1m">1 Minutes</option>
          <option value="3m">3 Minutes</option>
          <option value="5m">5 Minutes</option>
        </select>
      </div>

      <CandlestickChart chartData={chartData} />
    </div>
  );
}
