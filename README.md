# Next.js Template

A modern Next.js template built with atomic design principles, featuring comprehensive tooling for development, testing, and code generation.

## 🚀 Features

### Architecture & Structure
- **Atomic Modular Structure** - Components organized using atomic design principles (atoms, molecules, organisms)
- **Feature-based Organization** - Code organized by features for better maintainability
- **TypeScript** - Full TypeScript support with strict configuration
- **Absolute Imports** - No relative imports, clean absolute paths using TypeScript aliases
- **Path Aliases** - Clean import paths with `@/`, `@core/`, `@features/`, `@shared/`, `@infrastructure/`

### State Management
- **Zustand** - Lightweight state management for global UI state (authentication, preferences, etc.)
- **nuqs** - Type-safe URL state management with search params synchronization
- **TanStack Query** - Server state management with caching and synchronization

### UI & Styling
- **HeroUI** - Modern React UI library with beautiful components
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library for animations

### Code Quality & Development
- **Biome** - Fast linter and formatter (replaces ESLint + Prettier)
- **TypeScript** - Static type checking
- **Automatic import organization** - Via Biome configuration

### API & Code Generation
- **Orval** - Automatic API client generation from OpenAPI/Swagger specifications
- **React Query Integration** - Generated hooks with TanStack Query
- **Type-safe API calls** - Fully typed API client with TypeScript

### Testing
- **Jest** - Unit and integration testing framework
- **Testing Library** - React component testing utilities
- **Coverage Reports** - 70% coverage threshold configured
- **jsdom Environment** - Browser-like testing environment

### Documentation & Development
- **Storybook** - Component documentation and development environment
- **Accessibility Testing** - A11y addon for Storybook
- **Component Stories** - Interactive component documentation

## 🛠 Tech Stack

- **Framework:** Next.js 15.4.3 with App Router
- **Language:** TypeScript 5
- **Package Manager:** pnpm
- **Styling:** Tailwind CSS 4, HeroUI
- **State Management:** Zustand, nuqs, TanStack Query
- **Code Quality:** Biome (linting & formatting)
- **Testing:** Jest, Testing Library
- **API Client:** Orval + Axios
- **Documentation:** Storybook
- **Animation:** Framer Motion

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── features/              # Feature-based modules
├── shared/               # Shared components and utilities
│   ├── components/       # Reusable UI components
│   │   ├── atoms/        # Basic building blocks (buttons, inputs, etc.)
│   │   ├── molecules/    # Simple combinations of atoms
│   │   └── organisms/    # Complex components with business logic
│   ├── utils/           # Utility functions and helpers
│   └── services/        # Shared business logic and API services
├── infrastructure/       # External services and configuration
│   ├── api/             # API clients and generated code
│   └── stores/          # Global state management
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended package manager)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server with Turbopack
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
# Development
pnpm dev                    # Start development server
pnpm build                  # Build for production
pnpm start                  # Start production server

# Code Quality
pnpm codestyle             # Check code style with Biome
pnpm codestyle:fix         # Fix code style issues

# API Generation
pnpm api:generate          # Generate API client from OpenAPI spec

# Testing
pnpm test                  # Run tests
pnpm test:watch           # Run tests in watch mode
pnpm test:coverage        # Run tests with coverage report

# Storybook
pnpm storybook            # Start Storybook dev server
pnpm build-storybook      # Build Storybook for production
```

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests** - Component and utility testing
- **Coverage Thresholds** - 70% minimum coverage required
- **Test Location** - Tests can be placed in `__tests__` directories or as `*.test.tsx` files

## 📖 Storybook

Component documentation and development environment:

```bash
pnpm storybook
```

Visit [http://localhost:6006](http://localhost:6006) to view component stories.

Features:
- Interactive component playground
- Accessibility testing
- Documentation generation
- Visual testing capabilities

## 🔧 Code Generation

API client generation from OpenAPI specifications:

1. Update the OpenAPI URL in `orval.config.ts`
2. Run `pnpm api:generate`
3. Generated code appears in `src/infrastructure/api/generated`

The generated client includes:
- TypeScript interfaces for all API models
- React Query hooks for each endpoint
- Axios-based HTTP client
- Full type safety

## 📋 Code Quality

### Biome Configuration

The project uses Biome for:
- **Linting** - Code quality rules and best practices
- **Formatting** - Consistent code style
- **Import Organization** - Automatic import sorting
- **Git Integration** - Respects .gitignore files

### Code Style Rules

- 2-space indentation
- Single quotes for strings
- Double quotes for JSX attributes
- Trailing commas (ES5 style)
- 100 character line width

## 🗂 State Management

### Zustand
Global UI state management with a simple, lightweight approach. Used for client-side application state like authentication, user preferences, and UI state that persists across routes.

### nuqs
Type-safe URL state management that synchronizes component state with URL search parameters, perfect for:
- Filters and search queries
- Pagination state
- Modal and dialog states
- Any state that should be shareable via URL

### TanStack Query
Server state management for:
- API data fetching and caching
- Optimistic updates
- Background refetching
- Error handling

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

```bash
pnpm build
```

### Other Platforms

The application can be deployed to any platform that supports Node.js applications.

## 🤖 Cursor AI Agent

This project includes Cursor AI agent configuration files in the `.cursor/` directory. These files contain setup rules and project-specific guidance for AI assistance. 

**It's recommended to use Cursor agents** when working on this project as they:
- Understand the project's architecture and conventions
- Follow established code patterns and best practices
- Respect the configured linting and formatting rules
- Provide context-aware suggestions aligned with the tech stack

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Biome Documentation](https://biomejs.dev/)
- [Orval Documentation](https://orval.dev/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [nuqs Documentation](https://nuqs.47ng.com/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
