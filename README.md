# SystemPromptHub

A modern, production-ready platform for discovering and sharing high-quality system prompts for AI applications.

![SystemPromptHub](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Express](https://img.shields.io/badge/Express-4.21-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)

## ✨ Features

- **Curated Prompt Library**: Browse high-quality system prompts organized by category
- **Advanced Search**: Filter by keywords, categories, authors, and tags
- **Interactive Cards**: Like, copy, and export prompts with one click
- **Real-time Statistics**: Live metrics and analytics on usage
- **Community Driven**: Submit and share your own prompts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean interface with smooth animations and micro-interactions

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** + **shadcn/ui** for styling
- **TanStack Query** for server state management
- **Wouter** for lightweight routing

### Backend
- **Node.js** + **Express.js** with TypeScript
- **PostgreSQL** with **Drizzle ORM**
- **Zod** for schema validation
- **Express Sessions** for authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (or Neon account)

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
   
   Edit `.env` with your database URL:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=development
   PORT=5000
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5000](http://localhost:5000) in your browser.

## 🗃 Database Setup

### Option 1: Neon (Recommended)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new database
3. Copy the connection string to your `.env` file

### Option 2: Local PostgreSQL
1. Install PostgreSQL locally
2. Create a database:
   ```bash
   createdb systemprompts
   ```
3. Update `.env` with your local connection string:
   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/systemprompts
   ```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reloading |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run check` | TypeScript type checking |
| `npm run db:push` | Push database schema changes |
| `npm run db:generate` | Generate database migrations |

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add `DATABASE_URL` environment variable
   - Deploy automatically

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
   ```bash
   export NODE_ENV=production
   export DATABASE_URL=your_production_database_url
   ```

3. **Start the production server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utilities
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database layer
│   └── db.ts              # Database connection
├── shared/                # Shared types
│   └── schema.ts          # Database schema
└── package.json           # Dependencies
```

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/prompts` | GET | Retrieve all prompts |
| `/api/prompts/:id` | GET | Get specific prompt |
| `/api/prompts` | POST | Create new prompt |
| `/api/prompts/search/:query` | GET | Search prompts |
| `/api/prompts/category/:category` | GET | Filter by category |
| `/api/categories` | GET | Get all categories |
| `/api/stats` | GET | Get application statistics |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Inspired by the AI development community's need for quality prompts
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

**SystemPromptHub** - Empowering AI applications with curated, high-quality system prompts.
