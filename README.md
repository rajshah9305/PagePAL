# SystemPromptHub

A modern, production-ready platform for discovering and sharing high-quality system prompts for AI applications.

## 🚀 Features

### Core Features
- **Curated Prompt Library**: Browse high-quality system prompts organized by category
- **Advanced Search**: Filter by keywords, categories, authors, and tags
- **Interactive Cards**: Like, copy, and export prompts with one click
- **Real-time Statistics**: Live metrics and analytics on usage
- **Community Driven**: Submit and share your own prompts

### Production-Ready
- **Error Boundaries**: Graceful error handling throughout the application
- **Loading States**: Skeleton screens and optimized loading experiences
- **Database Integration**: PostgreSQL with Drizzle ORM for reliable data persistence
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Performance Optimized**: Fast loading with caching and query optimization

### Modern UI/UX
- **Animated Hero Section**: Eye-catching statistics with smooth animations
- **Gradient Backgrounds**: Professional dark hero with clean white content areas
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Category-Based Styling**: Color-coded prompts by category for easy identification
- **Advanced Filtering**: Sort by rating, popularity, or newest additions

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized production builds
- **Tailwind CSS** with shadcn/ui components for consistent design
- **TanStack Query** for efficient server state management
- **Wouter** for lightweight client-side routing

### Backend
- **Node.js** with Express.js framework
- **TypeScript** with ES modules for modern development
- **PostgreSQL** with Neon serverless integration
- **Drizzle ORM** for type-safe database operations

### Development Tools
- **Hot Reloading** with Vite and tsx
- **ESBuild** for optimized production compilation
- **Drizzle Kit** for database schema management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/system-prompt-hub.git
   cd system-prompt-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your database URL:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and configurations
│   │   ├── pages/          # Page components and routing
│   │   └── index.css       # Global styles and Tailwind imports
├── server/                 # Backend Express application
│   ├── db.ts              # Database connection setup
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route definitions
│   └── storage.ts         # Data access layer
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema and TypeScript types
└── package.json           # Dependencies and scripts
```

## 🗃 Database Schema

The application uses PostgreSQL with the following main entities:

- **Prompts**: Core prompt data with content, metadata, and categorization
- **Categories**: Organized classification system with visual styling
- **Stats**: Application-wide statistics and metrics

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/prompts` | GET | Retrieve all prompts |
| `/api/prompts/:id` | GET | Get specific prompt by ID |
| `/api/prompts/search/:query` | GET | Search prompts by content |
| `/api/prompts/category/:category` | GET | Filter prompts by category |
| `/api/categories` | GET | Retrieve all categories |
| `/api/stats` | GET | Get application statistics |

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Configure environment variables** in the Vercel dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string
3. **Deploy** - Vercel will automatically detect the configuration

The project includes `vercel.json` for optimal deployment settings.

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port (default: 5000) | No |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Development Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reloading |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run db:push` | Push database schema changes |
| `npm run db:generate` | Generate database migrations |

## 🎨 Design System

The application uses a consistent design system with:

- **Color Palette**: Professional blue and slate tones with accent colors
- **Typography**: Inter font family for clean readability
- **Spacing**: 8px grid system for consistent layouts
- **Components**: shadcn/ui component library for accessibility and consistency

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Inspired by the AI development community's need for quality prompts
- Designed for developers, by developers

---

**SystemPromptHub** - Empowering AI applications with curated, high-quality system prompts.