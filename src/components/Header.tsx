import React from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { cn } from '../lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Separator } from './ui/separator'
import { BookOpen, Star, FolderOpen, ChevronDown } from 'lucide-react'
import { mockScripts } from '../data/mockScripts'
import { formatCategoryForDropdown } from '../lib/category'

interface HeaderProps {
  title?: string
  subtitle?: string
  showStats?: boolean
  totalScripts?: number
  hotScripts?: number
  className?: string
}

export const Header: React.FC<HeaderProps> = ({
  title = 'web',
  subtitle = '沉浸式體驗，探索無盡的劇本世界',
  showStats = false,
  totalScripts = 0,
  hotScripts = 0,
  className = ''
}) => {
  const categories = formatCategoryForDropdown(mockScripts)
  const navigate = useNavigate()

  const handleCategoryNavigation = (category: string) => {
    // Navigate to category page
    navigate({ to: '/categories/$category', params: { category } })
  }

  return (
    <header className={cn(
      "relative py-8 text-center overflow-hidden bg-gradient-to-br from-mystery-bg-primary to-mystery-bg-secondary",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-b from-mystery-accent-primary/20 to-transparent"></div>
      <div className="relative container mx-auto px-4">
        

        {/* Hero Section */}
        <Link to="/" className="inline-block" aria-label="回到首頁">
          <h1 className="text-4xl md:text-6xl font-bold text-mystery-text-primary mb-4 animate-glow hover:scale-105 transition-transform duration-300">
            {title}
          </h1>
        </Link>
        <p className="text-lg md:text-xl text-mystery-text-secondary mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Statistics Section */}
        {showStats && (
          <div className="flex justify-center mb-8">
            <div className="flex flex-row items-center gap-2 sm:gap-4 md:gap-6 bg-mystery-bg-card/40 backdrop-blur-sm rounded-lg px-3 sm:px-6 md:px-8 py-4 max-w-5xl">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-mystery-accent-gold" />
                <span className="text-xs sm:text-sm text-mystery-text-secondary">總劇本</span>
                <div 
                  className="bg-mystery-accent-gold/20 text-mystery-text-primary text-xs sm:text-sm px-1 sm:px-2 rounded-md inline-flex items-center justify-center"
                >
                  {totalScripts}
                </div>
              </div>
              <Separator orientation="vertical" className="h-4 sm:h-6 bg-mystery-accent-gold/20" />
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-mystery-accent-gold" />
                <span className="text-xs sm:text-sm text-mystery-text-secondary">熱門推薦</span>
                <div 
                  className="bg-mystery-accent-gold/20 text-mystery-text-primary text-xs sm:text-sm px-1 sm:px-2 rounded-md inline-flex items-center justify-center"
                >
                  {hotScripts}
                </div>
              </div>
              <Separator orientation="vertical" className="h-4 sm:h-6 bg-mystery-accent-gold/20" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div 
                    className="flex items-center space-x-1 sm:space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
                    aria-label="開啟劇本分類選單"
                  >
                    <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5 text-mystery-accent-gold" />
                    <span className="text-xs sm:text-sm text-mystery-text-secondary">劇本</span>
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-mystery-text-secondary" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 sm:w-64 bg-mystery-bg-card shadow-lg"
                  aria-label="劇本分類選單"
                >
                  <DropdownMenuLabel className="text-mystery-text-primary font-semibold text-sm px-3 py-2">
                    劇本分類
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-mystery-accent-gold/20" />
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category.key}
                      onClick={() => handleCategoryNavigation(category.key)}
                      className="flex items-center justify-between px-3 py-2.5 hover:bg-mystery-accent-gold/10 transition-colors cursor-pointer"
                      aria-label={`瀏覽${category.label}分類，共${category.count}個劇本`}
                    >
                      <span className="text-mystery-text-primary font-medium text-sm">
                        {category.label}
                      </span>
                      <div 
                        className="ml-2 bg-mystery-accent-gold/15 text-mystery-text-primary text-xs px-2 py-0.5 font-medium rounded-md inline-flex items-center justify-center min-w-6 text-center"
                      >
                        {category.count}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}

      </div>
    </header>
  )
}