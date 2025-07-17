
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
				title: 'PlayHard 劇本殺',
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
		<html>
		<head>
			<HeadContent />
			<title>PlayHard 劇本殺</title>
		</head>
		<body>
		{children}
		<Scripts />
		</body>
		</html>
	)
}