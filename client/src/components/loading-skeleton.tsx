import { Card, CardContent } from "@/components/ui/card";

interface LoadingSkeletonProps {
  count?: number;
}

export default function LoadingSkeleton({ count = 6 }: LoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 bg-slate-200 rounded-full w-24 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-12 animate-pulse"></div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="h-5 bg-slate-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse"></div>
            </div>

            <div className="flex space-x-2 mb-4">
              <div className="h-6 bg-slate-200 rounded-md w-16 animate-pulse"></div>
              <div className="h-6 bg-slate-200 rounded-md w-20 animate-pulse"></div>
              <div className="h-6 bg-slate-200 rounded-md w-14 animate-pulse"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="h-4 bg-slate-200 rounded w-20 animate-pulse"></div>
              <div className="flex space-x-2">
                <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="h-9 bg-slate-200 rounded w-full mt-4 animate-pulse"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}