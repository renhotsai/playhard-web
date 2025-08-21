# 玩硬劇本館 官方網站

專業劇本殺體驗館的官方網站，提供多樣化劇本選擇，營造沉浸式遊戲體驗。立即預約，與朋友一起享受推理樂趣！

## 🎭 功能特色

- **劇本展示**: 完整的劇本資訊，包含角色介紹、故事背景和遊戲規則
- **線上預約**: 便捷的預約系統，選擇劇本、時間和人數
- **響應式設計**: 完美適配手機、平板和桌面設備
- **主題切換**: 支援深色/淺色主題模式
- **智慧推薦**: 月度推薦劇本輪播系統
- **分類篩選**: 依據類型和人數篩選劇本

## 🚀 技術架構

- **框架**: [Next.js 15](https://nextjs.org) - React 全棧框架，使用 App Router
- **開發工具**: Turbopack - 超快速的開發伺服器和構建工具
- **程式語言**: TypeScript - 型別安全的 JavaScript
- **UI 組件**: [shadcn/ui](https://ui.shadcn.com/) - 基於 Radix UI 的現代組件庫
- **樣式系統**: [Tailwind CSS v4](https://tailwindcss.com/) - 工具優先的 CSS 框架
- **主題管理**: next-themes - 深色/淺色主題切換
- **輪播組件**: Embla Carousel - 觸控友好的輪播元件
- **圖示庫**: Lucide React - 現代 SVG 圖示

## 📦 開始使用

### 環境需求

- Node.js 18+
- npm 或 yarn

### 安裝與運行

1. 複製專案：
```bash
git clone https://github.com/playhardtw/web.git
cd web
```

2. 安裝依賴：
```bash
npm install
```

3. 啟動開發伺服器：
```bash
npm run dev
```

4. 開啟瀏覽器訪問 `http://localhost:3000`

## 🛠️ 開發指令

```bash
# 啟動開發伺服器（使用 Turbopack）
npm run dev

# 構建生產版本（使用 Turbopack）
npm run build

# 啟動生產伺服器
npm start

# 程式碼檢查
npm run lint
```

## 📁 專案結構

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根佈局組件
│   ├── page.tsx           # 首頁
│   ├── games/             # 劇本介紹頁面
│   ├── booking/           # 線上預約頁面
│   ├── about/             # 關於我們
│   └── contact/           # 聯絡我們
├── components/            # React 組件
│   ├── ui/                # shadcn/ui 基礎組件
│   ├── navigation.tsx     # 導航欄
│   ├── theme-provider.tsx # 主題提供者
│   ├── mode-toggle.tsx    # 主題切換按鈕
│   └── monthly-recommendations.tsx # 月度推薦輪播
├── data/                  # 模擬資料
│   └── scripts.ts         # 劇本資料
└── lib/                   # 工具函數
    └── utils.ts           # 通用工具
```

## 🎨 設計系統

### 色彩主題
- **導航欄**: 自訂橙色主題 (`--nav-primary`, `--nav-primary-foreground`)
- **主要內容**: 白色背景搭配原生 shadcn/ui 色彩
- **主題切換**: 支援系統預設、深色和淺色模式

### 響應式設計
- **手機**: 單欄佈局，折疊式選單
- **平板**: 雙欄網格，展開式導航
- **桌面**: 三欄網格，完整功能展示

### 組件特色
- **智慧輪播**: 少於4個項目顯示網格，超過4個自動切換為輪播
- **懸停效果**: 卡片放大效果，需要適當的容器空間管理
- **主題一致性**: 導航欄和主題切換保持橙色配色

## 🌟 核心功能

### 劇本管理
- 20個精選劇本，包含詳細資訊
- 角色介紹、遊戲時長、適合人數
- 類型分類和難度評級

### 預約系統
- 日期選擇（防止選擇過去日期）
- 時段選擇和人數設定
- 表單驗證和錯誤處理

### 用戶體驗
- 載入狀態處理，避免水合錯誤
- 平滑動畫和過渡效果
- 無障礙設計，支援鍵盤導航

## 🚀 部署

專案支援多種部署方式：

### Vercel（推薦）
```bash
npm run build
# 或直接連接 GitHub repository 到 Vercel
```

### 其他平台
```bash
npm run build
npm start
# 生成的 .next 資料夾包含所有靜態資源
```

## 🔧 環境設定

專案使用以下設定檔：

- `next.config.ts` - Next.js 設定（圖片最佳化）
- `tailwind.config.ts` - Tailwind CSS 設定
- `components.json` - shadcn/ui 組件設定
- `CLAUDE.md` - Claude Code 開發指引

## 📱 功能頁面

- **首頁**: 英雄區塊、月度推薦、功能介紹、行動呼籲
- **劇本介紹**: 20個模擬劇本，支援篩選和分類
- **線上預約**: 預約表單，劇本選擇和時段預訂
- **關於我們**: 公司故事、團隊資訊、營業時間
- **聯絡我們**: 聯絡表單、位置資訊、社群連結

## 🤝 貢獻指南

歡迎提交問題和功能建議！請遵循以下步驟：

1. Fork 此專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權條款

© 2024 玩硬劇本館。保留所有權利。

---

使用現代 React 和 TypeScript 技術建構 ❤️