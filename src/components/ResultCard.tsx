
import React from 'react';
import { FileText, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ResultCardProps {
  id: string;
  title: string;
  content: string;
  source: string;
  tags: string[];
  relevance: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, content, source, tags, relevance }) => {
  const relevancePercentage = Math.round(relevance * 100);
  
  return (
    <div className="bg-background border border-border rounded-lg p-4 hover:shadow-sm transition-shadow animate-fade-in cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-assistant" />
          <h3 className="font-medium truncate">{title}</h3>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <div className={cn(
            "w-2 h-2 rounded-full",
            relevancePercentage > 85 ? "bg-green-500" : 
            relevancePercentage > 70 ? "bg-yellow-500" : 
            "bg-orange-500"
          )}></div>
          <span className="text-muted-foreground">{relevancePercentage}% match</span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{content}</p>
      
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            <Tag size={10} className="mr-1" />
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="truncate">{source}</span>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs gap-1">
            View
          </Button>
          <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1">
            Cite
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
