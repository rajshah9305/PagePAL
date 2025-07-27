import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Prompt, Category, Stats } from "@shared/schema";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import SearchFilters from "@/components/search-filters";
import PromptCard from "@/components/prompt-card";
import LoadingSkeleton from "@/components/loading-skeleton";
import SubmitPromptModal from "@/components/submit-prompt-modal";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [visiblePrompts, setVisiblePrompts] = useState(9);
  const [sortBy, setSortBy] = useState("rating"); // rating, newest, popular

  const { data: prompts = [], isLoading: promptsLoading, error: promptsError } = useQuery<Prompt[]>({
    queryKey: ["/api/prompts"],
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    retry: 3,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
    retry: 3,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  const filteredAndSortedPrompts = useMemo(() => {
    let filtered = prompts.filter((prompt) => {
      const matchesSearch = searchQuery === "" || 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        prompt.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort prompts
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case "newest":
        filtered.sort((a, b) => a.title.localeCompare(b.title)); // Placeholder sort
        break;
      case "popular":
        filtered.sort((a, b) => b.title.length - a.title.length); // Placeholder sort
        break;
      default:
        break;
    }

    return filtered;
  }, [prompts, searchQuery, selectedCategory, sortBy]);

  const displayedPrompts = filteredAndSortedPrompts.slice(0, visiblePrompts);

  const loadMore = () => {
    setVisiblePrompts(prev => prev + 6);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setVisiblePrompts(9);
  };

  const isLoading = promptsLoading || categoriesLoading;

  if (promptsError) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header onSubmitClick={() => setIsSubmitModalOpen(true)} />
        <div className="flex items-center justify-center h-64">
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load prompts. Please refresh the page or try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header onSubmitClick={() => setIsSubmitModalOpen(true)} />
        <HeroSection stats={stats} />
        <main className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-10">
              <div className="h-16 bg-slate-200 rounded-2xl animate-pulse mb-8"></div>
              <div className="flex space-x-3 mb-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-10 bg-slate-200 rounded-xl w-24 animate-pulse"></div>
                ))}
              </div>
            </div>
            <LoadingSkeleton count={9} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onSubmitClick={() => setIsSubmitModalOpen(true)} />
      
      <HeroSection stats={stats} />
      
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />

          {/* Results summary and sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div className="text-slate-600">
              <span className="font-medium">{filteredAndSortedPrompts.length}</span> prompts found
              {searchQuery && (
                <span className="ml-2">
                  for "<span className="font-medium">{searchQuery}</span>"
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
              
              {(searchQuery || selectedCategory !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="text-slate-600"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="promptGrid">
            {displayedPrompts.map((prompt, index) => (
              <div
                key={prompt.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PromptCard prompt={prompt} />
              </div>
            ))}
          </div>

          {displayedPrompts.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <div className="text-slate-500 text-xl font-medium mb-2">No prompts found</div>
              <div className="text-slate-400 text-base mb-6">
                Try adjusting your search terms or selecting a different category
              </div>
              <Button onClick={resetFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}

          {visiblePrompts < filteredAndSortedPrompts.length && (
            <div className="text-center mt-12">
              <Button
                onClick={loadMore}
                variant="outline"
                className="inline-flex items-center space-x-2 px-8 py-3 text-base font-medium rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <span>Load More Prompts ({filteredAndSortedPrompts.length - visiblePrompts} remaining)</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Quick stats */}
          {prompts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-800">{prompts.length}</div>
                  <div className="text-sm text-slate-500">Total Prompts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{categories.length}</div>
                  <div className="text-sm text-slate-500">Categories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {(prompts.reduce((sum, p) => sum + parseFloat(p.rating), 0) / prompts.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-500">Avg Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {new Set(prompts.map(p => p.author)).size}
                  </div>
                  <div className="text-sm text-slate-500">Contributors</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      
      <SubmitPromptModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        categories={categories}
      />
    </div>
  );
}
