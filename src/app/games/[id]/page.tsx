import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { getScriptById } from "@/data/scripts";

const colorMap = {
  "chart-1": "bg-orange-500",
  "chart-2": "bg-blue-500", 
  "chart-3": "bg-green-500",
  "chart-4": "bg-purple-500",
  "chart-5": "bg-red-500"
} as const;

export default function ScriptDetailPage({ params }: { params: { id: string } }) {
  const scriptId = parseInt(params.id);
  const script = getScriptById(scriptId);

  if (!script) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/games">← 返回劇本列表</Link>
          </Button>
        </div>

        {/* Script Detail Card */}
        <Card className="mb-8">
          {script.image && (
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <Image 
                src={script.image} 
                alt={script.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <CardTitle className="text-3xl">{script.title}</CardTitle>
              <Badge className={`${colorMap[script.color as keyof typeof colorMap] || 'bg-gray-500'} text-white text-lg px-3 py-1`}>
                {script.category}
              </Badge>
            </div>
            <CardDescription className="text-lg text-muted-foreground">
              {script.players} • {script.duration} • 難度：{script.difficulty}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-4">劇本介紹</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {script.description}
                </p>
              </div>

              {/* Game Info */}
              <div>
                <h3 className="text-xl font-semibold mb-4">遊戲資訊</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">遊戲類型：</span>
                    <span>{script.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">遊戲人數：</span>
                    <span>{script.players}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">遊戲時長：</span>
                    <span>{script.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">難度等級：</span>
                    <span>{script.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">遊戲特色</h3>
              <div className="flex flex-wrap gap-2">
                {script.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-sm px-3 py-1">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <Button size="lg" className="flex-1" asChild>
                <a href="/booking">立即預約</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">聯絡詢問</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>遊戲須知</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 請提前30分鐘到場準備</li>
                <li>• 建議穿著舒適的服裝</li>
                <li>• 遊戲過程中請配合角色扮演</li>
                <li>• 如有任何問題請隨時詢問主持人</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>預約資訊</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 營業時間：每日 10:00 - 22:00</li>
                <li>• 預約專線：02-1234-5678</li>
                <li>• 線上預約：點擊上方「立即預約」</li>
                <li>• 取消政策：開始前24小時可免費取消</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}