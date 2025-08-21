"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useScripts, useAvailableTimeSlots, useBookingInfo, useSubmitBooking } from "@/hooks/use-scripts";

export default function BookingPage() {
  const [minDate, setMinDate] = useState("");
  const { data: scripts, isLoading: scriptsLoading, error: scriptsError } = useScripts();
  const { data: timeSlots, isLoading: timeSlotsLoading, error: timeSlotsError } = useAvailableTimeSlots();
  const { data: bookingInfo, isLoading: bookingInfoLoading } = useBookingInfo();
  const submitBookingMutation = useSubmitBooking();
  
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
      submitBookingMutation.mutate(formData, {
        onSuccess: (response) => {
          if (response.success) {
            alert(`${response.message}\n預約編號：${response.bookingId}`);
            // Reset form
            setFormData({
              name: "",
              phone: "",
              email: "",
              date: "",
              time: "",
              script: "",
              players: "",
              notes: ""
            });
            setErrors({});
          } else {
            alert(response.message);
          }
        },
        onError: (error) => {
          alert("預約送出時發生錯誤，請稍後再試或直接撥打客服專線。");
          console.error("Booking submission error:", error);
        }
      });
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
                      
                      {/* Loading State */}
                      {timeSlotsLoading && (
                        <Skeleton className="h-10 w-full" />
                      )}
                      
                      {/* Error State */}
                      {timeSlotsError && (
                        <div className="text-sm text-destructive">
                          載入時段資訊失敗，請重新整理頁面
                        </div>
                      )}
                      
                      {/* Time Slot Selection */}
                      {timeSlots && !timeSlotsLoading && (
                        <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                          <SelectTrigger className={errors.time ? "border-destructive" : ""}>
                            <SelectValue placeholder="選擇時段" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot.id} value={slot.time}>
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{slot.time}</span>
                                    {slot.price && <Badge variant="secondary" className="text-xs">{slot.price}</Badge>}
                                  </div>
                                  <span className="text-xs text-muted-foreground">{slot.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      
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

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={submitBookingMutation.isPending}
                  >
                    {submitBookingMutation.isPending ? "送出中..." : "送出預約申請"}
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
                {bookingInfoLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ) : bookingInfo ? (
                  <>
                    <div>
                      <h4 className="font-medium text-primary mb-2">預約流程</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        {bookingInfo.policies.procedures.map((procedure, index) => (
                          <li key={index}>• {procedure}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary mb-2">取消政策</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        {bookingInfo.policies.cancellation.map((policy, index) => (
                          <li key={index}>• {policy}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary mb-2">注意事項</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        {bookingInfo.policies.notes.map((note, index) => (
                          <li key={index}>• {note}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    載入預約資訊中...
                  </div>
                )}
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