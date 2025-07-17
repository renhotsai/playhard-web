import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import type { Script } from '../types/script.ts'
import { ScriptCard } from './ScriptCard'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { cn } from '../lib/utils'

interface HotRecommendationsProps {
  scripts: Script[]
  className?: string
}

export const HotRecommendations: React.FC<HotRecommendationsProps> = ({ scripts, className = '' }) => {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false)
  const totalScripts = scripts.length

  // 計算每個卡片的位置和樣式
  const getCardTransform = useCallback((index: number) => {
    const offset = (index - activeIndex + totalScripts) % totalScripts
    
    const positions = [
      { x: 0, scale: 1, z: 5, opacity: 1, blur: 0 },           // 中心
      { x: 160, scale: 0.85, z: 4, opacity: 0.8, blur: 0 },   // 右1
      { x: 280, scale: 0.7, z: 3, opacity: 0.6, blur: 1 },    // 右2
      { x: -280, scale: 0.7, z: 2, opacity: 0.6, blur: 1 },   // 左2
      { x: -160, scale: 0.85, z: 3, opacity: 0.8, blur: 0 }   // 左1
    ]
    
    return positions[offset] || positions[0]
  }, [activeIndex, totalScripts])

  // 智能點擊處理
  const handleCardClick = useCallback((index: number, scriptId: string) => {
    if (index === activeIndex) {
      // 中心卡片 → 跳轉詳情頁
      navigate({ to: '/script/$id', params: { id: scriptId } })
    } else {
      // 非中心卡片 → 切換焦點
      setIsAutoPlayPaused(true) // 用戶點擊時暫停自動播放
      setActiveIndex(index)
      // 5秒後恢復自動播放
      setTimeout(() => setIsAutoPlayPaused(false), 5000)
    }
  }, [activeIndex, navigate])

  // 鼠標懸停控制
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlayPaused(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlayPaused(false)
  }, [])

  // 自動輪播計時器
  useEffect(() => {
    if (isAutoPlayPaused) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalScripts)
    }, 4000) // 每4秒自動切換

    return () => clearInterval(interval)
  }, [totalScripts, isAutoPlayPaused])

  // 鍵盤導航
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setIsAutoPlayPaused(true) // 用戶操作時暫停自動播放
        setActiveIndex((prev) => (prev - 1 + totalScripts) % totalScripts)
        // 5秒後恢復自動播放
        setTimeout(() => setIsAutoPlayPaused(false), 5000)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        setIsAutoPlayPaused(true) // 用戶操作時暫停自動播放
        setActiveIndex((prev) => (prev + 1) % totalScripts)
        // 5秒後恢復自動播放
        setTimeout(() => setIsAutoPlayPaused(false), 5000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [totalScripts])

  // 如果劇本不足5個，顯示所有劇本
  const displayScripts = scripts.slice(0, 5)

  return (
    <section className={cn("w-full py-16 bg-mystery-bg-secondary/50", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-mystery-text-primary mb-4">
            熱門推薦
          </h2>
          <p className="text-mystery-text-secondary text-lg">
            玩家最愛的精彩劇本
          </p>
          <Separator className="mx-auto mt-6 w-24 bg-mystery-accent-gold" />
        </div>

        {/* 循環重疊卡片容器 */}
        <div 
          className="relative mx-auto max-w-6xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="relative h-[480px] flex items-center justify-center overflow-visible"
            style={{ perspective: '1000px' }}
          >
            {displayScripts.map((script, index) => {
              const transform = getCardTransform(index)
              const isActive = index === activeIndex
              
              return (
                <div
                  key={script.id}
                  className={cn(
                    "absolute w-[320px] cursor-pointer transition-all duration-700 ease-out",
                    "hover:scale-105"
                  )}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${transform.x}px) scale(${transform.scale})`,
                    left: '50%',
                    top: '50%',
                    zIndex: transform.z,
                    opacity: transform.opacity,
                    filter: `blur(${transform.blur}px)`,
                  }}
                  onClick={() => handleCardClick(index, script.id)}
                >
                  <div className="relative h-full">
                    {/* 排名徽章 */}
                    <div className="absolute -top-3 -left-3 z-10">
                      <Badge 
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-xl border-2",
                          index === 0 && "bg-mystery-accent-gold text-black border-yellow-300 animate-pulse",
                          index === 1 && "bg-gray-400 text-white border-gray-300",
                          index === 2 && "bg-orange-600 text-white border-orange-400",
                          index === 3 && "bg-mystery-accent-primary text-white border-mystery-accent-secondary",
                          index === 4 && "bg-purple-600 text-white border-purple-400"
                        )}
                      >
                        {index + 1}
                      </Badge>
                    </div>

                    {/* 卡片主體 */}
                    <div
                      className={cn(
                        "relative h-full rounded-xl overflow-hidden",
                        "border-2 transition-all duration-300",
                        isActive 
                          ? "border-mystery-accent-gold shadow-2xl shadow-mystery-accent-gold/30" 
                          : "border-mystery-accent-primary/20 shadow-xl",
                        "transform-gpu backdrop-blur-sm"
                      )}
                    >
                      <ScriptCard
                        script={script}
                        className={cn(
                          "h-full border-0 transition-all duration-300",
                          isActive && "ring-2 ring-mystery-accent-gold/50"
                        )}
                      />
                      
                      {/* 中心卡片特殊效果 */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-xl">
                          <div className="absolute inset-0 rounded-xl border-2 border-mystery-accent-gold/50 animate-pulse" />
                          <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-mystery-accent-gold/20 to-mystery-accent-secondary/20 blur-xl -z-10" />
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}