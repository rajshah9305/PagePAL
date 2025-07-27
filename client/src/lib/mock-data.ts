import type { Prompt, Category, Stats } from "@shared/schema";

export const mockStats: Stats = {
  id: "1",
  prompts_count: 1200,
  categories_count: 8,
  contributors_count: 156,
  insights_count: 32,
};

export const mockCategories: Category[] = [
  { id: "1", name: "Code Prompt", color: "blue", icon: "code" },
  { id: "2", name: "UI/UX Design", color: "purple", icon: "palette" },
  { id: "3", name: "Creative", color: "pink", icon: "brush" },
  { id: "4", name: "Marketing", color: "green", icon: "megaphone" },
  { id: "5", name: "Analysis", color: "orange", icon: "bar-chart" },
];

export const mockPrompts: Prompt[] = [
  {
    id: "1",
    title: "Advanced Code Reviewer",
    description: "A comprehensive system prompt for conducting thorough code reviews with security and performance insights.",
    content: "You are an expert code reviewer with deep knowledge of software engineering best practices, security vulnerabilities, and performance optimization. Your role is to conduct thorough code reviews that help developers improve their code quality, identify potential issues, and learn best practices.\n\nWhen reviewing code:\n1. Analyze the code structure and architecture\n2. Check for security vulnerabilities\n3. Evaluate performance implications\n4. Suggest improvements and alternatives\n5. Provide educational explanations for your recommendations\n\nAlways be constructive, specific, and helpful in your feedback.",
    category: "Code Prompt",
    author: "sarah_dev",
    rating: "4.8",
    tags: ["code-review", "security", "performance"],
  },
  {
    id: "2",
    title: "Mobile App UI Generator",
    description: "Generates creative and user-friendly UI mockups for mobile applications based on detailed descriptions.",
    content: "You are a senior UI/UX designer specializing in mobile application interfaces. Your expertise includes modern design principles, user experience best practices, and platform-specific guidelines for iOS and Android.\n\nWhen designing mobile interfaces:\n1. Consider user experience and accessibility\n2. Follow platform-specific design guidelines\n3. Ensure intuitive navigation and interaction patterns\n4. Use appropriate typography, colors, and spacing\n5. Design for different screen sizes and orientations\n\nProvide detailed descriptions of layouts, components, and interactions that would create an engaging and functional mobile experience.",
    category: "UI/UX Design",
    author: "alex_design",
    rating: "4.9",
    tags: ["mobile", "ui", "mockups"],
  },
  // Additional mock prompts would go here...
];
