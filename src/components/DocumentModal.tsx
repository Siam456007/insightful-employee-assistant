
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Download, Share2, ThumbsUp, ThumbsDown, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DocumentModalProps {
  document: {
    id: string;
    title: string;
    content: string;
    source: string;
    tags: string[];
    relevance: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

const DocumentModal: React.FC<DocumentModalProps> = ({ document, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] h-[80vh] max-h-[800px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-start justify-between">
            <div className="pr-8">
              <DialogTitle className="text-xl font-semibold mb-1">
                {document.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">{document.source}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Download size={16} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 size={16} />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X size={16} />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex flex-1 overflow-hidden">
          {/* PDF Viewer - In a real app, you'd use a PDF viewer library */}
          <div className="flex-1 bg-muted/20 overflow-auto p-4">
            <div className="bg-white shadow-lg mx-auto max-w-2xl min-h-full p-8">
              <h2 className="text-2xl font-bold mb-4">{document.title}</h2>
              <p className="mb-6">
                This is a sample document viewer. In a real application, you would integrate a PDF viewer
                library like PDF.js, react-pdf, or pspdfkit to display actual PDF content here.
              </p>
              <p className="mb-4">
                {document.content}
              </p>
              <p className="text-muted-foreground">
                Example PDF content - the real document would be displayed here when properly integrated
                with a PDF rendering library.
              </p>
            </div>
          </div>
          
          {/* Document metadata sidebar */}
          <div className="w-64 border-l border-border p-4 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Document Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {document.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="flex items-center gap-1">
                      <Tag size={12} /> {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Was this helpful?</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ThumbsUp size={14} /> Yes
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ThumbsDown size={14} /> No
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Related Documents</h3>
                <div className="space-y-2">
                  <div className="text-sm p-2 rounded hover:bg-secondary cursor-pointer">
                    Document Submission Guidelines
                  </div>
                  <div className="text-sm p-2 rounded hover:bg-secondary cursor-pointer">
                    File Format Standards
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentModal;
