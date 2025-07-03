import React from 'react';
import { BarChart3, Newspaper, Briefcase, Brain, TrendingUp } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: 'dashboard' | 'news' | 'portfolio' | 'insights') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'news', label: 'Market News', icon: Newspaper },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'insights', label: 'AI Insights', icon: Brain },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">MarketPulse</h1>
            <p className="text-sm text-gray-500">Indian Stock Market</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeView === item.id 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-xs text-gray-400">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;