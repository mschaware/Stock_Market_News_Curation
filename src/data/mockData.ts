import { NewsItem, PortfolioItem, Stock } from '../types';

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Reliance Industries Reports Strong Q3 Results, Beats Estimates',
    content: 'Reliance Industries Ltd reported better-than-expected quarterly results with revenue growth of 15% YoY. The company saw strong performance across petrochemicals and digital services segments.',
    source: 'Economic Times',
    timestamp: '2 hours ago',
    category: 'stock',
    sentiment: 'positive',
    impact: 'high'
  },
  {
    id: '2',
    title: 'RBI Keeps Repo Rate Unchanged at 6.5%, Maintains Neutral Stance',
    content: 'The Reserve Bank of India maintained the repo rate at 6.5% for the sixth consecutive meeting, citing balanced inflation and growth concerns.',
    source: 'Moneycontrol',
    timestamp: '4 hours ago',
    category: 'economy',
    sentiment: 'neutral',
    impact: 'medium'
  },
  {
    id: '3',
    title: 'IT Sector Faces Headwinds as Global Spending Slows',
    content: 'Major IT companies including TCS, Infosys, and Wipro are facing challenges due to reduced technology spending by global clients amid economic uncertainty.',
    source: 'Business Standard',
    timestamp: '6 hours ago',
    category: 'sector',
    sentiment: 'negative',
    impact: 'high'
  },
  {
    id: '4',
    title: 'HDFC Bank Announces Merger Completion, Expects Synergies',
    content: 'HDFC Bank has successfully completed its merger with HDFC Ltd, creating one of the largest financial institutions in India.',
    source: 'Economic Times',
    timestamp: '8 hours ago',
    category: 'stock',
    sentiment: 'positive',
    impact: 'high'
  },
  {
    id: '5',
    title: 'Nifty 50 Closes Higher Led by Banking and Auto Stocks',
    content: 'Indian equity markets ended the session on a positive note with Nifty 50 gaining 0.8% led by strong performance in banking and automobile sectors.',
    source: 'CNBC TV18',
    timestamp: '1 day ago',
    category: 'market',
    sentiment: 'positive',
    impact: 'medium'
  },
  {
    id: '6',
    title: 'Tata Motors Shares Surge on Strong JLR Performance',
    content: 'Tata Motors stock jumped 5% after the company reported strong quarterly results driven by improved performance of its luxury arm Jaguar Land Rover.',
    source: 'Moneycontrol',
    timestamp: '1 day ago',
    category: 'stock',
    sentiment: 'positive',
    impact: 'high'
  },
  {
    id: '7',
    title: 'Infosys Cuts FY24 Revenue Guidance Amid Demand Slowdown',
    content: 'Infosys has revised its FY24 revenue guidance downward citing prolonged weakness in discretionary spending by clients in key markets.',
    source: 'Business Standard',
    timestamp: '2 days ago',
    category: 'stock',
    sentiment: 'negative',
    impact: 'high'
  },
  {
    id: '8',
    title: 'Foreign Investors Turn Net Buyers in Indian Equities',
    content: 'Foreign institutional investors (FIIs) have turned net buyers in Indian equities after three months of selling, pumping in ₹2,500 crore this week.',
    source: 'Economic Times',
    timestamp: '2 days ago',
    category: 'market',
    sentiment: 'positive',
    impact: 'medium'
  }
];

export const mockPortfolio: PortfolioItem[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    quantity: 50,
    avgPrice: 2450.00,
    currentPrice: 2580.50,
    totalValue: 129025,
    pnl: 6525,
    pnlPercent: 5.32
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    quantity: 100,
    avgPrice: 1650.00,
    currentPrice: 1680.25,
    totalValue: 168025,
    pnl: 3025,
    pnlPercent: 1.83
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    quantity: 75,
    avgPrice: 1420.00,
    currentPrice: 1380.75,
    totalValue: 103556.25,
    pnl: -2943.75,
    pnlPercent: -2.76
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd',
    quantity: 200,
    avgPrice: 485.00,
    currentPrice: 510.20,
    totalValue: 102040,
    pnl: 5040,
    pnlPercent: 5.20
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    quantity: 30,
    avgPrice: 3650.00,
    currentPrice: 3580.50,
    totalValue: 107415,
    pnl: -2085,
    pnlPercent: -1.90
  }
];

export const mockStocks: Stock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    price: 2580.50,
    change: 25.30,
    changePercent: 0.99,
    volume: 2500000,
    marketCap: '17.5L Cr',
    sector: 'Oil & Gas'
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    price: 1680.25,
    change: 12.50,
    changePercent: 0.75,
    volume: 1800000,
    marketCap: '12.8L Cr',
    sector: 'Banking'
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    price: 1380.75,
    change: -18.25,
    changePercent: -1.30,
    volume: 3200000,
    marketCap: '5.8L Cr',
    sector: 'IT Services'
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd',
    price: 510.20,
    change: 15.40,
    changePercent: 3.11,
    volume: 4500000,
    marketCap: '1.9L Cr',
    sector: 'Automobile'
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    price: 3580.50,
    change: -35.20,
    changePercent: -0.97,
    volume: 1200000,
    marketCap: '13.1L Cr',
    sector: 'IT Services'
  },
  {
    symbol: 'WIPRO',
    name: 'Wipro Ltd',
    price: 425.80,
    change: -5.60,
    changePercent: -1.30,
    volume: 2800000,
    marketCap: '2.3L Cr',
    sector: 'IT Services'
  },
  {
    symbol: 'BAJFINANCE',
    name: 'Bajaj Finance Ltd',
    price: 6850.30,
    change: 85.40,
    changePercent: 1.26,
    volume: 950000,
    marketCap: '4.2L Cr',
    sector: 'Financial Services'
  },
  {
    symbol: 'MARUTI',
    name: 'Maruti Suzuki India Ltd',
    price: 10250.75,
    change: 125.50,
    changePercent: 1.24,
    volume: 650000,
    marketCap: '3.1L Cr',
    sector: 'Automobile'
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd',
    price: 890.45,
    change: 8.20,
    changePercent: 0.93,
    volume: 1600000,
    marketCap: '5.0L Cr',
    sector: 'Telecom'
  },
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    price: 625.30,
    change: 12.80,
    changePercent: 2.09,
    volume: 3500000,
    marketCap: '5.6L Cr',
    sector: 'Banking'
  }
];