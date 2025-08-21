"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import ScriptCard from "@/components/script-card";
import { useScriptsSearch, useScripts } from "@/hooks/use-scripts";

const categories = ["全部", "推理", "生存", "武俠", "科幻", "懸疑", "恐怖", "冒險", "古裝", "奇幻", "諜戰", "現代", "治癒"];
const difficulties = ["全部", "簡單", "中等", "困難"];
const playerCounts = ["全部", "4-6人", "6-8人", "8人以上"];

export default function GamesPage() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedDifficulty, setSelectedDifficulty] = useState("全部");
  const [selectedPlayerCount, setSelectedPlayerCount] = useState("全部");

  // Use React Query for filtered results or all scripts
  const hasFilters = selectedCategory !== "全部" || selectedDifficulty !== "全部" || selectedPlayerCount !== "全部";
  
  const searchQuery = useScriptsSearch({
    category: selectedCategory,
    difficulty: selectedDifficulty,
    playerCount: selectedPlayerCount,
  });
  
  const allScriptsQuery = useScripts();
  
  // Use search results if filters are applied, otherwise use all scripts
  const { data: scripts, isLoading, error } = hasFilters ? searchQuery : allScriptsQuery;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">劇本介紹</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            探索我們精心挑選的劇本世界，每一個故事都是一次獨特的冒險體驗
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8 p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">篩選劇本</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">遊戲類型</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge 
                    key={category} 
                    variant={selectedCategory === category ? "default" : "outline"} 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">難度等級</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Badge 
                    key={difficulty} 
                    variant={selectedDifficulty === difficulty ? "default" : "outline"} 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">遊戲人數</label>
              <div className="flex flex-wrap gap-2">
                {playerCounts.map((playerCount) => (
                  <Badge 
                    key={playerCount}
                    variant={selectedPlayerCount === playerCount ? "default" : "outline"} 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setSelectedPlayerCount(playerCount)}
                  >
                    {playerCount}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">載入劇本時發生錯誤</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              重新載入
            </Button>
          </div>
        )}

        {/* Success State */}
        {scripts && !isLoading && (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                找到 {scripts.length} 個符合條件的劇本
              </p>
            </div>

            {/* Scripts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {scripts.map((script) => (
                <ScriptCard 
                  key={script.id} 
                  script={script} 
                  showButton={true}
                  buttonText="查看詳情"
                  className="hover:shadow-lg transition-shadow"
                />
              ))}
            </div>

            {/* No Results */}
            {scripts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">沒有找到符合條件的劇本</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCategory("全部");
                    setSelectedDifficulty("全部");
                    setSelectedPlayerCount("全部");
                  }}
                >
                  重置篩選條件
                </Button>
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <div className="text-center bg-accent p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-accent-foreground">找到心儀的劇本了嗎？</h2>
          <p className="text-accent-foreground/80 mb-6">
            立即預約，開始您的劇本殺之旅
          </p>
          <Button size="lg" asChild>
            <a href="/booking">立即預約</a>
          </Button>
        </div>
      </div>
    </div>
  );
}