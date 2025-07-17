import React from 'react'
import { Link } from '@tanstack/react-router'
import { cn } from '../lib/utils'

interface HeaderProps {
  title?: string
  subtitle?: string
  showStats?: boolean
  totalScripts?: number
  hotScripts?: number
  className?: string
}

export const Header: React.FC<HeaderProps> = ({
  title = 'PlayHard 劇本殺',
  subtitle = '沉浸式體驗，探索無盡的劇本世界',
  className = ''
}) => {
  return (
    <header className={cn(
      "relative py-24 text-center overflow-hidden bg-gradient-to-br from-mystery-bg-primary to-mystery-bg-secondary",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-b from-mystery-accent-primary/20 to-transparent"></div>
      <div className="relative container mx-auto px-4">
        <Link to="/" className="inline-block">
          <h1 className="text-6xl md:text-7xl font-bold text-mystery-text-primary mb-4 animate-glow hover:scale-105 transition-transform duration-300">
            {title}
          </h1>
        </Link>
        <p className="text-xl text-mystery-text-secondary mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    </header>
  )
}