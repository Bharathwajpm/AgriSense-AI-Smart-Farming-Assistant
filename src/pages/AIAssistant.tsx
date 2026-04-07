import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const responses: { keywords: string[]; reply: string }[] = [
  { keywords: ["best crop", "which crop", "suggest crop", "crop recommendation"], reply: "Based on typical Indian conditions, I recommend **Rice** for high-rainfall areas, **Wheat** for moderate climates, and **Millets** for drought-prone regions. Use the Crop Recommendation tool for personalized results!" },
  { keywords: ["disease", "plant disease", "leaf", "blight", "spot"], reply: "Common leaf diseases include **Bacterial Leaf Blight**, **Brown Spot**, and **Leaf Blast**. Upload a photo in the Disease Detection section for AI-powered diagnosis with treatment recommendations." },
  { keywords: ["irrigation", "water", "watering"], reply: "Smart irrigation depends on soil moisture and weather. As a rule: if soil moisture is above 70% or rain is expected, **skip irrigation**. For dry soil (<40%), water immediately. Use our Smart Irrigation tool for precise calculations." },
  { keywords: ["price", "market", "sell", "buy"], reply: "Current trends show **Rice prices rising** (₹2400/q) and **Wheat declining** slightly. I'd recommend holding rice for 2 more weeks and selling wheat now. Check Market Insights for detailed charts." },
  { keywords: ["scheme", "government", "subsidy", "pm kisan"], reply: "Key schemes include **PM-Kisan** (₹6000/year), **Fasal Bima Yojana** (crop insurance), and **Kisan Credit Card** (low-interest loans). Check Government Schemes page to find what you're eligible for!" },
  { keywords: ["fertilizer", "npk", "urea"], reply: "For most crops, a balanced **NPK 20:20:20** is good. Rice benefits from extra nitrogen, while legumes need more phosphorus. Always do a soil test first – use the Soil Health Card Scheme (free)!" },
  { keywords: ["weather", "rain", "temperature", "climate"], reply: "Current forecast shows partly cloudy skies, 28°C, with 15% rain chance. Heavy rainfall is expected in 2 days – plan your irrigation and harvesting accordingly." },
  { keywords: ["hello", "hi", "hey", "help"], reply: "Hello! 🌱 I'm your AgriSense AI assistant. Ask me about crops, diseases, irrigation, market prices, government schemes, or any farming question!" },
  { keywords: ["organic", "natural farming"], reply: "Organic farming is growing! Key practices: use **neem-based pesticides**, **vermicompost** for fertilizer, and **crop rotation**. Government provides subsidies under the National Mission on Sustainable Agriculture." },
];

function getReply(input: string): string {
  const lower = input.toLowerCase();
  for (const r of responses) {
    if (r.keywords.some((k) => lower.includes(k))) return r.reply;
  }
  return "I can help with crop recommendations, disease detection, irrigation planning, market prices, and government schemes. Try asking about any of these topics! 🌾";
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hello! 🌱 I'm AgriSense AI, your farming assistant. Ask me about crops, diseases, irrigation, market prices, or government schemes!" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((p) => [...p, { role: "assistant", text: getReply(input) }]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in max-w-3xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>
        <p className="text-sm text-muted-foreground">Your intelligent farming companion.</p>
      </div>

      <Card className="glass-card flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="gradient-primary rounded-full p-1.5 h-7 w-7 flex items-center justify-center shrink-0">
                  <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm"
              }`}>
                {m.text}
              </div>
              {m.role === "user" && (
                <div className="bg-secondary rounded-full p-1.5 h-7 w-7 flex items-center justify-center shrink-0">
                  <User className="h-3.5 w-3.5 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </CardContent>
        <div className="p-3 border-t border-border flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about farming..."
            className="flex-1"
          />
          <Button onClick={send} size="icon" className="gradient-primary text-primary-foreground shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
