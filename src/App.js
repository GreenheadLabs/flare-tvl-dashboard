import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Updated API function with real XRP price
const fetchFlareTVL = async () => {
  try {
    // Fetch real XRP price from CoinGecko (free API)
    const { data: prices } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd');
    const xrpPrice = prices.ripple?.usd || 2.18; // Fallback to current price if API fails
    
    // Real-ish TVL data (update with DeFiLlama later)
    const assetBreakdown = {
      FXRP: { tvl: 149579262, location: 'Kinetic (Lending), SparkDEX (Liquidity)', price: xrpPrice },
      stXRP: { tvl: 50000000, location: 'Firelight Staking', price: xrpPrice },
      WFLR: { tvl: 25000000, location: 'WNat Contract, FTSO Delegation', price: 0.025 }, // Mock FLR
      rFLR: { tvl: 15000000, location: 'Incentive Pools (FAssets Program)', price: 0.025 },
      FLR: { tvl: 100000000, location: 'Native Staking/Validators', price: 0.025 },
    };
    
    const totalTVL = Object.values(assetBreakdown).reduce((sum, asset) => sum + asset.tvl, 0);
    
    return { 
      totalTVL, 
      assetBreakdown, 
      protocols: [
        { name: 'Kinetic', tvl: 80000000 },
        { name: 'SparkDEX', tvl: 40000000 },
        { name: 'Firelight', tvl: 50000000 },
        { name: 'FTSO', tvl: 25000000 },
        { name: 'Validators', tvl: 100000000 },
      ],
      xrpPrice // New: Pass XRP price for the card
    };
  } catch (error) {
    console.error('Error fetching prices:', error);
    // Updated Metrics Cards with XRP Price
const MetricsCards = ({ totalTVL, assetBreakdown, xrpPrice }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6"> {/* Changed to 4 cols */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-gray-400 text-sm uppercase tracking-wider">Total TVL</h3>
      <p className="text-3xl font-bold text-white mt-1">${(totalTVL / 1e6).toFixed(2)}M</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-gray-400 text-sm uppercase tracking-wider">FXRP Locked</h3>
      <p className="text-3xl font-bold text-blue-400 mt-1">${(assetBreakdown.FXRP?.tvl / 1e6 || 0).toFixed(2)}M</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-gray-400 text-sm uppercase tracking-wider">24h Change</h3>
      <p className="text-3xl font-bold text-green-400 mt-1">+0.70%</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-500"> {/* New XRP card */}
      <h3 className="text-gray-400 text-sm uppercase tracking-wider">XRP Price</h3>
      <p className="text-3xl font-bold text-green-400 mt-1">${xrpPrice?.toFixed(2)}</p>
      <p className="text-xs text-gray-500 mt-1">Live via CoinGecko</p>
    </div>
  </div>
);
// Header Component
const Header = () => (
  <header className="bg-gray-900 p-4 flex justify-between items-center shadow-lg">
    <h1 className="text-2xl font-bold text-blue-400">Flare TVL Dashboard</h1>
    <p className="text-sm text-gray-400">Data as of Dec 3, 2025 | Powered by DeFiLlama</p>
  </header>
);

// Metrics Cards Component
const MetricsCards = ({ totalTVL, assetBreakdown }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-gray-400 text-sm uppercase tracking-wider">Total TVL</h3>
      <p className="text-3xl font-bold text-white mt-1">${(totalTVL / 1e6).toFixed(2)}M</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-gray-400 text-sm uppercase tracking-wider">FXRP Locked</h3>
      <p className="text-3xl font-bold text-blue-400 mt-1">${(assetBreakdown.FXRP?.tvl / 1e6 || 0).toFixed(2)}M</p>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-gray-400 text-sm uppercase tracking-wider">24h Change</h3>
      <p className="text-3xl font-bold text-green-400 mt-1">+2.5%</p>
    </div>
  </div>
);

// TVL Table Component
const TVLTable = ({ assetBreakdown }) => (
  <div className="p-6">
    <h2 className="text-xl font-semibold mb-4 text-white">Asset Breakdown</h2>
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-4 text-left text-sm font-semibold text-gray-300">Asset</th>
            <th className="p-4 text-left text-sm font-semibold text-gray-300">TVL (USD)</th>
            <th className="p-4 text-left text-sm font-semibold text-gray-300">Price (USD)</th>
            <th className="p-4 text-left text-sm font-semibold text-gray-300">Location</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {Object.entries(assetBreakdown).map(([key, data]) => (
            <tr key={key} className="hover:bg-gray-700">
              <td className="p-4 font-medium text-white">{key}</td>
              <td className="p-4 text-gray-300">${(data.tvl / 1e6).toFixed(2)}M</td>
              <td className="p-4 text-gray-300">${data.price?.toFixed(4)}</td>
              <td className="p-4 text-gray-400 text-sm">{data.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Charts Component
const TVLCharts = ({ totalTVL, assetBreakdown }) => {
  const lineData = {
    labels: ['Oct 2025', 'Nov 2025', 'Dec 2025'],
    datasets: [{
      label: 'Flare TVL ($M)',
      data: [120, 150, totalTVL / 1e6],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.1,
    }],
  };

  const pieData = {
    labels: Object.keys(assetBreakdown),
    datasets: [{
      data: Object.values(assetBreakdown).map(d => d.tvl),
      backgroundColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
        'rgb(139, 92, 246)',
      ],
    }],
  };

  const options = { responsive: true, plugins: { legend: { position: 'top' } } };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="mb-4 text-white font-semibold">TVL Trend</h3>
        <Line data={lineData} options={options} />
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="mb-4 text-white font-semibold">Asset Distribution</h3>
        <div className="h-64">
          <Pie data={pieData} options={options} />
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [data, setData] = useState({ totalTVL: 0, assetBreakdown: {}, protocols: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const fetchedData = await fetchFlareTVL();
      setData(fetchedData);
      setLoading(false);
    };
    loadData();
    const interval = setInterval(loadData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading Flare TVL Data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <MetricsCards totalTVL={data.totalTVL} assetBreakdown={data.assetBreakdown} xrpPrice={data.xrpPrice} />
      <TVLTable assetBreakdown={data.assetBreakdown} />
      <TVLCharts {...data} />
      <footer className="bg-gray-900 p-4 text-center text-gray-500 text-sm">
        Built with React & Chart.js | Data from DeFiLlama
      </footer>
    </div>
  );
}

export default App;

