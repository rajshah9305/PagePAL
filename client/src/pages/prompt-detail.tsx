import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star, User, Copy, ExternalLink } from "lucide-react";
import type { Prompt } from "@shared/schema";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import SubmitPromptModal from "@/components/submit-prompt-modal";

export default function PromptDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const { data: prompt, isLoading } = useQuery<Prompt>({
    queryKey: ["/api/prompts", id],
  });

  const copyToClipboard = async () => {
    if (prompt?.content) {
      await navigator.clipboard.writeText(prompt.content);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header onSubmitClick={() => setIsSubmitModalOpen(true)} />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-slate-500">Loading prompt...</div>
        </div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header onSubmitClick={() => setIsSubmitModalOpen(true)} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Prompt Not Found</h1>
            <p className="text-slate-600 mb-6">The prompt you're looking for doesn't exist.</p>
            <Button onClick={() => setLocation("/")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onSubmitClick={() => setIsSubmitModalOpen(true)} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button 
          onClick={() => setLocation("/")} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Prompts
        </Button>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="secondary" 
                      className={`bg-${getCategoryColor(prompt.category)}-100 text-${getCategoryColor(prompt.category)}-800`}
                    >
                      {prompt.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-slate-600 text-sm">{prompt.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-800">
                    {prompt.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {prompt.description}
                  </CardDescription>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <User className="w-4 h-4" />
                  <span>{prompt.author}</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">System Prompt</CardTitle>
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Try in ChatGPT
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 rounded-lg p-4 border">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono leading-relaxed">
                  {prompt.content}
                </pre>
              </div>
            </CardContent>
          </Card>

          {prompt.tags && prompt.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
      
      <SubmitPromptModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        categories={[]}
      />
    </div>
  );
}
