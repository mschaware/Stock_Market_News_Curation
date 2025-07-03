import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import NewsSection from './components/NewsSection';
import Portfolio from './components/Portfolio';
import AIInsights from './components/AIInsights';
import { NewsItem, Stock, PortfolioItem } from './types';
import { mockNews, mockPortfolio, mockStocks } from './data/mockData';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'news' | 'portfolio' | 'insights'>('dashboard');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Simulate data loading
    setNews(mockNews);
    setPortfolio(mockPortfolio);
    setStocks(mockStocks);
  }, []);

  useEffect(() => {
    // Filter news based on portfolio holdings
    const portfolioSymbols = portfolio.map(item => item.symbol.toLowerCase());
    const filtered = news.filter(item => 
      portfolioSymbols.some(symbol => 
        item.title.toLowerCase().includes(symbol) || 
        item.content.toLowerCase().includes(symbol)
      )
    );
    setFilteredNews(filtered);
  }, [news, portfolio]);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard news={news} portfolio={portfolio} filteredNews={filteredNews} />;
      case 'news':
        return <NewsSection news={news} filteredNews={filteredNews} />;
      case 'portfolio':
        return <Portfolio portfolio={portfolio} setPortfolio={setPortfolio} stocks={stocks} />;
      case 'insights':
        return <AIInsights filteredNews={filteredNews} portfolio={portfolio} />;
      default:
        return <Dashboard news={news} portfolio={portfolio} filteredNews={filteredNews} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;