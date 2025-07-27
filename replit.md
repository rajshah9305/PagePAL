# SystemPromptHub

## Overview

SystemPromptHub is a curated platform for discovering and sharing high-quality system prompts for AI applications. The application features a modern web interface built with React and TypeScript, powered by an Express.js backend with PostgreSQL database integration through Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Comprehensive set of Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure
- **Development**: Hot reloading with tsx for development server
- **Production**: Compiled with esbuild for optimized bundle

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Migrations**: Drizzle Kit for schema management
- **Connection**: @neondatabase/serverless for serverless PostgreSQL connections

## Key Components

### Data Models
- **Prompts**: Core entity storing prompt content, metadata, and categorization
- **Categories**: Organized classification system with visual styling
- **Stats**: Application-wide statistics and metrics

### API Endpoints
- `GET /api/prompts` - Retrieve all prompts
- `GET /api/prompts/:id` - Get specific prompt by ID
- `GET /api/prompts/search/:query` - Search prompts by content
- `GET /api/prompts/category/:category` - Filter prompts by category
- `GET /api/categories` - Retrieve all categories
- `GET /api/stats` - Get application statistics

### Frontend Pages
- **Home**: Main dashboard with search, filtering, and prompt browsing
- **Prompt Detail**: Individual prompt view with copy functionality
- **404**: Error handling for unknown routes

### UI Components
- **Header**: Navigation with branding and submission controls
- **Hero Section**: Statistics display and application overview
- **Search Filters**: Category-based filtering and text search
- **Prompt Cards**: Grid-based prompt display with metadata
- **Submit Modal**: Form for contributing new prompts

## Data Flow

1. **Client Requests**: Frontend makes API calls through TanStack Query
2. **Server Processing**: Express routes handle requests and interact with storage layer
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Delivery**: JSON responses sent back to client
5. **State Management**: React Query caches and manages server state
6. **UI Updates**: React components re-render based on data changes

## External Dependencies

### Core Dependencies
- **UI Framework**: React with TypeScript support
- **Database**: Neon PostgreSQL serverless platform
- **ORM**: Drizzle ORM with Zod schema validation
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React icon library

### Development Tools
- **Build System**: Vite with React plugin
- **Type Checking**: TypeScript compiler
- **Code Quality**: ESLint and Prettier (implied by structure)
- **Development Server**: Express with Vite middleware integration

### Authentication & Sessions
- **Session Storage**: PostgreSQL-based sessions with connect-pg-simple
- **Security**: CORS and security headers (standard Express setup)

## Deployment Strategy

### Development Environment
- **Server**: `npm run dev` starts development server with hot reloading
- **Database**: Drizzle Kit for schema synchronization
- **Frontend**: Vite dev server with proxy to Express backend

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: esbuild compiles TypeScript to optimized JavaScript
- **Database**: Production PostgreSQL with environment-based configuration
- **Deployment**: Designed for serverless or container deployment

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **NODE_ENV**: Environment detection for development/production modes
- **Port Configuration**: Dynamic port assignment for deployment platforms

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout, and optimized for both development experience and production performance.