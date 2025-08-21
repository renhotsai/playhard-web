// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { mockScripts, getHotScripts } from '../data/mockScripts.ts'
import { HotRecommendations } from '../components/HotRecommendations'

const getScriptData = createServerFn({
  method: 'GET',
}).handler(async () => {
  // 模擬從數據庫獲取數據
  const hotScripts = getHotScripts(mockScripts).slice(0, 5) // 取前5個熱門劇本
  
  return {
    hotScripts
  }
})

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getScriptData(),
})

function Home() {
  const { hotScripts } = Route.useLoaderData()

  return (
    <div className="bg-gradient-to-br from-mystery-bg-primary to-mystery-bg-secondary">
      <HotRecommendations scripts={hotScripts} />
    </div>
  )
}