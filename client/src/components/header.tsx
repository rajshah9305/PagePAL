import { Zap, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSubmitClick: () => void;
}

export default function Header({ onSubmitClick }: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Zap className="w-7 h-7 text-indigo-600" />
            <h1 className="text-2xl font-bold text-slate-800">SystemPromptHub</h1>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <Button onClick={onSubmitClick} className="inline-flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl">
              <Plus className="w-4 h-4" />
              <span>Submit Prompt</span>
            </Button>
            <Button variant="outline" className="inline-flex items-center space-x-2 px-4 py-2.5 border border-slate-300 text-sm font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50">
              <Star className="w-4 h-4 text-slate-500" />
              <span>Star on GitHub</span>
            </Button>
          </div>
          <Button onClick={onSubmitClick} className="sm:hidden inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg">
            <Plus className="w-4 h-4" />
            <span>Submit</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
