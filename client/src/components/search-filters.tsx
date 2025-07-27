import { Search, Filter, Code, Palette, Brush, Megaphone, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Category } from "@shared/schema";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Category[];
}

export default function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: SearchFiltersProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "code": return <Code className="w-4 h-4 inline mr-2" />;
      case "palette": return <Palette className="w-4 h-4 inline mr-2" />;
      case "brush": return <Brush className="w-4 h-4 inline mr-2" />;
      case "megaphone": return <Megaphone className="w-4 h-4 inline mr-2" />;
      case "bar-chart": return <BarChart className="w-4 h-4 inline mr-2" />;
      default: return null;
    }
  };

  const getCategoryStyle = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 text-blue-700 hover:bg-blue-100",
      purple: "bg-purple-50 text-purple-700 hover:bg-purple-100",
      pink: "bg-pink-50 text-pink-700 hover:bg-pink-100",
      green: "bg-green-50 text-green-700 hover:bg-green-100",
      orange: "bg-orange-50 text-orange-700 hover:bg-orange-100",
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-50 text-gray-700 hover:bg-gray-100";
  };

  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search prompts by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>
        <Button
          variant="outline"
          className="flex-shrink-0 w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 border border-slate-300 text-base font-medium rounded-2xl text-slate-700 bg-white hover:bg-slate-50 shadow-sm"
        >
          <Filter className="w-5 h-5 text-slate-500" />
          <span>Filters</span>
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => onCategoryChange("all")}
          variant={selectedCategory === "all" ? "default" : "outline"}
          className={`px-4 py-2 rounded-xl font-medium text-sm transition-colors ${
            selectedCategory === "all" 
              ? "bg-slate-700 text-white hover:bg-slate-800" 
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          All Categories
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => onCategoryChange(category.name)}
            variant="outline"
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-colors ${
              selectedCategory === category.name
                ? getCategoryStyle(category.color).replace("hover:", "")
                : getCategoryStyle(category.color)
            }`}
          >
            {getIcon(category.icon)}
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
