
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Upload, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  Download,
  Eye
} from 'lucide-react';
import { mockCategories } from '@/services/mockData';
import UploadDocumentModal from './UploadDocumentModal';
import { useParams, Link } from 'react-router-dom';

// Mock documents for each category
const mockDocuments = {
  HR: [
    { 
      id: 'hr-doc1', 
      title: 'Employee Handbook 2025', 
      type: 'PDF', 
      date: '2024-04-10', 
      size: '2.4 MB',
      author: 'HR Department'
    },
    { 
      id: 'hr-doc2', 
      title: 'Benefits Overview Q1', 
      type: 'PDF',
      date: '2024-03-15', 
      size: '1.8 MB',
      author: 'HR Department'
    },
    { 
      id: 'hr-doc3', 
      title: 'Remote Work Policy', 
      type: 'PDF', 
      date: '2024-01-30', 
      size: '1.2 MB',
      author: 'HR Department'
    },
  ],
  IT: [
    { 
      id: 'it-doc1', 
      title: 'IT Security Guidelines', 
      type: 'PDF', 
      date: '2024-03-22', 
      size: '3.5 MB',
      author: 'IT Department'
    },
    { 
      id: 'it-doc2', 
      title: 'Software Request Process', 
      type: 'PDF',
      date: '2024-02-10', 
      size: '1.2 MB',
      author: 'IT Department'
    },
    { 
      id: 'it-doc3', 
      title: 'Network Access Protocol', 
      type: 'PDF', 
      date: '2024-01-15', 
      size: '2.7 MB',
      author: 'IT Department'
    },
  ],
  Finance: [
    { 
      id: 'fin-doc1', 
      title: 'Expense Reporting Guide', 
      type: 'PDF', 
      date: '2024-02-15', 
      size: '0.9 MB',
      author: 'Finance'
    },
    { 
      id: 'fin-doc2', 
      title: 'Q1 Budget Overview', 
      type: 'PDF',
      date: '2024-03-05', 
      size: '2.1 MB',
      author: 'Finance'
    },
  ],
  Legal: [
    { 
      id: 'legal-doc1', 
      title: 'Non-Disclosure Agreement', 
      type: 'PDF', 
      date: '2024-01-20', 
      size: '0.7 MB',
      author: 'Legal Department'
    },
    { 
      id: 'legal-doc2', 
      title: 'Contract Templates', 
      type: 'PDF',
      date: '2024-03-10', 
      size: '1.5 MB',
      author: 'Legal Department'
    },
  ],
  Operations: [
    { 
      id: 'ops-doc1', 
      title: 'Workplace Safety Guidelines', 
      type: 'PDF', 
      date: '2024-02-22', 
      size: '3.1 MB',
      author: 'Operations'
    },
    { 
      id: 'ops-doc2', 
      title: 'Office Procedures Manual', 
      type: 'PDF',
      date: '2024-03-30', 
      size: '4.2 MB',
      author: 'Operations'
    },
  ],
};

const CategoryView = () => {
  const { setSelectedDocument } = useAppContext();
  const [isAdmin, setIsAdmin] = useState(true); // For demo purposes
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const currentCategory = categoryId || 'HR';
  const categoryInfo = mockCategories.find(cat => cat.name === currentCategory) || { 
    name: currentCategory, 
    count: mockDocuments[currentCategory as keyof typeof mockDocuments]?.length || 0 
  };
  
  const documents = mockDocuments[currentCategory as keyof typeof mockDocuments] || [];
  
  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDocumentClick = (doc: any) => {
    // Convert to search result format and set as selected document
    setSelectedDocument({
      id: doc.id,
      title: doc.title,
      content: `This is the content of ${doc.title}`,
      source: `Uploaded by ${doc.author} on ${doc.date}`,
      tags: [doc.type, currentCategory],
      relevance: 0.95
    });
  };
  
  return (
    <div className="flex flex-col h-full px-4 md:px-8 overflow-y-auto pb-8">
      <div className="max-w-6xl mx-auto w-full py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{currentCategory}</h1>
              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                {categoryInfo.count} documents
              </span>
            </div>
            <p className="text-muted-foreground">Browse all {currentCategory} department documents</p>
          </div>
          
          {isAdmin && (
            <Button onClick={() => setUploadModalOpen(true)} className="gap-2">
              <Upload size={16} /> Upload Document
            </Button>
          )}
        </div>
        
        {/* Category Navigation */}
        <div className="mb-6 overflow-x-auto flex border-b">
          <div className="flex space-x-1 p-1">
            {Object.keys(mockDocuments).map((category) => (
              <Link 
                key={category}
                to={`/category/${category}`}
                className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
                  currentCategory === category 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "hover:bg-secondary"
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {/* Search and filters */}
          <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-background border border-border rounded-md"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter size={14} /> Filter
            </Button>
          </div>
          
          {/* Documents list */}
          <div className="divide-y divide-border">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded">
                    <FileText size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.title}</h3>
                    <div className="flex items-center text-xs text-muted-foreground gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {doc.date}
                      </span>
                      <span>{doc.type}</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDocumentClick(doc)}
                    className="gap-1"
                  >
                    <Eye size={14} /> View
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download size={14} /> Download
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredDocuments.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                  <FileText className="text-muted-foreground" size={24} />
                </div>
                <h3 className="text-lg font-medium">No documents found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery ? "Try using different keywords" : "There are no documents in this category yet"}
                </p>
                {isAdmin && !searchQuery && (
                  <Button 
                    onClick={() => setUploadModalOpen(true)}
                    className="mt-4 gap-2"
                  >
                    <Plus size={14} /> Add Document
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Upload Document Modal */}
      <UploadDocumentModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        category={currentCategory}
      />
    </div>
  );
};

export default CategoryView;
