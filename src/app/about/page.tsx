import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const teamMembers = [
  {
    name: "李主持",
    role: "首席遊戲主持人",
    experience: "5年經驗",
    specialty: "推理、懸疑類劇本",
    description: "擅長營造緊張刺激的遊戲氛圍，讓每位玩家都能深度沉浸在角色中。"
  },
  {
    name: "王DM",
    role: "資深主持人",
    experience: "3年經驗", 
    specialty: "武俠、古風類劇本",
    description: "對古代文化有深入研究，能完美詮釋各種古風劇本的精髓。"
  },
  {
    name: "張策劃",
    role: "劇本策劃師",
    experience: "4年經驗",
    specialty: "劇本開發與改編",
    description: "負責劇本的改編與優化，確保每個劇本都有最佳的遊戲體驗。"
  }
];

const facilities = [
  {
    name: "推理主題房",
    capacity: "6-8人",
    features: ["復古裝潢", "專業音響", "氛圍燈光"],
    description: "維多利亞風格裝潢，完美適合推理類劇本。"
  },
  {
    name: "現代都市房",
    capacity: "4-6人",
    features: ["現代設計", "多媒體設備", "舒適座椅"],
    description: "簡約現代風格，適合都市背景的劇本。"
  },
  {
    name: "古風雅室",
    capacity: "5-7人", 
    features: ["中式古典", "茶具配備", "書畫裝飾"],
    description: "古典中式風格，為武俠古風劇本量身打造。"
  },
  {
    name: "科幻主題房",
    capacity: "4-6人",
    features: ["科技感設計", "LED燈效", "未來風格"],
    description: "充滿科技感的空間設計，完美契合科幻題材。"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">關於玩硬劇本館</h1>
          <p className="text-xl max-w-3xl mx-auto">
            我們致力於提供最優質的劇本殺體驗，用心打造每一個細節，讓您在推理的世界中盡情探索
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">我們的故事</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-primary">創立初衷</h3>
                <p className="text-muted-foreground mb-6">
                  玩硬劇本館成立於2019年，源於創辦人對推理文化的熱愛。我們相信每個人心中都住著一個偵探，
                  渴望在緊張刺激的推理過程中找到真相。
                </p>
                <p className="text-muted-foreground">
                  從最初的小工作室到現在的專業場館，我們始終堅持品質第一的原則，精心挑選每一個劇本，
                  培訓每一位主持人，只為給您帶來最難忘的遊戲體驗。
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg">
                <h4 className="text-xl font-semibold mb-4 text-center">成長歷程</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-chart-1 text-white">2019</Badge>
                    <span className="text-sm">工作室成立，首批劇本上線</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-chart-2 text-white">2020</Badge>
                    <span className="text-sm">擴大規模，增設專業主題房間</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-chart-3 text-white">2021</Badge>
                    <span className="text-sm">引進原創劇本，組建專業團隊</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-chart-4 text-white">2022</Badge>
                    <span className="text-sm">獲得年度最佳劇本館獎項</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-chart-5 text-white">2023</Badge>
                    <span className="text-sm">累計服務超過萬名玩家</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">專業團隊</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {member.name}
                    <Badge variant="outline">{member.experience}</Badge>
                  </CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <span className="text-sm font-medium text-primary">專精領域：</span>
                    <span className="text-sm text-muted-foreground">{member.specialty}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">遊戲設施</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{facility.name}</CardTitle>
                  <CardDescription>{facility.capacity}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {facility.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Info Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-accent-foreground">營業資訊</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>營業時間</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">週一至週五</span>
                  <span className="text-muted-foreground">14:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">週六至週日</span>
                  <span className="text-muted-foreground">10:00 - 23:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">國定假日</span>
                  <span className="text-muted-foreground">10:00 - 23:00</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>聯絡資訊</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium block">地址</span>
                  <span className="text-muted-foreground">台北市大安區XX路XX號2樓</span>
                </div>
                <div>
                  <span className="font-medium block">電話</span>
                  <span className="text-muted-foreground">02-1234-5678</span>
                </div>
                <div>
                  <span className="font-medium block">交通</span>
                  <span className="text-muted-foreground">捷運大安站2號出口步行3分鐘</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">準備開始您的推理之旅？</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            瀏覽我們的劇本選擇，或直接預約您的遊戲時段
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
    </div>
  );
}