import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { mockScripts } from '../../data/mockScripts'
import { getScriptsByCategory, categoryTranslations } from '../../lib/category'
import { ScriptCard } from '../../components/ScriptCard'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { ArrowLeft, FolderOpen } from 'lucide-react'

export const Route = createFileRoute('/categories/$category')({
  loader: ({ params }) => {
    const { category } = params
    
    // Validate category exists
    if (!categoryTranslations[category]) {
      throw notFound()
    }
    
    const scriptsInCategory = getScriptsByCategory(mockScripts, category)
    const categoryName = categoryTranslations[category]
    
    return {
      category,
      categoryName,
      scripts: scriptsInCategory,
      description: getCategoryDescription(category)
    }
  },
  component: CategoryPage,
  notFoundComponent: () => {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-mystery-text-primary mb-4">分類未找到</h1>
        <p className="text-mystery-text-secondary mb-8">抱歉，您訪問的分類不存在。</p>
        <Link to="/categories">
          <Button className="bg-mystery-accent-primary hover:bg-mystery-accent-primary/80">
            返回分類頁面
          </Button>
        </Link>
      </div>
    )
  }
})

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    'mystery': '推理解謎類劇本注重邏輯推理和線索分析，玩家需要運用觀察力和推理能力找出真相。',
    'horror': '恐怖驚悚類劇本營造緊張氛圍，通過心理壓力和懸疑情節帶來刺激體驗。', 
    'fantasy': '奇幻冒險類劇本融合魔法、神話等元素，讓玩家在想像的世界中展開冒險。',
    'emotion': '情感劇情類劇本深入探討人性和情感，通過角色間的關係展現複雜的情感故事。',
    'ancient': '古代背景類劇本以歷史為舞台，讓玩家體驗不同時代的文化和社會背景。',
    'modern': '現代都市類劇本以當代社會為背景，探討現實生活中的各種議題和現象。'
  }
  return descriptions[category] || '精彩劇本等你探索'
}

function CategoryPage() {
  const { category, categoryName, scripts, description } = Route.useLoaderData()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link 
          to="/categories" 
          className="inline-flex items-center text-mystery-text-secondary hover:text-mystery-accent-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回分類總覽
        </Link>
      </div>

      {/* Category Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-mystery-accent-primary/20 mb-6">
          <FolderOpen className="h-12 w-12 text-mystery-accent-primary" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-mystery-text-primary mb-4">
          {categoryName}
        </h1>
        
        <p className="text-lg text-mystery-text-secondary max-w-3xl mx-auto mb-6">
          {description}
        </p>
        
        <div className="flex items-center justify-center space-x-4">
          <Badge 
            variant="outline" 
            className="bg-mystery-accent-primary/20 text-mystery-text-primary border-mystery-accent-primary/30 text-lg px-4 py-2"
          >
            {scripts.length} 個劇本
          </Badge>
          
          <Badge 
            variant="secondary" 
            className="bg-mystery-accent-secondary/20 text-mystery-text-primary border-mystery-accent-secondary/30 text-lg px-4 py-2"
          >
            {category.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Scripts Grid */}
      {scripts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripts.map((script) => (
            <ScriptCard key={script.id} script={script} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <FolderOpen className="h-16 w-16 text-mystery-text-secondary mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-semibold text-mystery-text-primary mb-2">
            此分類暫無劇本
          </h3>
          <p className="text-mystery-text-secondary mb-8">
            敬請期待更多精彩內容
          </p>
          <Link to="/categories">
            <Button className="bg-mystery-accent-primary hover:bg-mystery-accent-primary/80">
              瀏覽其他分類
            </Button>
          </Link>
        </div>
      )}

      {/* Back to Categories */}
      <div className="text-center mt-16">
        <Link to="/categories">
          <Button 
            variant="outline" 
            className="bg-mystery-bg-card/50 border-mystery-accent-primary/30 text-mystery-text-primary hover:bg-mystery-accent-primary/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回所有分類
          </Button>
        </Link>
      </div>
    </div>
  )
}