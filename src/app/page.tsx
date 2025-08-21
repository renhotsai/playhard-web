import Link from "next/link";
import { Button } from "@/components/ui/button";
import MonthlyRecommendations from "@/components/monthly-recommendations";
import { getMonthlyRecommendedScripts } from "@/data/scripts";

export default function Home() {
  const monthlyScripts = getMonthlyRecommendedScripts();
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-background text-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">歡迎來到玩硬劇本館</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            體驗最刺激的劇本殺遊戲，與朋友一起沉浸在推理與角色扮演的奇幻世界中
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/booking">立即預約</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/games">瀏覽劇本</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Monthly Recommendations Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">本月推薦</h2>
          <div className="py-8">
            <MonthlyRecommendations scripts={monthlyScripts} />
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/games">查看所有劇本</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-accent-foreground">準備好開始您的冒險了嗎？</h2>
          <p className="text-xl mb-8 text-accent-foreground/80 max-w-xl mx-auto">
            立即預約，與朋友們一起體驗最精彩的劇本殺遊戲
          </p>
          <Button asChild size="lg">
            <Link href="/booking">立即預約</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
