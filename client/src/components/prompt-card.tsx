import { useState } from "react";
import { Star, User, Copy, ExternalLink, Heart, Eye } from "lucide-react";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Prompt } from "@shared/schema";

interface PromptCardProps {
  prompt: Prompt;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [, setLocation] = useLocation();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);
  const [views] = useState(Math.floor(Math.random() * 500) + 100);
  const { toast } = useToast();

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

  const getGradientColor = (category: string) => {
    switch (category) {
      case "Code Prompt": return "from-blue-500/10 to-blue-600/5";
      case "UI/UX Design": return "from-purple-500/10 to-purple-600/5";
      case "Creative": return "from-pink-500/10 to-pink-600/5";
      case "Marketing": return "from-green-500/10 to-green-600/5";
      case "Analysis": return "from-orange-500/10 to-orange-600/5";
      default: return "from-gray-500/10 to-gray-600/5";
    }
  };

  const handleViewDetails = () => {
    setLocation(`/prompt/${prompt.id}`);
  };

  const handleCopyPrompt = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.content);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy prompt",
        variant: "destructive",
      });
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleTryInChatGPT = (e: React.MouseEvent) => {
    e.stopPropagation();
    const chatGPTUrl = `https://chat.openai.com/`;
    window.open(chatGPTUrl, '_blank');
    toast({
      title: "Opening ChatGPT",
      description: "Copy the prompt from the detail page to use it",
    });
  };

  return (
    <Card className={`group bg-white border border-slate-200 rounded-2xl shadow-sm card-transition overflow-hidden border-t-4 ${getBorderColor(prompt.category)} hover:shadow-xl cursor-pointer relative`}>
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColor(prompt.category)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <CardContent className="p-6 relative z-10" onClick={handleViewDetails}>
        <div className="flex justify-between items-start mb-4">
          <Badge 
            variant="secondary"
            className={`bg-${getCategoryColor(prompt.category)}-100 text-${getCategoryColor(prompt.category)}-800 px-3 py-1.5 text-sm font-semibold group-hover:bg-${getCategoryColor(prompt.category)}-200 transition-colors duration-300`}
          >
            {prompt.category}
          </Badge>
          <div className="flex items-center space-x-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold text-slate-600 text-sm">{prompt.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-300">
          {prompt.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-slate-700 transition-colors duration-300">
          {prompt.description}
        </p>

        {/* Tags */}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {prompt.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-md group-hover:bg-slate-200 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
            {prompt.tags.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-md">
                +{prompt.tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-slate-500">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{prompt.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{views}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLike}
              className={`h-8 w-8 p-0 ${isLiked ? 'text-red-500' : 'text-slate-400'} hover:text-red-500 transition-colors duration-300`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <span className="text-xs text-slate-500">{likes}</span>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopyPrompt}
              className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600 transition-colors duration-300"
            >
              <Copy className="w-4 h-4" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={handleTryInChatGPT}
              className="h-8 w-8 p-0 text-slate-400 hover:text-green-600 transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* View Details Button - appears on hover */}
        <Button 
          variant="outline"
          className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          onClick={handleViewDetails}
        >
          View Full Prompt
        </Button>
      </CardContent>
    </Card>
  );
}
