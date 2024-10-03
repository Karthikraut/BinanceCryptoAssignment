"use client"
import React from 'react'

const Cointoggle = ({selectedCoin, onCoinChange}) => {
    const coins = ["ethusdt", "bnbusdt", "dotusdt"];
    return (
    <div>
        <select value={selectedCoin} onChange={(e)=>onCoinChange(e.target.value)}>
            {coins.map((coin)=>{
                <option key={coin} value={coin}>
                    {coin.toUpperCase()};
                </option>
            })}
        </select>
    </div>
  )
}

export default Cointoggle;