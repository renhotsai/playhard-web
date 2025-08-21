
// src/routes/__root.tsx
/// <reference types="vite/client" />
import '../globals.css'
import type { ReactNode } from 'react'
import {
	Outlet,
	createRootRoute,
	HeadContent,
	Scripts,
	useRouter,
} from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { mockScripts, getHotScripts } from '../data/mockScripts.ts'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

// 創建全局數據加載函數
const getGlobalData = createServerFn({
  method: 'GET',
}).handler(async () => {
  const hotScripts = getHotScripts(mockScripts).slice(0, 5)
  
  return {
    totalScripts: mockScripts.length,
    hotScripts: hotScripts.length
  }
})

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'web',
			},
		],
	}),
	loader: async () => await getGlobalData(),
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div className="not-found-page">
				<div className="not-found-content">
					<h1>404</h1>
					<h2>頁面未找到</h2>
					<p>抱歉，您訪問的頁面不存在。</p>
					<a href="/" className="back-home-btn">返回首頁</a>
				</div>
			</div>
		)
	},
})

function RootComponent() {
	const { totalScripts, hotScripts } = Route.useLoaderData()
	const router = useRouter()
	const isHomePage = router.state.location.pathname === '/'

	return (
		<RootDocument>
			<div className="min-h-screen flex flex-col">
				<Header 
					showStats={isHomePage}
					totalScripts={totalScripts}
					hotScripts={hotScripts}
				/>
				<main className="flex-1">
					<Outlet />
				</main>
				<Footer />
			</div>
		</RootDocument>
	)
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="zh-TW">
		<head>
			<HeadContent />
			<title>web - 沉浸式劇本殺體驗平台</title>
			<meta name="description" content="web提供豐富的劇本殺遊戲資源，包含推理、恐怖、奇幻等多種類型劇本。探索無盡的故事世界，體驗沉浸式角色扮演樂趣。" />
			<meta name="keywords" content="劇本殺, 劇本, 角色扮演, 推理遊戲, 桌遊, 沉浸式體驗, 故事遊戲" />
			<meta name="author" content="web" />
			<meta name="robots" content="index, follow" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			
			{/* Open Graph tags */}
			<meta property="og:title" content="web - 沉浸式劇本殺體驗平台" />
			<meta property="og:description" content="探索豐富的劇本殺遊戲資源，體驗沉浸式角色扮演樂趣。" />
			<meta property="og:type" content="website" />
			<meta property="og:image" content="/og-image.jpg" />
			<meta property="og:site_name" content="web" />
			<meta property="og:locale" content="zh_TW" />
			
			{/* Twitter Card tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content="web - 沉浸式劇本殺體驗平台" />
			<meta name="twitter:description" content="探索豐富的劇本殺遊戲資源，體驗沉浸式角色扮演樂趣。" />
			<meta name="twitter:image" content="/og-image.jpg" />
			
			{/* Favicon */}
			<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
			<link rel="alternate icon" href="/favicon.ico" />
			
			{/* Theme color for mobile browsers */}
			<meta name="theme-color" content="#8b0000" />
			
			{/* Structured data */}
			<script type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "WebSite",
					"name": "web",
					"description": "沉浸式劇本殺體驗平台",
					"url": "https://playhard.tw",
					"potentialAction": {
						"@type": "SearchAction",
						"target": "https://playhard.tw/search?q={search_term_string}",
						"query-input": "required name=search_term_string"
					}
				})}
			</script>
		</head>
		<body>
		{children}
		<Scripts />
		</body>
		</html>
	)
}