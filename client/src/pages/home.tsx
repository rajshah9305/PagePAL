import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Prompt, Category, Stats } from "@shared/schema";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import SearchFilters from "@/components/search-filters";
import PromptCard from "@/components/prompt-card";
import SubmitPromptModal from "@/components/submit-prompt-modal";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [visiblePrompts, setVisiblePrompts] = useState(9);

  const { data: prompts = [], isLoading: promptsLoading } = useQuery<Prompt[]>({
    queryKey: ["/api/prompts"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch = searchQuery === "" || 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const displayedPrompts = filteredPrompts.slice(0, visiblePrompts);

  const loadMore = () => {
    setVisiblePrompts(prev => prev + 6);
  };

  if (promptsLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header onSubmitClick={() => setIsSubmitModalOpen(true)} />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-slate-500">Loading prompts...</div>
        </div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="promptGrid">
            {displayedPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>

          {displayedPrompts.length === 0 && !promptsLoading && (
            <div className="text-center py-12">
              <div className="text-slate-500 text-lg">No prompts found matching your criteria</div>
              <div className="text-slate-400 text-sm mt-2">Try adjusting your search or category filters</div>
            </div>
          )}

          {visiblePrompts < filteredPrompts.length && (
            <div className="text-center mt-12">
              <Button
                onClick={loadMore}
                variant="outline"
                className="inline-flex items-center space-x-2 px-8 py-3 text-base font-medium rounded-xl shadow-sm"
              >
                <span>Load More Prompts</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
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
