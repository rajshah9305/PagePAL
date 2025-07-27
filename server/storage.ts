import { type Prompt, type InsertPrompt, type Category, type InsertCategory, type Stats, type InsertStats } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Prompts
  getPrompts(): Promise<Prompt[]>;
  getPrompt(id: string): Promise<Prompt | undefined>;
  createPrompt(prompt: InsertPrompt): Promise<Prompt>;
  searchPrompts(query: string): Promise<Prompt[]>;
  getPromptsByCategory(category: string): Promise<Prompt[]>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  
  // Stats
  getStats(): Promise<Stats>;
}

export class MemStorage implements IStorage {
  private prompts: Map<string, Prompt>;
  private categories: Map<string, Category>;
  private stats: Stats;

  constructor() {
    this.prompts = new Map();
    this.categories = new Map();
    this.stats = {
      id: randomUUID(),
      prompts_count: 1200,
      categories_count: 8,
      contributors_count: 156,
      insights_count: 32,
    };
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categoriesData: InsertCategory[] = [
      { name: "Code Prompt", color: "blue", icon: "code" },
      { name: "UI/UX Design", color: "purple", icon: "palette" },
      { name: "Creative", color: "pink", icon: "brush" },
      { name: "Marketing", color: "green", icon: "megaphone" },
      { name: "Analysis", color: "orange", icon: "bar-chart" },
    ];

    categoriesData.forEach(cat => {
      const id = randomUUID();
      this.categories.set(id, { ...cat, id });
    });

    // Initialize prompts
    const promptsData: InsertPrompt[] = [
      {
        title: "Advanced Code Reviewer",
        description: "A comprehensive system prompt for conducting thorough code reviews with security and performance insights.",
        content: "You are an expert code reviewer with deep knowledge of software engineering best practices...",
        category: "Code Prompt",
        author: "sarah_dev",
        rating: "4.8",
        tags: ["code-review", "security", "performance"],
      },
      {
        title: "Mobile App UI Generator",
        description: "Generates creative and user-friendly UI mockups for mobile applications based on detailed descriptions.",
        content: "You are a senior UI/UX designer specializing in mobile application interfaces...",
        category: "UI/UX Design",
        author: "alex_design",
        rating: "4.9",
        tags: ["mobile", "ui", "mockups"],
      },
      {
        title: "Storytelling Assistant",
        description: "Helps craft compelling narratives, develop characters, and overcome writer's block with creative suggestions.",
        content: "You are a professional storytelling assistant with expertise in narrative structure...",
        category: "Creative",
        author: "maria_writer",
        rating: "4.7",
        tags: ["storytelling", "creative-writing", "characters"],
      },
      {
        title: "Python Data Analyst",
        description: "Generates Python code for data cleaning, analysis, and visualization using Pandas and Matplotlib libraries.",
        content: "You are a senior data analyst and Python expert specializing in data manipulation...",
        category: "Code Prompt",
        author: "data_mike",
        rating: "4.9",
        tags: ["python", "data-analysis", "pandas"],
      },
      {
        title: "Social Media Post Generator",
        description: "Crafts engaging posts for various social media platforms, complete with hashtags and compelling calls to action.",
        content: "You are a social media marketing expert with deep understanding of platform-specific content...",
        category: "Marketing",
        author: "social_jenny",
        rating: "4.8",
        tags: ["social-media", "marketing", "engagement"],
      },
      {
        title: "Business Report Analyzer",
        description: "Analyzes complex business reports and extracts key insights, trends, and actionable recommendations.",
        content: "You are a senior business analyst with expertise in interpreting complex business data...",
        category: "Analysis",
        author: "biz_analyst",
        rating: "4.6",
        tags: ["business-analysis", "reports", "insights"],
      },
      {
        title: "Landing Page Copywriter",
        description: "Creates compelling headlines and conversion-focused copy for website landing pages and marketing campaigns.",
        content: "You are an expert copywriter specializing in high-converting landing page content...",
        category: "UI/UX Design",
        author: "copy_master",
        rating: "4.5",
        tags: ["copywriting", "landing-pages", "conversion"],
      },
      {
        title: "API Documentation Writer",
        description: "Generates comprehensive API documentation with examples, use cases, and implementation guidelines.",
        content: "You are a technical writer specializing in API documentation and developer experience...",
        category: "Code Prompt",
        author: "doc_writer",
        rating: "4.7",
        tags: ["api", "documentation", "technical-writing"],
      },
      {
        title: "Brand Voice Generator",
        description: "Develops consistent brand voice and tone guidelines for marketing materials and communication strategies.",
        content: "You are a brand strategist and voice expert specializing in developing authentic brand personalities...",
        category: "Creative",
        author: "brand_guru",
        rating: "4.8",
        tags: ["branding", "voice", "strategy"],
      },
    ];

    promptsData.forEach(prompt => {
      const id = randomUUID();
      this.prompts.set(id, { ...prompt, id });
    });

    this.stats.prompts_count = this.prompts.size;
  }

  async getPrompts(): Promise<Prompt[]> {
    return Array.from(this.prompts.values());
  }

  async getPrompt(id: string): Promise<Prompt | undefined> {
    return this.prompts.get(id);
  }

  async createPrompt(insertPrompt: InsertPrompt): Promise<Prompt> {
    const id = randomUUID();
    const prompt: Prompt = { ...insertPrompt, id };
    this.prompts.set(id, prompt);
    this.stats.prompts_count = this.prompts.size;
    return prompt;
  }

  async searchPrompts(query: string): Promise<Prompt[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.prompts.values()).filter(
      (prompt) =>
        prompt.title.toLowerCase().includes(searchTerm) ||
        prompt.description.toLowerCase().includes(searchTerm) ||
        prompt.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  async getPromptsByCategory(category: string): Promise<Prompt[]> {
    return Array.from(this.prompts.values()).filter(
      (prompt) => prompt.category === category
    );
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getStats(): Promise<Stats> {
    return this.stats;
  }
}

export const storage = new MemStorage();
