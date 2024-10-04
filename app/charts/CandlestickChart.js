import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export default function CandlestickChart({ chartData, symbol }) {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null); // Store the chart instance
    const candlestickSeriesRef = useRef(null); // Store the candlestick series

    useEffect(() => {
        if (!chartRef.current) {
            // Create the chart only once
            chartRef.current = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 400,
                layout: {
                    backgroundColor: '#eaf5ff',
                    textColor: '#000',
                },
                grid: {
                    vertLines: {
                        color: '#e1e1e1',
                    },
                    horzLines: {
                        color: '#e1e1e1',
                    },
                },
                crosshair: {
                    mode: 1, // Normal mode for crosshair movement
                },
                priceScale: {
                    borderColor: '#ccc',
                },
                timeScale: {
                    borderColor: '#ccc',
                    timeVisible: true,
                    secondsVisible: false,
                },
            });
            
            // Create the candlestick series
            candlestickSeriesRef.current = chartRef.current.addCandlestickSeries({
                upColor: 'rgba(75, 192, 192, 1)',
                downColor: 'rgba(255, 99, 132, 1)',
                borderDownColor: 'rgba(255, 99, 132, 1)',
                borderUpColor: 'rgba(75, 192, 192, 1)',
                wickDownColor: 'rgba(255, 99, 132, 1)',
                wickUpColor: 'rgba(75, 192, 192, 1)',
            });
        }

        // Function to fill inconsistent data with the previous candle's values
        const fillMissingCandleData = (data) => {
            const filledData = [];
            let lastValidCandle = null;

            data.forEach((item, index) => {
                const candle = { ...item };

                // If it's the first candle, use it as the reference
                if (index === 0) {
                    lastValidCandle = candle;
                    filledData.push(candle);
                    return;
                }

                // Fill missing or inconsistent data with the previous candle's data
                candle.open = candle.open ?? lastValidCandle.open;
                candle.high = candle.high ?? lastValidCandle.high;
                candle.low = candle.low ?? lastValidCandle.low;
                candle.close = candle.close ?? lastValidCandle.close;

                // Add the filled candle to the result
                filledData.push(candle);

                // Update the last valid candle to the current one
                lastValidCandle = candle;
            });

            return filledData;
        };

        // Format the data and ensure it's sorted by time and properly formatted as UNIX timestamps (in seconds)
        const formattedData = chartData
            .map(item => ({
                time: Math.floor(new Date(item.time).getTime() / 1000),
                open: item.open,
                high: item.high,
                low: item.low,
                close: item.close,
            }))
            .sort((a, b) => a.time - b.time); // Ensure sorting by the correct time property

        // Fill missing or inconsistent data
        const filledData = fillMissingCandleData(formattedData);

        // Check if data for this symbol exists in localStorage
        const storedData = localStorage.getItem(symbol);
        let mergedData = filledData;

        if (storedData) {
            // If stored data exists, merge it with the new incoming data
            const parsedStoredData = JSON.parse(storedData);
            const lastStoredCandle = parsedStoredData[parsedStoredData.length - 1];
            const firstNewCandle = filledData.length > 0 ? filledData[0] : null; // Ensure filledData has at least one element

            // Only merge if the last stored candle is older than the new data and firstNewCandle is valid
            if (lastStoredCandle && firstNewCandle && lastStoredCandle.time < firstNewCandle.time) {
                mergedData = [...parsedStoredData, ...filledData];
            }
        }

        // Set the merged data to the candlestick series
        candlestickSeriesRef.current.setData(mergedData);

        // Store the updated data back to localStorage
        localStorage.setItem(symbol, JSON.stringify(mergedData));

        // Resize chart on window resize
        const handleResize = () => {
            chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            // Clear the chart data if necessary when the component unmounts
        };
    }, [chartData, symbol]);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />;
}
