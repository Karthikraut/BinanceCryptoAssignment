# Binance Market Data App

A web application that fetches and displays real-time cryptocurrency data from Binance, including candlestick charts and other market metrics.

## Table of Contents
- [Demo](#https://binance-crypto-fintarget-sq.vercel.app)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [File Structure](#file-structure)
- [Future Improvements](#future-improvements)
- [License](#license)

## Demo

You can see the live demo [here](#https://binance-crypto-fintarget-sq.vercel.app).

## Features

- Real-time cryptocurrency data from Binance.
- Candlestick charts to visualize market trends.
- Coin toggle feature to switch between different cryptocurrencies.
- Configurable time intervals for market data (1s, 1m, 3m, 5m).
- Responsive design using Tailwind CSS for better user experience across devices.
- Local data caching to preserve chart data when switching between coins.

## Technologies

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **UI Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charting Library**: [Lightweight-Charts](https://tradingview.github.io/lightweight-charts/)
- **Cryptocurrency Data**: [Binance API](https://binance-docs.github.io/apidocs/spot/en/)

## Installation

### Prerequisites

- Node.js (>= 14.x.x)
- NPM or Yarn

### Clone the Repository

```bash
git clone https://github.com/your-username/binance-market-data-app.git
cd binance-market-data-app
```

### Install Dependencies

```bash
npm install
```
or if using Yarn:
```bash
yarn install
```

### Configure Tailwind CSS (If not pre-configured)

Make sure your Tailwind CSS is set up by following the [official Tailwind guide](https://tailwindcss.com/docs/guides/nextjs).

### Start the Development Server

```bash
npm run dev
```
or if using Yarn:
```bash
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to view the app.

## Usage

1. **Select a Coin**: Use the dropdown menu to select a cryptocurrency (e.g., ETH, BNB, DOT).
2. **Set Time Interval**: Choose a time interval for fetching market data (1s, 1m, 3m, 5m).
3. **View Candlestick Chart**: The candlestick chart will update based on the selected coin and time interval.

## API Integration

This application fetches real-time cryptocurrency data from the [Binance API](https://binance-docs.github.io/apidocs/spot/en/).

### Example API Request

```bash
https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m
```

The app uses the following Binance API endpoints:
- **Kline/Candlestick data** for real-time chart updates.
- Additional Binance API features can be easily integrated into the app.

## File Structure

```
binance-market-data-app/
├── app/
│   ├── layout.js           // Main layout for the app
│   └── page.js             // Home page where market data and charts are displayed
├── components/
│   ├── Cointoggle.js       // Coin selection dropdown component
│   └── CandlestickChart.js // Candlestick chart using Lightweight-Charts
├── styles/
│   └── globals.css         // Tailwind CSS and global styles
├── public/                 // Static assets
├── package.json
├── tailwind.config.js      // Tailwind configuration
├── postcss.config.js       // PostCSS configuration
└── README.md               // Project documentation
```

## Future Improvements

- **Additional Coins**: Expand support for more coins and pairings.
- **Historical Data**: Add the ability to view historical data for longer periods.
- **Technical Indicators**: Implement technical indicators (e.g., RSI, moving averages) on the candlestick charts.
- **User Authentication**: Secure personal watchlists or settings with user accounts.
- **WebSocket Integration**: Use Binance WebSocket API for real-time updates without polling.

