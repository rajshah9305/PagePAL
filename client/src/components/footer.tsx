import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-indigo-600" />
            <span className="text-slate-600 font-medium">SystemPromptHub</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-700 transition-colors">About</a>
            <a href="#" className="hover:text-slate-700 transition-colors">API</a>
            <a href="#" className="hover:text-slate-700 transition-colors">GitHub</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
