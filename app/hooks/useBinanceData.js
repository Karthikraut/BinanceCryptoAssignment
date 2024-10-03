// app/hooks/useBinanceData.js
import { useEffect, useState } from 'react';
import { createBinanceSocket } from '../utils/binanceSocket';

export default function useBinanceData(symbol, interval) {
const [chartData,setChartData] = useState([]);

  useEffect(() => {
    const ws = createBinanceSocket(symbol, interval, (data) => {
      if (data.k.x) {  // Check if the candlestick is closed
        const newCandle = {
          time: new Date(data.k.T),
          open: parseFloat(data.k.o),
          high: parseFloat(data.k.h),
          low: parseFloat(data.k.l),
          close: parseFloat(data.k.c)
        };

        setChartData((prevData)=>[...prevData,newCandle]);
      }
    });

    return () => ws.close();  // Cleanup WebSocket on unmount
  }, [symbol, interval]);
 
  console.log("chardata",chartData);
  return chartData;
}
