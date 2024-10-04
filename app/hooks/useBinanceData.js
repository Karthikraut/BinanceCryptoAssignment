// app/hooks/useBinanceData.js
import { useEffect, useState } from 'react';
import { createBinanceSocket } from '../utils/binanceSocket';

export default function useBinanceData(symbol, interval) {
const [chartData,setChartData] = useState([]);

const [prevSymbol,setPrevSymbol] =useState(null);
  useEffect(() => {
    if (symbol !== prevSymbol) {
       if(localStorage.getItem(symbol)) setChartData(JSON.parse(localStorage.getItem(symbol)));
       else setChartData([]); // Reset chartData if the symbol has changed
       setPrevSymbol(symbol); // Update prevSymbol to the new symbol
    }
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
        localStorage.setItem(symbol,JSON.stringify(chartData));
      }
    });

    return () => ws.close();  // Cleanup WebSocket on unmount
  }, [symbol, interval]);

  return chartData;
}
