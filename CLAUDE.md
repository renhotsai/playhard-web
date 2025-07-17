# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build production application

## Project Overview

This is **PlayHard 劇本殺**, a murder mystery script showcase website for browsing and exploring Chinese murder mystery party game scripts (劇本殺). The application displays script collections with detailed information including characters, storylines, game rules, and social features.

## Project Architecture

Built with **TanStack React Router** and **TanStack Start** for full-stack capabilities, using **React 19** and **TypeScript** with **Vite** as the build tool.

### Key Technologies
- **TanStack React Router**: File-based routing with type-safe navigation
- **TanStack Start**: Full-stack React framework with server functions
- **React 19**: Latest React version with modern features
- **TypeScript**: Strict typing with comprehensive compiler options
- **Vite**: Development server and build tool
- **shadcn/ui**: Modern component library built on Radix UI and Tailwind CSS
- **Tailwind CSS**: Utility-first CSS framework with custom mystery theme
- **Lucide React**: Modern icon library for UI components
- **Embla Carousel**: Touch-friendly carousel component for shadcn/ui

### Project Structure

```
src/
├── routes/                 # File-based routing
│   ├── __root.tsx         # Root layout component
│   ├── index.tsx          # Home page with script showcases
│   ├── about/index.tsx    # About page
│   ├── contact/index.tsx  # Contact page
│   └── script/
│       └── $id.tsx        # Dynamic script detail pages
├── components/            # UI Components
│   ├── ui/                # shadcn/ui components (Card, Button, Badge, Separator, Carousel)
│   ├── ScriptCard.tsx     # Reusable script card component using shadcn/ui
│   ├── MonthlyScripts.tsx # Monthly scripts carousel with navigation
│   └── HotRecommendations.tsx # Hot/popular scripts with shadcn/ui Carousel
├── data/                  # Data layer
│   └── mockScripts.ts     # Mock murder mystery script data
├── types/                 # TypeScript type definitions
│   └── script.ts          # Core domain types (Script, Character, etc.)
├── lib/                   # Utility functions
│   └── utils.ts           # shadcn/ui utility functions (cn helper)
├── router.tsx             # Router configuration
├── routeTree.gen.ts       # Auto-generated route tree (DO NOT EDIT)
├── main.ts                # Application entry point
├── globals.css            # Global styles with shadcn/ui and mystery theme
└── style.css              # Legacy styles (consider consolidating)
```

### Domain Model

The application centers around **murder mystery scripts** with rich data modeling:

**Core Entities:**
- `Script`: Complete script with metadata, characters, rules, and story
- `Character`: Individual character roles with backgrounds, secrets, and goals
- `ScriptCard`: Simplified script view for browsing interfaces

**Key Script Properties:**
- Player count range (`playerCount.min`/`playerCount.max`)
- Duration in minutes, difficulty level, and category
- Rating system with favorites and play counts
- Detailed character information and relationships
- Game rules, requirements, and gameplay tips
- Chinese language content throughout

### Routing System

File-based routing with TanStack Router:
- `/` - Home page with monthly scripts and hot recommendations
- `/script/$id` - Dynamic script detail pages with comprehensive information
- `/about/` and `/contact/` - Basic informational pages
- Route tree automatically generated in `routeTree.gen.ts`
- Error handling for missing scripts with custom error components

### Data Architecture

- Mock data in `src/data/mockScripts.ts` with 8 sample scripts
- Helper functions: `getMonthlyScripts()`, `getHotScripts()`, `getScriptById()`
- Server-side data loading using route loaders (not `createServerFn`)
- Type-safe interfaces define the murder mystery domain

### UI Architecture

- **shadcn/ui component system** with Radix UI primitives and Tailwind CSS
- **Dark mystery theme** with custom CSS variables (black/red/gold color scheme)
- **Modern card-based design** with hover effects and smooth transitions
- **Responsive grid layouts** with Tailwind's responsive classes
- **Accessible components** with proper ARIA labels and keyboard navigation
- **Lucide React icons** for consistent iconography
- **Badge system** for status indicators (新/熱), categories, and rankings
- **Button variants** with custom mystery theme colors
- **Typography hierarchy** with proper text sizing and colors

### TypeScript Configuration

- Strict TypeScript with comprehensive linting rules
- JSX configured for React 19
- Module resolution set to "bundler" for Vite compatibility
- Type-safe routing with auto-generated route types
- Import type-only syntax required due to `verbatimModuleSyntax`

### Development Notes

- Development server typically runs on port 3000 (may auto-increment if occupied)
- Route generation happens automatically - never edit `routeTree.gen.ts`
- Server functions replaced with direct loader implementations for simpler data loading
- All routes inherit from the root layout in `__root.tsx`
- Use `Link` component with `params` object for dynamic routing (not template strings)

### shadcn/ui Integration

- Components located in `src/components/ui/` directory
- Custom utility function `cn()` in `src/lib/utils.ts` for conditional styling
- Tailwind configuration with custom mystery theme colors
- PostCSS setup with `@tailwindcss/postcss` plugin
- Global styles in `src/globals.css` with CSS variables for theming
- Path aliases configured for `@/` but use relative imports for reliability

### Component Usage Patterns

- Use `Card`, `CardHeader`, `CardTitle`, `CardContent` for content sections
- Apply `Badge` with custom variants for status and category indicators
- Implement `Button` with mystery theme colors and hover effects
- Use `Separator` for visual content division
- Apply `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselNext`, `CarouselPrevious` for touch-friendly content navigation
- Import components with relative paths (e.g., `'./ui/card'` or `'../../components/ui/card'`)
- Apply custom mystery theme classes: `text-mystery-text-primary`, `bg-mystery-bg-card`, etc.

### Carousel Implementation Notes

- Hot recommendations section uses shadcn/ui Carousel with Embla Carousel engine
- Responsive design: 1 column on mobile, 2 on tablet, 3 on desktop (`md:basis-1/2 lg:basis-1/3`)
- Loop enabled for continuous navigation
- Desktop: Navigation arrows visible, positioned outside carousel (-left-12, -right-12)
- Mobile: Navigation arrows hidden, swipe gestures enabled with user guidance text
- Custom styling with mystery theme colors for navigation buttons