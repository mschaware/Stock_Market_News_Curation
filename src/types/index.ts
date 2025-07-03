export interface NewsItem {
  id: string;
  title: string;
  content: string;
  source: string;
  timestamp: string;
  category: 'market' | 'sector' | 'stock' | 'economy';
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: 'high' | 'medium' | 'low';
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  sector: string;
}

export interface PortfolioItem {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  pnl: number;
  pnlPercent: number;
}

export interface AIInsight {
  id: string;
  stockSymbol: string;
  stockName: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  reasoning: string;
  recommendation: string;
  relatedNews: string[];
}