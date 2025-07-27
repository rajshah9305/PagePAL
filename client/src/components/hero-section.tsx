import { useState, useEffect } from "react";
import { BookOpen, LayoutGrid, Users, BarChart3, TrendingUp, Star } from "lucide-react";
import type { Stats } from "@shared/schema";

interface HeroSectionProps {
  stats?: Stats;
}

export default function HeroSection({ stats }: HeroSectionProps) {
  const [animatedStats, setAnimatedStats] = useState({
    prompts_count: 0,
    categories_count: 0,
    contributors_count: 0,
    insights_count: 0,
  });

  const defaultStats = {
    prompts_count: 1200,
    categories_count: 8,
    contributors_count: 156,
    insights_count: 32,
  };

  const displayStats = stats || defaultStats;

  // Animate stats counting up
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedStats({
        prompts_count: Math.floor(displayStats.prompts_count * easeOutQuart),
        categories_count: Math.floor(displayStats.categories_count * easeOutQuart),
        contributors_count: Math.floor(displayStats.contributors_count * easeOutQuart),
        insights_count: Math.floor(displayStats.insights_count * easeOutQuart),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(displayStats);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [displayStats]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <div className="hero-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-900/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/80 text-sm font-medium mb-6 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span>Trusted by AI developers worldwide</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
            Discover Professional<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              System Prompts
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Curated collection of high-quality system prompts for AI applications, developed by the community
          </p>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.8 average rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Updated daily</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="stat-card bg-white/10 border border-white/20 rounded-2xl p-6 flex items-center space-x-4 hover:bg-white/15 transition-all duration-300 group">
            <div className="bg-blue-500/20 p-3 rounded-xl group-hover:bg-blue-500/30 transition-colors duration-300">
              <BookOpen className="w-6 h-6 text-blue-300 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300 mb-1">Prompts</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">
                {formatNumber(animatedStats.prompts_count)}
              </p>
            </div>
          </div>

          <div className="stat-card bg-white/10 border border-white/20 rounded-2xl p-6 flex items-center space-x-4 hover:bg-white/15 transition-all duration-300 group">
            <div className="bg-teal-500/20 p-3 rounded-xl group-hover:bg-teal-500/30 transition-colors duration-300">
              <LayoutGrid className="w-6 h-6 text-teal-300 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300 mb-1">Categories</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">{animatedStats.categories_count}</p>
            </div>
          </div>

          <div className="stat-card bg-white/10 border border-white/20 rounded-2xl p-6 flex items-center space-x-4 hover:bg-white/15 transition-all duration-300 group">
            <div className="bg-purple-500/20 p-3 rounded-xl group-hover:bg-purple-500/30 transition-colors duration-300">
              <Users className="w-6 h-6 text-purple-300 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300 mb-1">Contributors</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">{animatedStats.contributors_count}</p>
            </div>
          </div>

          <div className="stat-card bg-white/10 border border-white/20 rounded-2xl p-6 flex items-center space-x-4 hover:bg-white/15 transition-all duration-300 group">
            <div className="bg-orange-500/20 p-3 rounded-xl group-hover:bg-orange-500/30 transition-colors duration-300">
              <BarChart3 className="w-6 h-6 text-orange-300 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300 mb-1">Insights</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">{animatedStats.insights_count}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
