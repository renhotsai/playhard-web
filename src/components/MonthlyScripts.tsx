
import React from 'react'
import type { Script } from '../types/script.ts'
import { ScriptCard } from './ScriptCard'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { cn } from '../lib/utils'

interface MonthlyScriptsProps {
  scripts: Script[]
  className?: string
}

export const MonthlyScripts: React.FC<MonthlyScriptsProps> = ({ scripts, className = '' }) => {
  return (
    <section className={cn("w-full py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-mystery-text-primary mb-2">
            本月劇本預覽
          </h2>
          <p className="text-mystery-text-secondary">
            最新上架的精彩劇本
          </p>
          <Separator className="mx-auto mt-4 w-24 bg-mystery-accent-gold" />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
              skipSnaps: false,
              containScroll: "trimSnaps",
            }}
            className="w-full relative"
          >
            <CarouselContent className="gap-6">
              {scripts.map((script) => (
                <CarouselItem key={script.id} className="basis-[280px] md:basis-[320px] lg:basis-[350px]">
                  <ScriptCard
                    script={script}
                    className="h-full hover:shadow-mystery-accent-gold/20 hover:shadow-xl transition-all duration-300"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex border-mystery-accent-primary/30 bg-mystery-bg-card hover:bg-mystery-accent-primary/20 text-mystery-text-primary hover:text-mystery-accent-gold shadow-lg" />
            <CarouselNext className="hidden lg:flex border-mystery-accent-primary/30 bg-mystery-bg-card hover:bg-mystery-accent-primary/20 text-mystery-text-primary hover:text-mystery-accent-gold shadow-lg" />
          </Carousel>
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="border-mystery-accent-gold text-mystery-accent-gold hover:bg-mystery-accent-gold hover:text-black transition-colors"
          >
            查看全部本月劇本
          </Button>
        </div>
      </div>
    </section>
  )
}