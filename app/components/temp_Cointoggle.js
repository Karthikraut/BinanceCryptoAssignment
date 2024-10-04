"use client";
import React from 'react';

const Cointoggle = ({ selectedCoin, setSelectedCoin }) => {
    const coins = ["ethusdt", "bnbusdt", "dotusdt"];
  
    return (
      <div className="flex flex-col items-center mb-4">
        <label className="text-lg font-medium text-gray-700 mb-2">
          Select Coins
        </label>
        <select
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          className="w-48 p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          {coins.map((coin) => (
            <option key={coin} value={coin} className="text-gray-700">
              {coin.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    );
  };
  

export default Cointoggle;
