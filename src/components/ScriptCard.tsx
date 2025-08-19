import React from 'react'
import { Link } from '@tanstack/react-router'
import type { ScriptCard as ScriptCardType } from '../types/script.ts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { cn } from '../lib/utils'

interface ScriptCardProps {
  script: ScriptCardType
  className?: string
}

const difficultyLabels = {
  easy: '簡單',
  medium: '中等',
  hard: '困難',
  expert: '專家'
}

const categoryLabels = {
  mystery: '懸疑',
  horror: '恐怖',
  modern: '現代',
  ancient: '古風',
  fantasy: '奇幻',
  emotion: '情感'
}

export const ScriptCard: React.FC<ScriptCardProps> = ({ script, className = '' }) => {
  return (
    <Link to="/script/$id" params={{ id: script.id }} className="block">
      <Card className={cn("group overflow-hidden border-2 border-mystery-accent-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-mystery-accent-gold/50 shadow-xl bg-mystery-bg-card h-full", className)}>
        <div className="relative overflow-hidden">
          <img 
            src={script.coverImage} 
            alt={`${script.title} - web劇本殺遊戲封面`} 
            className="w-full h-48 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            {script.isNew && (
              <Badge variant="destructive" className="bg-mystery-accent-primary hover:bg-mystery-accent-primary text-white text-xs">
                新
              </Badge>
            )}
            {script.isHot && (
              <Badge className="bg-mystery-accent-gold hover:bg-mystery-accent-gold text-black font-semibold text-xs">
                熱
              </Badge>
            )}
          </div>
        </div>
        
        <CardHeader className="pb-3 bg-mystery-bg-card">
          <CardTitle className="text-mystery-text-primary text-lg font-bold line-clamp-2 group-hover:text-mystery-accent-gold transition-colors">
            {script.title}
          </CardTitle>
          <CardDescription className="text-mystery-text-secondary text-sm line-clamp-2">
            {script.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 bg-mystery-bg-card flex-1">
          <div className="flex flex-wrap gap-1 sm:gap-2 text-sm text-mystery-text-secondary">
            <Badge variant="outline" className="border-mystery-accent-primary/30 text-mystery-text-secondary text-xs">
              {script.playerCount.min === script.playerCount.max 
                ? `${script.playerCount.min}人` 
                : `${script.playerCount.min}-${script.playerCount.max}人`}
            </Badge>
            <Badge variant="outline" className="border-mystery-accent-primary/30 text-mystery-text-secondary text-xs">
              {script.duration}分鐘
            </Badge>
            <Badge variant="outline" className="border-mystery-accent-primary/30 text-mystery-text-secondary text-xs">
              {difficultyLabels[script.difficulty]}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 bg-mystery-accent-gold/10 px-2 sm:px-3 py-2 rounded-lg border border-mystery-accent-gold/30">
              <span className="text-mystery-accent-gold text-lg">★</span>
              <div className="flex flex-col">
                <span className="text-mystery-accent-gold font-bold text-lg leading-none">{script.rating}</span>
                <span className="text-mystery-text-muted text-xs">評分</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {script.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs bg-mystery-bg-hover text-mystery-text-muted">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="pt-2">
            <Badge className="bg-mystery-accent-primary/20 text-mystery-accent-secondary border-mystery-accent-primary/30 text-xs">
              {categoryLabels[script.category]}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}