import { Star, User } from "lucide-react";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Prompt } from "@shared/schema";

interface PromptCardProps {
  prompt: Prompt;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [, setLocation] = useLocation();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Code Prompt": return "blue";
      case "UI/UX Design": return "purple";
      case "Creative": return "pink";
      case "Marketing": return "green";
      case "Analysis": return "orange";
      default: return "gray";
    }
  };

  const getBorderColor = (category: string) => {
    switch (category) {
      case "Code Prompt": return "border-t-blue-500";
      case "UI/UX Design": return "border-t-purple-500";
      case "Creative": return "border-t-pink-500";
      case "Marketing": return "border-t-green-500";
      case "Analysis": return "border-t-orange-500";
      default: return "border-t-gray-500";
    }
  };

  const handleViewDetails = () => {
    setLocation(`/prompt/${prompt.id}`);
  };

  return (
    <Card className={`bg-white border border-slate-200 rounded-2xl shadow-sm card-transition overflow-hidden border-t-4 ${getBorderColor(prompt.category)}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge 
            variant="secondary"
            className={`bg-${getCategoryColor(prompt.category)}-100 text-${getCategoryColor(prompt.category)}-800 px-3 py-1.5 text-sm font-semibold`}
          >
            {prompt.category}
          </Badge>
          <div className="flex items-center space-x-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold text-slate-600 text-sm">{prompt.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-3">{prompt.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">{prompt.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <User className="w-3 h-3" />
            <span>{prompt.author}</span>
          </div>
          <Button 
            onClick={handleViewDetails}
            variant="link"
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium p-0"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
