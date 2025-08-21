import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScriptCard from "@/components/script-card";
import { scripts } from "@/data/scripts";

const categories = ["全部", "推理", "生存", "武俠", "科幻", "懸疑", "恐怖", "冒險", "古裝", "奇幻", "諜戰", "現代", "治癒"];
const difficulties = ["簡單", "中等", "困難"];

export default function GamesPage() {
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
                  <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">難度等級</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Badge key={difficulty} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    {difficulty}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">遊戲人數</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">4-6人</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">6-8人</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">8人以上</Badge>
              </div>
            </div>
          </div>
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