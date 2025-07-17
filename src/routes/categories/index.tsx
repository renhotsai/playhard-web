import { createFileRoute, Link } from '@tanstack/react-router'
import { mockScripts } from '../../data/mockScripts'
import { getAllUniqueCategories, getScriptsByCategory, categoryTranslations } from '../../lib/category'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { FolderOpen } from 'lucide-react'

export const Route = createFileRoute('/categories/')({
  loader: () => {
    const categories = getAllUniqueCategories(mockScripts)
    const categoryData = categories.map(category => ({
      key: category,
      name: categoryTranslations[category] || category,
      description: getCategoryDescription(category),
      scriptCount: getScriptsByCategory(mockScripts, category).length,
      scripts: getScriptsByCategory(mockScripts, category)
    }))
    
    return {
      categories: categoryData,
      totalScripts: mockScripts.length
    }
  },
  component: CategoriesIndex
})

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    'mystery': '推理解謎，邏輯思維的較量',
    'horror': '恐怖驚悚，心理極限的挑戰', 
    'fantasy': '奇幻冒險，想像力的盛宴',
    'emotion': '情感劇情，人性深度的探索',
    'ancient': '古代背景，歷史文化的體驗',
    'modern': '現代都市，當代議題的反思'
  }
  return descriptions[category] || '精彩劇本等你探索'
}

function CategoriesIndex() {
  const { categories, totalScripts } = Route.useLoaderData()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-mystery-text-primary mb-4">
          劇本總覽
        </h1>
        <p className="text-lg text-mystery-text-secondary max-w-2xl mx-auto">
          探索不同類型的劇本殺遊戲，找到最適合你的故事體驗
        </p>
        <div className="mt-6">
          <Badge variant="outline" className="bg-mystery-accent-primary/20 text-mystery-text-primary border-mystery-accent-primary/30 text-lg px-4 py-2">
            共 {totalScripts} 個精彩劇本
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((category) => (
          <Link
            key={category.key}
            to="/categories/$category"
            params={{ category: category.key }}
            className="group"
          >
            <Card className="h-full bg-mystery-bg-card/50 border-mystery-accent-primary/20 hover:border-mystery-accent-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mystery-accent-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-full bg-mystery-accent-primary/20 w-16 h-16 flex items-center justify-center group-hover:bg-mystery-accent-primary/30 transition-colors">
                  <FolderOpen className="h-8 w-8 text-mystery-accent-primary" />
                </div>
                <CardTitle className="text-2xl text-mystery-text-primary group-hover:text-mystery-accent-secondary transition-colors">
                  {category.name}
                </CardTitle>
                <CardDescription className="text-mystery-text-secondary">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3">
                  <Badge 
                    variant="secondary" 
                    className="bg-mystery-accent-primary/20 text-mystery-text-primary border-mystery-accent-primary/30"
                  >
                    {category.scriptCount} 個劇本
                  </Badge>
                  
                  <div className="text-sm text-mystery-text-secondary">
                    <p>熱門劇本：</p>
                    <div className="space-y-1 mt-2">
                      {category.scripts.slice(0, 2).map((script) => (
                        <div key={script.id} className="text-mystery-text-primary">
                          • {script.title}
                        </div>
                      ))}
                      {category.scripts.length > 2 && (
                        <div className="text-mystery-accent-secondary">
                          還有 {category.scripts.length - 2} 個更多...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}