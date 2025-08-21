import { createFileRoute } from '@tanstack/react-router'
import { mockScripts, getScriptById } from '../../data/mockScripts.ts'
import type { Script } from '../../types/script.ts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { ArrowLeft, Heart, Share2, Star, Users, Clock, Target } from 'lucide-react'

export const Route = createFileRoute('/script/$id')({
  component: ScriptDetail,
  loader: async ({ params }) => {
    const script = getScriptById(mockScripts, params.id)
    
    if (!script) {
      throw new Error('Script not found')
    }
    
    return script
  },
  errorComponent: ({ error }: { error: Error }) => {
    return (
      <div className="error-page">
        <div className="error-content">
          <h1>劇本未找到</h1>
          <p>抱歉，您要查看的劇本不存在或已被刪除。</p>
          <p className="error-message">{error.message}</p>
          <a href="/" className="back-home-btn">返回首頁</a>
        </div>
      </div>
    )
  }
})

function ScriptDetail() {
  const script: Script = Route.useLoaderData()

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-mystery-bg-primary to-mystery-bg-secondary">
      <div className="container mx-auto px-4 py-8">
        {/* 返回導航 */}
        <nav className="mb-8">
          <Button
            variant="ghost"
            className="text-mystery-accent-gold hover:bg-mystery-bg-card hover:text-mystery-accent-secondary"
            asChild
          >
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回首頁
            </a>
          </Button>
        </nav>

        {/* 劇本標題區 */}
        <Card className="mb-8 overflow-hidden border-mystery-accent-primary/20 bg-mystery-bg-card">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <div className="lg:col-span-1">
              <div className="relative">
                <img 
                  src={script.coverImage} 
                  alt={script.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {script.isNew && (
                    <Badge className="bg-mystery-accent-primary text-white">
                      新
                    </Badge>
                  )}
                  {script.isHot && (
                    <Badge className="bg-mystery-accent-gold text-black">
                      熱
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-mystery-text-primary mb-2">
                  {script.title}
                </h1>
                <p className="text-mystery-text-secondary text-lg">
                  作者：{script.author}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-mystery-bg-hover rounded-lg">
                  <Users className="h-5 w-5 mx-auto mb-1 text-mystery-accent-gold" />
                  <div className="text-sm text-mystery-text-muted">人數</div>
                  <div className="font-semibold text-mystery-text-primary">
                    {script.playerCount.min === script.playerCount.max 
                      ? `${script.playerCount.min}人` 
                      : `${script.playerCount.min}-${script.playerCount.max}人`}
                  </div>
                </div>
                <div className="text-center p-3 bg-mystery-bg-hover rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-mystery-accent-gold" />
                  <div className="text-sm text-mystery-text-muted">時長</div>
                  <div className="font-semibold text-mystery-text-primary">
                    {script.duration}分鐘
                  </div>
                </div>
                <div className="text-center p-3 bg-mystery-bg-hover rounded-lg">
                  <Target className="h-5 w-5 mx-auto mb-1 text-mystery-accent-gold" />
                  <div className="text-sm text-mystery-text-muted">難度</div>
                  <div className="font-semibold text-mystery-text-primary">
                    {difficultyLabels[script.difficulty]}
                  </div>
                </div>
                <div className="text-center p-3 bg-mystery-bg-hover rounded-lg">
                  <div className="text-sm text-mystery-text-muted">類型</div>
                  <Badge className="bg-mystery-accent-primary/20 text-mystery-accent-secondary border-mystery-accent-primary/30">
                    {categoryLabels[script.category]}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-mystery-accent-gold fill-current" />
                    <span className="font-bold text-mystery-accent-gold text-lg">
                      {script.rating}
                    </span>
                    <span className="text-mystery-text-muted text-sm">
                      ({script.totalRatings}人評分)
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-mystery-text-secondary">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {script.favoriteCount} 收藏
                  </span>
                  <span>🎮 {script.playCount} 次遊戲</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 主要內容區 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* 劇本描述 */}
            <Card className="border-mystery-accent-primary/20 bg-mystery-bg-card">
              <CardHeader>
                <CardTitle className="text-mystery-text-primary flex items-center gap-2">
                  劇本簡介
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-mystery-text-secondary leading-relaxed">
                  {script.description}
                </p>
              </CardContent>
            </Card>

            {/* 完整故事描述 */}
            <Card className="border-mystery-accent-primary/20 bg-mystery-bg-card">
              <CardHeader>
                <CardTitle className="text-mystery-text-primary">詳細故事</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-mystery-text-secondary leading-relaxed">
                  {script.fullDescription}
                </p>
              </CardContent>
            </Card>

            {/* 故事背景 */}
            <Card className="border-mystery-accent-primary/20 bg-mystery-bg-card">
              <CardHeader>
                <CardTitle className="text-mystery-text-primary">故事背景</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-mystery-text-secondary leading-relaxed">
                  {script.storyBackground}
                </p>
              </CardContent>
            </Card>

            {/* 遊戲規則 */}
            <Card className="border-mystery-accent-primary/20 bg-mystery-bg-card">
              <CardHeader>
                <CardTitle className="text-mystery-text-primary">遊戲規則</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {script.gameRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3 text-mystery-text-secondary">
                      <Badge variant="outline" className="mt-0.5 border-mystery-accent-gold text-mystery-accent-gold">
                        {index + 1}
                      </Badge>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 角色介紹 */}
            <Card className="border-mystery-accent-primary/20 bg-mystery-bg-card">
              <CardHeader>
                <CardTitle className="text-mystery-text-primary">角色介紹</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {script.characters.map((character, index) => (
                    <Card key={index} className="border-mystery-accent-primary/10 bg-mystery-bg-hover">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-mystery-accent-gold text-lg">
                          {character.name}
                        </CardTitle>
                        <CardDescription className="text-mystery-text-secondary">
                          {character.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="font-semibold text-mystery-text-primary mb-2">背景</div>
                          <p className="text-mystery-text-secondary text-sm leading-relaxed">
                            {character.background}
                          </p>
                        </div>
                        <Separator className="bg-mystery-accent-primary/20" />
                        <div>
                          <div className="font-semibold text-mystery-text-primary mb-2">人際關係</div>
                          <ul className="space-y-1">
                            {character.relationship.map((rel, i) => (
                              <li key={i} className="text-mystery-text-secondary text-sm flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-mystery-accent-gold rounded-full mt-2 flex-shrink-0"></span>
                                {rel}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Separator className="bg-mystery-accent-primary/20" />
                        <div>
                          <div className="font-semibold text-mystery-text-primary mb-2">目標</div>
                          <ul className="space-y-1">
                            {character.goals.map((goal, i) => (
                              <li key={i} className="text-mystery-text-secondary text-sm flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-mystery-accent-secondary rounded-full mt-2 flex-shrink-0"></span>
                                {goal}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右側欄 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 遊戲要求 */}
            <Card className="border-mystery-accent-primary/20 bg-mystery-bg-card">
              <CardHeader>
                <CardTitle className="text-mystery-text-primary">遊戲要求</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {script.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-mystery-text-secondary text-sm">
                      <span className="w-1.5 h-1.5 bg-mystery-accent-primary rounded-full mt-2 flex-shrink-0"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 遊戲提示 */}
            <Card className="border-mystery-accent-primary/20 bg-mystery-bg-card">
              <CardHeader>
                <CardTitle className="text-mystery-text-primary">遊戲提示</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {script.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-mystery-text-secondary text-sm">
                      <span className="w-1.5 h-1.5 bg-mystery-accent-gold rounded-full mt-2 flex-shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 劇本特色 */}
            <Card className="border-mystery-accent-primary/20 bg-mystery-bg-card">
              <CardHeader>
                <CardTitle className="text-mystery-text-primary">劇本特色</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {script.features.map((feature, index) => (
                    <Badge key={index} className="bg-mystery-accent-primary/20 text-mystery-accent-secondary border-mystery-accent-primary/30">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 標籤 */}
            <Card className="border-mystery-accent-primary/20 bg-mystery-bg-card">
              <CardHeader>
                <CardTitle className="text-mystery-text-primary">相關標籤</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {script.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-mystery-bg-hover text-mystery-text-muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 操作按鈕 */}
            <Card className="border-mystery-accent-primary/20 bg-mystery-bg-card">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button className="w-full bg-mystery-accent-primary hover:bg-mystery-accent-secondary text-white">
                    <Heart className="mr-2 h-4 w-4" />
                    收藏劇本
                  </Button>
                  <Button variant="outline" className="w-full border-mystery-accent-gold text-mystery-accent-gold hover:bg-mystery-accent-gold hover:text-black">
                    <Share2 className="mr-2 h-4 w-4" />
                    分享劇本
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 發布信息 */}
            <Card className="border-mystery-accent-primary/20 bg-mystery-bg-card">
              <CardContent className="pt-6">
                <div className="space-y-2 text-sm text-mystery-text-muted">
                  <div>發布時間：{script.releaseDate}</div>
                  <div>更新時間：{script.updatedAt}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}