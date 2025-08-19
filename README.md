# web

A murder mystery script showcase website for browsing and exploring Chinese murder mystery party game scripts (劇本殺). The application displays script collections with detailed information including characters, storylines, game rules, and social features.

## 🎭 Features

- **Script Showcase**: Browse comprehensive murder mystery scripts with detailed character information
- **Category System**: Organized by mystery, horror, fantasy, emotion, ancient, and modern themes
- **Monthly Highlights**: Featured scripts carousel with seasonal recommendations
- **Hot Recommendations**: Popular and trending scripts with ratings
- **Responsive Design**: Optimized for mobile and desktop viewing
- **Dark Mystery Theme**: Custom UI with immersive dark color scheme
- **SEO Optimized**: Comprehensive meta tags and structured data

## 🚀 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) - Full-stack React framework
- **Router**: [TanStack React Router](https://tanstack.com/router) - File-based routing with type safety
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Styling**: Tailwind CSS with custom mystery theme
- **Icons**: Lucide React
- **Carousel**: Embla Carousel

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/playhardtw/web.git
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🛠️ Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📁 Project Structure

```
src/
├── routes/                 # File-based routing
│   ├── __root.tsx         # Root layout with SEO
│   ├── index.tsx          # Home page
│   ├── categories/        # Category system
│   └── script/            # Script detail pages
├── components/            # UI Components
│   ├── ui/                # shadcn/ui components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── ScriptCard.tsx     # Script display component
├── data/                  # Mock data and APIs
├── types/                 # TypeScript definitions
└── lib/                   # Utility functions
```

## 🎨 Design System

The project uses a custom mystery theme with:

- **Dark Color Palette**: Black, dark gray backgrounds with red and gold accents
- **Typography**: Inter and Noto Sans TC fonts for Chinese support
- **Components**: shadcn/ui components with custom mystery styling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 🌟 Key Features

### Script Management
- Comprehensive script database with rich metadata
- Character profiles with backgrounds and relationships
- Game mechanics and rules documentation
- Rating and popularity tracking

### User Experience
- Intuitive navigation with dropdown category menus
- Touch-friendly carousel interfaces
- Hover effects and smooth transitions
- Accessible design with proper ARIA labels

### Performance
- Server-side rendering with TanStack Start
- Optimized images with lazy loading
- Type-safe routing and data loading
- SEO optimization for search engines

## 🚢 Deployment

The application is built with Vite and can be deployed to any static hosting service:

```bash
npm run build
```

This creates a `dist` folder with the production build.

## 📄 License

All rights reserved © 2024 web

## 🤝 Contributing

This is a showcase project. For questions or suggestions, please open an issue on GitHub.

---

Built with ❤️ using modern React and TypeScript
