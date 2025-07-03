import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Newspaper, Briefcase, Target } from 'lucide-react';
import { NewsItem, PortfolioItem } from '../types';

interface DashboardProps {
  news: NewsItem[];
  portfolio: PortfolioItem[];
  filteredNews: NewsItem[];
}

const Dashboard: React.FC<DashboardProps> = ({ news, portfolio, filteredNews }) => {
  const totalPortfolioValue = portfolio.reduce((sum, item) => sum + item.totalValue, 0);
  const totalPnL = portfolio.reduce((sum, item) => sum + item.pnl, 0);
  const totalPnLPercent = (totalPnL / (totalPortfolioValue - totalPnL)) * 100;

  const positiveNews = news.filter(item => item.sentiment === 'positive').length;
  const negativeNews = news.filter(item => item.sentiment === 'negative').length;
  const neutralNews = news.filter(item => item.sentiment === 'neutral').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Market Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time insights for your investment portfolio</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalPortfolioValue.toLocaleString()}</p>
            </div>
            <Briefcase className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-4 flex items-center">
            {totalPnL >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString()} ({totalPnLPercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">News Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{filteredNews.length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Portfolio-relevant news</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Market Sentiment</p>
              <p className="text-2xl font-bold text-gray-900">{news.length}</p>
            </div>
            <Newspaper className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-4 flex space-x-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              <span className="text-xs text-gray-600">{positiveNews}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
              <span className="text-xs text-gray-600">{negativeNews}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-500 rounded-full mr-1"></div>
              <span className="text-xs text-gray-600">{neutralNews}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent News */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Market News</h2>
          <div className="space-y-4">
            {news.slice(0, 5).map((item) => (
              <div key={item.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.content.substring(0, 100)}...</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{item.source}</span>
                      <span>•</span>
                      <span>{item.timestamp}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        item.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                        item.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.sentiment}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio Performance</h2>
          <div className="space-y-4">
            {portfolio.slice(0, 5).map((item) => (
              <div key={item.symbol} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{item.symbol}</span>
                    <span className="text-sm text-gray-500">({item.quantity} shares)</span>
                  </div>
                  <p className="text-sm text-gray-600">{item.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">₹{item.totalValue.toLocaleString()}</p>
                  <div className="flex items-center">
                    {item.pnl >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${item.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.pnl >= 0 ? '+' : ''}₹{item.pnl.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;