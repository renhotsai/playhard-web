"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useScripts } from "@/hooks/use-scripts";

const timeSlots = [
  "14:00-17:00",
  "15:00-18:00", 
  "18:00-21:00",
  "19:00-22:00"
];

export default function BookingPage() {
  const [minDate, setMinDate] = useState("");
  const { data: scripts, isLoading: scriptsLoading, error: scriptsError } = useScripts();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    script: "",
    players: "",
    notes: ""
  });

  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

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
    if (!formData.phone) newErrors.phone = "請輸入聯絡電話";
    if (!formData.date) newErrors.date = "請選擇預約日期";
    if (!formData.time) newErrors.time = "請選擇時段";
    if (!formData.script) newErrors.script = "請選擇劇本";
    if (!formData.players) newErrors.players = "請輸入遊戲人數";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("預約申請已送出，我們將盡快與您聯繫確認！");
      console.log("預約資料:", formData);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">線上預約</h1>
          <p className="text-xl text-muted-foreground">
            填寫以下資訊完成預約，我們將盡快與您聯繫確認
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>預約資訊</CardTitle>
                <CardDescription>請詳細填寫以下資訊</CardDescription>
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
                      <Label htmlFor="phone">聯絡電話 *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="請輸入聯絡電話"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">電子信箱</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="選填，用於接收確認信"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">預約日期 *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        min={minDate}
                        className={errors.date ? "border-destructive" : ""}
                      />
                      {errors.date && <p className="text-sm text-destructive mt-1">{errors.date}</p>}
                    </div>
                    <div>
                      <Label htmlFor="time">時段 *</Label>
                      <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                        <SelectTrigger className={errors.time ? "border-destructive" : ""}>
                          <SelectValue placeholder="選擇時段" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.time && <p className="text-sm text-destructive mt-1">{errors.time}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="script">劇本選擇 *</Label>
                    
                    {/* Loading State */}
                    {scriptsLoading && (
                      <Skeleton className="h-10 w-full" />
                    )}
                    
                    {/* Error State */}
                    {scriptsError && (
                      <div className="text-sm text-destructive">
                        載入劇本列表失敗，請重新整理頁面
                      </div>
                    )}
                    
                    {/* Script Selection */}
                    {scripts && !scriptsLoading && (
                      <Select value={formData.script} onValueChange={(value) => handleInputChange("script", value)}>
                        <SelectTrigger className={errors.script ? "border-destructive" : ""}>
                          <SelectValue placeholder="選擇劇本" />
                        </SelectTrigger>
                        <SelectContent>
                          {scripts.map((script) => (
                            <SelectItem 
                              key={script.id} 
                              value={`${script.title} (${script.players}, ${script.duration})`}
                            >
                              {script.title} ({script.players}, {script.duration})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    
                    {errors.script && <p className="text-sm text-destructive mt-1">{errors.script}</p>}
                  </div>

                  <div>
                    <Label htmlFor="players">遊戲人數 *</Label>
                    <Input
                      id="players"
                      type="number"
                      min="3"
                      max="10"
                      value={formData.players}
                      onChange={(e) => handleInputChange("players", e.target.value)}
                      placeholder="請輸入人數 (3-10人)"
                      className={errors.players ? "border-destructive" : ""}
                    />
                    {errors.players && <p className="text-sm text-destructive mt-1">{errors.players}</p>}
                  </div>

                  <div>
                    <Label htmlFor="notes">備註</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="如有特殊需求或備註事項，請在此說明"
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    送出預約申請
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Selected Script Info */}
            {formData.script && scripts && (
              <Card>
                <CardHeader>
                  <CardTitle>所選劇本資訊</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const selectedScript = scripts.find(script => 
                      `${script.title} (${script.players}, ${script.duration})` === formData.script
                    );
                    
                    if (!selectedScript) return null;
                    
                    return (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-lg">{selectedScript.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedScript.category} • {selectedScript.players} • {selectedScript.duration}
                            {selectedScript.difficulty && ` • 難度：${selectedScript.difficulty}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm leading-relaxed">{selectedScript.description}</p>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">遊戲特色</h5>
                          <div className="flex flex-wrap gap-1">
                            {selectedScript.features.map((feature) => (
                              <span key={feature} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>預約須知</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-primary mb-2">預約流程</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 填寫預約表單</li>
                    <li>• 等待電話確認</li>
                    <li>• 確認後可現場付款</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-2">取消政策</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 24小時前取消可全額退費</li>
                    <li>• 12小時前取消退費50%</li>
                    <li>• 12小時內恕不退費</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-2">注意事項</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 請準時到達現場</li>
                    <li>• 遊戲過程中請配合主持人</li>
                    <li>• 建議提前10分鐘到場</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>聯絡方式</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">電話：</span>
                  <span className="text-muted-foreground">02-1234-5678</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">地址：</span>
                  <span className="text-muted-foreground">台北市大安區XX路XX號</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">營業時間：</span>
                  <span className="text-muted-foreground">每日 14:00-22:00</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}