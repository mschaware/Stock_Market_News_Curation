import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, TrendingDown, AlertCircle, Target, Lightbulb } from 'lucide-react';
import { NewsItem, PortfolioItem, AIInsight } from '../types';

interface AIInsightsProps {
  filteredNews: NewsItem[];
  portfolio: PortfolioItem[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ filteredNews, portfolio }) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [marketSentiment, setMarketSentiment] = useState<'positive' | 'negative' | 'neutral'>('neutral');
  const [overallRecommendation, setOverallRecommendation] = useState<string>('');

  useEffect(() => {
    generateInsights();
  }, [filteredNews, portfolio]);

  const generateInsights = async () => {
    setLoading(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockInsights: AIInsight[] = portfolio.map(item => {
      const relatedNews = filteredNews.filter(news => 
        news.title.toLowerCase().includes(item.symbol.toLowerCase()) ||
        news.content.toLowerCase().includes(item.symbol.toLowerCase())
      );
      
      const positiveNews = relatedNews.filter(news => news.sentiment === 'positive').length;
      const negativeNews = relatedNews.filter(news => news.sentiment === 'negative').length;
      const totalNews = relatedNews.length;
      
      let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
      let impact: 'high' | 'medium' | 'low' = 'low';
      let confidence = 0;
      let reasoning = '';
      let recommendation = '';
      
      if (totalNews > 0) {
        const sentimentScore = (positiveNews - negativeNews) / totalNews;
        
        if (sentimentScore > 0.3) {
          sentiment = 'positive';
          impact = totalNews > 2 ? 'high' : 'medium';
          confidence = Math.min(85, 60 + (sentimentScore * 30));
          reasoning = `${positiveNews} positive news items indicate strong market sentiment. Recent developments suggest potential upward momentum.`;
          recommendation = item.pnl > 0 ? 'Consider holding or adding to position' : 'Monitor for potential recovery';
        } else if (sentimentScore < -0.3) {
          sentiment = 'negative';
          impact = totalNews > 2 ? 'high' : 'medium';
          confidence = Math.min(85, 60 + (Math.abs(sentimentScore) * 30));
          reasoning = `${negativeNews} negative news items suggest market concerns. Recent developments indicate potential downward pressure.`;
          recommendation = item.pnl > 0 ? 'Consider booking profits or reducing position' : 'Exercise caution, consider stop-loss';
        } else {
          sentiment = 'neutral';
          impact = 'low';
          confidence = 50;
          reasoning = `Mixed news sentiment with ${positiveNews} positive and ${negativeNews} negative items. Market appears to be in consolidation phase.`;
          recommendation = 'Hold current position and monitor developments';
        }
      } else {
        confidence = 30;
        reasoning = 'Limited news coverage makes sentiment analysis challenging. Consider other technical indicators.';
        recommendation = 'Monitor for news developments and technical signals';
      }
      
      return {
        id: `insight-${item.symbol}`,
        stockSymbol: item.symbol,
        stockName: item.name,
        sentiment,
        impact,
        confidence,
        reasoning,
        recommendation,
        relatedNews: relatedNews.slice(0, 3).map(news => news.title)
      };
    });
    
    setInsights(mockInsights);
    
    // Calculate overall market sentiment
    const totalPositive = mockInsights.filter(i => i.sentiment === 'positive').length;
    const totalNegative = mockInsights.filter(i => i.sentiment === 'negative').length;
    const totalNeutral = mockInsights.filter(i => i.sentiment === 'neutral').length;
    
    if (totalPositive > totalNegative && totalPositive > totalNeutral) {
      setMarketSentiment('positive');
      setOverallRecommendation('Market sentiment appears favorable. Consider maintaining or increasing exposure to well-performing stocks.');
    } else if (totalNegative > totalPositive && totalNegative > totalNeutral) {
      setMarketSentiment('negative');
      setOverallRecommendation('Market sentiment shows concerns. Consider risk management and defensive positioning.');
    } else {
      setMarketSentiment('neutral');
      setOverallRecommendation('Mixed market signals suggest a cautious approach. Focus on stock-specific fundamentals.');
    }
    
    setLoading(false);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'negative':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
        <div className="flex items-center space-x-2 mb-2">
          <Brain className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Insights</h1>
        </div>
        <p className="text-gray-600">AI-powered analysis of your portfolio based on recent news</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-2 text-gray-600">Analyzing market sentiment...</span>
        </div>
      )}

      {!loading && (
        <>
          {/* Overall Market Sentiment */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <Target className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Overall Market Sentiment</h2>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              {getSentimentIcon(marketSentiment)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(marketSentiment)}`}>
                {marketSentiment.charAt(0).toUpperCase() + marketSentiment.slice(1)}
              </span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{overallRecommendation}</p>
              </div>
            </div>
          </div>

          {/* Individual Stock Insights */}
          <div className="space-y-6">
            {insights.map((insight) => (
              <div key={insight.id} className={`bg-white p-6 rounded-xl shadow-sm border-2 ${getSentimentColor(insight.sentiment)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getSentimentIcon(insight.sentiment)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{insight.stockSymbol}</h3>
                      <p className="text-sm text-gray-600">{insight.stockName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                      {insight.impact} impact
                    </span>
                    <span className="text-sm text-gray-500">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Analysis</h4>
                  <p className="text-gray-700 text-sm">{insight.reasoning}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Recommendation</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-700 text-sm">{insight.recommendation}</p>
                  </div>
                </div>
                
                {insight.relatedNews.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Related News</h4>
                    <ul className="space-y-1">
                      {insight.relatedNews.map((news, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {news}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {insights.length === 0 && (
            <div className="text-center py-12">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No portfolio holdings found. Add stocks to your portfolio to get AI insights.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AIInsights;