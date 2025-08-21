"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = "請輸入姓名";
    if (!formData.email) newErrors.email = "請輸入電子信箱";
    if (!formData.subject) newErrors.subject = "請輸入主旨";
    if (!formData.message) newErrors.message = "請輸入訊息內容";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("感謝您的來信，我們將盡快回覆！");
      console.log("聯絡表單:", formData);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">聯絡我們</h1>
          <p className="text-xl max-w-2xl mx-auto">
            有任何問題或建議嗎？我們很樂意聽到您的聲音
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>聯絡表單</CardTitle>
                <CardDescription>請填寫以下資訊，我們將盡快回覆您</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">姓名 *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="請輸入您的姓名"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">聯絡電話</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="選填"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">電子信箱 *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="請輸入您的電子信箱"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="subject">主旨 *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="請輸入主旨"
                      className={errors.subject ? "border-destructive" : ""}
                    />
                    {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <Label htmlFor="message">訊息內容 *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="請輸入您想告訴我們的內容"
                      rows={5}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    送出訊息
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>店面資訊</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-primary mb-2">地址</h4>
                  <p className="text-muted-foreground">台北市大安區XX路XX號2樓</p>
                  <p className="text-sm text-muted-foreground mt-1">捷運大安站2號出口步行3分鐘</p>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-2">聯絡電話</h4>
                  <p className="text-muted-foreground">02-1234-5678</p>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-2">電子信箱</h4>
                  <p className="text-muted-foreground">info@playhard-script.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>營業時間</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">週一至週五</span>
                  <Badge variant="outline">14:00 - 22:00</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">週六至週日</span>
                  <Badge variant="outline">10:00 - 23:00</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">國定假日</span>
                  <Badge variant="outline">10:00 - 23:00</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>社群媒體</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Facebook</span>
                  <Button variant="outline" size="sm">追蹤我們</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Instagram</span>
                  <Button variant="outline" size="sm">追蹤我們</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">LINE官方帳號</span>
                  <Button variant="outline" size="sm">加好友</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>常見問題</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-primary mb-1">Q: 需要提前多久預約？</h4>
                  <p className="text-muted-foreground">A: 建議提前1-3天預約，熱門時段建議提前一週。</p>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-1">Q: 可以現場排隊嗎？</h4>
                  <p className="text-muted-foreground">A: 可以，但不保證有位置，建議事先預約。</p>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-1">Q: 有停車位嗎？</h4>
                  <p className="text-muted-foreground">A: 附近有付費停車場，建議搭乘大眾運輸工具。</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>交通位置</CardTitle>
              <CardDescription>我們位於交通便利的大安區，歡迎蒞臨</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">地圖載入中... (請整合 Google Maps 或其他地圖服務)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

