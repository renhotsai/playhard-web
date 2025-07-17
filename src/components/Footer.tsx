import React from 'react'
import { Link } from '@tanstack/react-router'
import { cn } from '../lib/utils'

interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={cn(
      "bg-mystery-bg-secondary border-t border-mystery-accent-primary/20 py-12 mt-auto",
      className
    )}>
      <div className="container mx-auto px-4 text-center">
        <p className="text-mystery-text-secondary mb-4">
          © 2024 PlayHard 劇本殺. All rights reserved.
        </p>
        <div className="flex justify-center gap-6">
          <Link 
            to="/about" 
            className="text-mystery-accent-gold hover:text-mystery-accent-secondary transition-colors duration-300"
          >
            關於我們
          </Link>
          <Link 
            to="/contact" 
            className="text-mystery-accent-gold hover:text-mystery-accent-secondary transition-colors duration-300"
          >
            聯繫我們
          </Link>
        </div>
      </div>
    </footer>
  )
}