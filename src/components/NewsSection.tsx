import React, { useState } from 'react';
import { Search, Filter, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsSectionProps {
  news: NewsItem[];
  filteredNews: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news, filteredNews }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [showFiltered, setShowFiltered] = useState(false);

  const filteredNewsBySearch = (showFiltered ? filteredNews : news).filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSentiment = selectedSentiment === 'all' || item.sentiment === selectedSentiment;
    
    return matchesSearch && matchesCategory && matchesSentiment;
  });

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Market News</h1>
        <p className="text-gray-600 mt-2">Stay updated with the latest market developments</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="market">Market</option>
              <option value="sector">Sector</option>
              <option value="stock">Stock</option>
              <option value="economy">Economy</option>
            </select>
            
            <select
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
            
            <button
              onClick={() => setShowFiltered(!showFiltered)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showFiltered 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showFiltered ? 'Show All' : 'Portfolio Only'}
            </button>
          </div>
        </div>
      </div>

      {/* News List */}
      <div className="space-y-6">
        {filteredNewsBySearch.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.content}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {item.timestamp}
                  </div>
                  <span>•</span>
                  <span className="font-medium">{item.source}</span>
                  <span>•</span>
                  <span className="capitalize">{item.category}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2 ml-4">
                <div className="flex items-center space-x-2">
                  {getSentimentIcon(item.sentiment)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(item.sentiment)}`}>
                    {item.sentiment}
                  </span>
                </div>
                
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item.impact)}`}>
                  {item.impact} impact
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNewsBySearch.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No news items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default NewsSection;