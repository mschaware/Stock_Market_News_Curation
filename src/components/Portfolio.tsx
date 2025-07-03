import React, { useState } from 'react';
import { Plus, Trash2, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { PortfolioItem, Stock } from '../types';

interface PortfolioProps {
  portfolio: PortfolioItem[];
  setPortfolio: (portfolio: PortfolioItem[]) => void;
  stocks: Stock[];
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio, setPortfolio, stocks }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [quantity, setQuantity] = useState('');
  const [avgPrice, setAvgPrice] = useState('');

  const filteredStocks = stocks.filter(stock => 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStock = () => {
    if (!selectedStock || !quantity || !avgPrice) return;

    const newPortfolioItem: PortfolioItem = {
      symbol: selectedStock.symbol,
      name: selectedStock.name,
      quantity: parseInt(quantity),
      avgPrice: parseFloat(avgPrice),
      currentPrice: selectedStock.price,
      totalValue: selectedStock.price * parseInt(quantity),
      pnl: (selectedStock.price - parseFloat(avgPrice)) * parseInt(quantity),
      pnlPercent: ((selectedStock.price - parseFloat(avgPrice)) / parseFloat(avgPrice)) * 100,
    };

    setPortfolio([...portfolio, newPortfolioItem]);
    setShowAddModal(false);
    setSearchQuery('');
    setSelectedStock(null);
    setQuantity('');
    setAvgPrice('');
  };

  const handleRemoveStock = (symbol: string) => {
    setPortfolio(portfolio.filter(item => item.symbol !== symbol));
  };

  const totalValue = portfolio.reduce((sum, item) => sum + item.totalValue, 0);
  const totalPnL = portfolio.reduce((sum, item) => sum + item.pnl, 0);
  const totalPnLPercent = totalValue > 0 ? (totalPnL / (totalValue - totalPnL)) * 100 : 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
            <p className="text-gray-600 mt-2">Manage your stock holdings</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Stock</span>
          </button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total Value</p>
          <p className="text-2xl font-bold text-gray-900">₹{totalValue.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total P&L</p>
          <div className="flex items-center">
            <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString()}
            </p>
            {totalPnL >= 0 ? (
              <TrendingUp className="h-5 w-5 text-green-500 ml-2" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500 ml-2" />
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Return %</p>
          <p className={`text-2xl font-bold ${totalPnLPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Portfolio Holdings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Holdings</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P&L</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {portfolio.map((item) => (
                <tr key={item.symbol} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{item.symbol}</div>
                      <div className="text-sm text-gray-500">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{item.avgPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{item.currentPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{item.totalValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <span className={`font-medium ${item.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.pnl >= 0 ? '+' : ''}₹{item.pnl.toLocaleString()}
                      </span>
                      <span className={`ml-2 text-xs ${item.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ({item.pnlPercent >= 0 ? '+' : ''}{item.pnlPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleRemoveStock(item.symbol)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {portfolio.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No stocks in your portfolio. Add some stocks to get started!</p>
          </div>
        )}
      </div>

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Stock to Portfolio</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Stock</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or symbol..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {searchQuery && (
                  <div className="mt-2 border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
                    {filteredStocks.slice(0, 5).map((stock) => (
                      <button
                        key={stock.symbol}
                        onClick={() => {
                          setSelectedStock(stock);
                          setSearchQuery(`${stock.symbol} - ${stock.name}`);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-gray-900">{stock.symbol}</div>
                        <div className="text-sm text-gray-500">{stock.name}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter quantity"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Average Price</label>
                <input
                  type="number"
                  value={avgPrice}
                  onChange={(e) => setAvgPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter average price"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStock}
                disabled={!selectedStock || !quantity || !avgPrice}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;