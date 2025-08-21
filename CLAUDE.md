# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for "玩硬劇本館" (Play Hard Script Hall), a professional script-based gaming venue. The site provides information about available scripts, booking functionality, and venue details.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production app with Turbopack  
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

Next.js 15 application using App Router with TypeScript:

- **App Structure**: `/src/app/` directory with App Router
- **Components**: `/src/components/` with UI components in `/src/components/ui/`
- **Utilities**: Helper functions in `/src/lib/`
- **Styling**: TailwindCSS v4 with custom CSS variables
- **Path Aliases**: `@/` maps to `./src/`

## Page Structure

- **Home** (`/`): Hero section, monthly recommendations carousel, features, CTA
- **Games** (`/games`): 20 mock scripts with filtering and categorization
- **Booking** (`/booking`): Reservation form with script selection and time slots
- **About** (`/about`): Company story, team info, facilities, business hours
- **Contact** (`/contact`): Contact form, location, FAQ, social media links

## Key Components

### MonthlyRecommendations
- Smart component that switches between grid (< 4 items) and carousel (≥ 4 items)
- Uses Embla Carousel with auto-scroll functionality
- Hover to pause auto-scroll, cards have scale hover effects
- Requires careful overflow management for proper hover scaling

### Navigation
- Sticky header with custom orange theme (`bg-nav-primary`)
- Responsive design with theme toggle integration
- Uses custom color variables for consistency

### Theme System
- Custom orange color scheme with white backgrounds
- Navigation uses dedicated color variables (`--nav-primary`, `--nav-primary-foreground`)
- Dark/light mode support via next-themes
- CSS variables defined in `globals.css`

## Key Dependencies

- **Next.js 15**: Framework with Turbopack
- **TypeScript**: Strict mode enabled
- **TailwindCSS v4**: Utility-first CSS with CSS variables
- **shadcn/ui**: "new-york" style components
- **Embla Carousel**: Auto-scrolling carousel with hover controls
- **next-themes**: Theme management
- **Lucide React**: Icon library

## Recommended TanStack Packages

Consider adding these TanStack packages for enhanced functionality:

- **@tanstack/react-query**: Powerful async state management and data fetching
  - `npm install @tanstack/react-query`
  - Perfect for API calls, caching, and server state management

- **@tanstack/react-form**: Type-safe, performant form management
  - `npm install @tanstack/react-form`
  - Headless form library with excellent TypeScript support

- **@tanstack/react-table**: Headless table/datagrid solution
  - `npm install @tanstack/react-table`
  - Full control over table markup and styling

- **@tanstack/react-virtual**: Virtualization for large lists
  - `npm install @tanstack/react-virtual`
  - Performance optimization for rendering large datasets

- **@tanstack/react-router**: Type-safe routing (alternative to Next.js router)
  - `npm install @tanstack/react-router`
  - Consider for complex routing needs with type safety

## Design Patterns

### Color System
- Navigation uses custom orange theme variables for consistency
- Main content areas use white backgrounds with original shadcn/ui colors
- CSS variables in `globals.css` define the custom orange navigation theme
- Always use existing color variables rather than custom colors

### Spacing Strategy
- Section spacing uses `py-12` to `py-16` for consistent vertical rhythm
- Component-level spacing managed carefully to accommodate hover effects
- Navigation has `h-16` and `px-6` for comfortable touch targets

### Carousel Implementation
- MonthlyRecommendations switches behavior based on item count
- Auto-scroll with hover pause for better UX
- Overflow management critical for proper hover scaling effects
- Uses `overflow: visible` for containers to prevent clipping

## Development Notes

- Keep spacing consistent across sections using established patterns
- When adding hover effects, ensure adequate container spacing
- Use semantic color variables rather than hardcoded values
- Test carousel behavior with different item counts (< 4 vs ≥ 4)
- Navigation and theme toggle should maintain orange color consistency