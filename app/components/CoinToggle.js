"use client";
import React from 'react';

const Cointoggle = ({ selectedCoin, setSelectedCoin }) => {
    const coins = ["ethusdt", "bnbusdt", "dotusdt"];
    return (
        <div>
            <label>Select Coins</label>
            <select value={selectedCoin} onChange={(e) =>setSelectedCoin(e.target.value)}>
                {coins.map((coin) => (
                    <option key={coin} value={coin}>
                        {coin.toUpperCase()}  {/* Removed <h1> for better HTML semantics */}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Cointoggle;
