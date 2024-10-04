// app/utils/binanceSocket.js
export function createBinanceSocket(symbol, interval, onMessage) {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
  
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    return ws;
}
  