import { BookOpen, LayoutGrid, Users, BarChart3 } from "lucide-react";
import type { Stats } from "@shared/schema";

interface HeroSectionProps {
  stats?: Stats;
}

export default function HeroSection({ stats }: HeroSectionProps) {
  const defaultStats = {
    prompts_count: 1200,
    categories_count: 8,
    contributors_count: 156,
    insights_count: 32,
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-900/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Professional<br />System Prompts
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Curated collection of high-quality system prompts for AI applications, developed by the community
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="stat-card bg-white/10 border border-white/20 rounded-2xl p-6 flex items-center space-x-4">
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <BookOpen className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300 mb-1">Prompts</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">
                {displayStats.prompts_count >= 1000 
                  ? `${(displayStats.prompts_count / 1000).toFixed(1)}k` 
                  : displayStats.prompts_count
                }
              </p>
            </div>
          </div>

          <div className="stat-card bg-white/10 border border-white/20 rounded-2xl p-6 flex items-center space-x-4">
            <div className="bg-teal-500/20 p-3 rounded-xl">
              <LayoutGrid className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300 mb-1">Categories</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">{displayStats.categories_count}</p>
            </div>
          </div>

          <div className="stat-card bg-white/10 border border-white/20 rounded-2xl p-6 flex items-center space-x-4">
            <div className="bg-purple-500/20 p-3 rounded-xl">
              <Users className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300 mb-1">Contributors</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">{displayStats.contributors_count}</p>
            </div>
          </div>

          <div className="stat-card bg-white/10 border border-white/20 rounded-2xl p-6 flex items-center space-x-4">
            <div className="bg-orange-500/20 p-3 rounded-xl">
              <BarChart3 className="w-6 h-6 text-orange-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300 mb-1">Insights</p>
              <p className="text-2xl lg:text-3xl font-bold text-white">{displayStats.insights_count}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
