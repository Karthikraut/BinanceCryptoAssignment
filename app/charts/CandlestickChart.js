import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export default function CandlestickChart({ chartData }) {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        // Log the structure of chartData for debugging
        console.log("Chart Data:", JSON.stringify(chartData, null, 2));

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 400,
            layout: {
                backgroundColor: '#ffffff',
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

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: 'rgba(75, 192, 192, 1)',
            downColor: 'rgba(255, 99, 132, 1)',
            borderDownColor: 'rgba(255, 99, 132, 1)',
            borderUpColor: 'rgba(75, 192, 192, 1)',
            wickDownColor: 'rgba(255, 99, 132, 1)',
            wickUpColor: 'rgba(75, 192, 192, 1)',
        });

        // Format the data and ensure it's sorted by time and properly formatted as UNIX timestamps (in seconds)
        const formattedData = chartData
            .map(item => ({
                // Convert time from ISO string to UNIX timestamp in seconds
                time: Math.floor(new Date(item.time).getTime() / 1000),
                open: item.open,
                high: item.high,
                low: item.low,
                close: item.close,
            }))
            .sort((a, b) => a.time - b.time); // Ensure data is sorted in ascending order by time

        candlestickSeries.setData(formattedData);

        // Resize chart on window resize
        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [chartData]);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />;
}
