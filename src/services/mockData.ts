export const mockCategories = [
  { name: "HR", count: 28 },
  { name: "IT", count: 15 },
  { name: "Finance", count: 8 },
  { name: "Legal", count: 5 },
  { name: "Operations", count: 12 },
];

export const mockSearchResults = [
  {
    id: "1",
    title: "Employee Handbook 2024",
    content:
      "Comprehensive guide for all employees covering policies, benefits, and expectations.",
    source: "HR Department",
    tags: ["HR", "Policy", "Handbook"],
    relevance: 0.92,
  },
  {
    id: "2",
    title: "Remote Work Policy",
    content: "Guidelines and procedures for employees working remotely.",
    source: "HR Department",
    tags: ["HR", "Remote Work", "Policy"],
    relevance: 0.85,
  },
  {
    id: "3",
    title: "IT Security Best Practices",
    content:
      "Best practices for maintaining IT security and protecting company data.",
    source: "IT Department",
    tags: ["IT", "Security", "Best Practices"],
    relevance: 0.95,
  },
  {
    id: "4",
    title: "Expense Reporting Guidelines",
    content:
      "Instructions for submitting expense reports and reimbursement requests.",
    source: "Finance Department",
    tags: ["Finance", "Expense", "Reporting"],
    relevance: 0.88,
  },
  {
    id: "5",
    title: "Legal Compliance Guide",
    content: "Overview of legal compliance requirements for the company.",
    source: "Legal Department",
    tags: ["Legal", "Compliance", "Guide"],
    relevance: 0.9,
  },
];

export const mockRecentSearches = [
  "benefits package",
  "vacation policy",
  "how to submit expenses",
  "accessing company vpn",
  "maternity leave",
];

// Add mockDocument for recent searches
export const mockRecentDocument = {
  id: "recent-doc-1",
  title: "Employee Benefits Overview 2025",
  content:
    "This document provides a comprehensive overview of employee benefits for the year 2025, including health insurance options, retirement plans, vacation policies, and additional perks.",
  source: "HR Department",
  tags: ["Benefits", "HR", "2025"],
  relevance: 0.95,
};

export const searchDocuments = async (query: string): Promise<unknown[]> => {
  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase();
  const filteredResults = mockSearchResults.filter(
    (result) =>
      result.title.toLowerCase().includes(normalizedQuery) ||
      result.content.toLowerCase().includes(normalizedQuery) ||
      result.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
  );

  return filteredResults;
};

export const generateChatResponse = async (
  message: string
): Promise<string> => {
  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simple mock response based on the message
  return `I understand you're asking about "${message}". Here's a helpful response based on our company knowledge base.`;
};
