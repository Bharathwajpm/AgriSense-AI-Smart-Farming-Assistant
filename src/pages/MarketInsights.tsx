import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const crops = [
  {
    name: "Rice",
    emoji: "🌾",
    current: 2400,
    predicted: 2550,
    trend: "up",
    suggestion: "Hold for 2 weeks – price rising",
    profit: "₹15,000/acre",
    data: [
      { m: "Jan", p: 2200 }, { m: "Feb", p: 2250 }, { m: "Mar", p: 2180 },
      { m: "Apr", p: 2320 }, { m: "May", p: 2400 }, { m: "Jun", p: 2480 },
    ],
  },
  {
    name: "Wheat",
    emoji: "🌿",
    current: 2150,
    predicted: 2050,
    trend: "down",
    suggestion: "Sell now – price declining",
    profit: "₹12,500/acre",
    data: [
      { m: "Jan", p: 2050 }, { m: "Feb", p: 2100 }, { m: "Mar", p: 2200 },
      { m: "Apr", p: 2180 }, { m: "May", p: 2150 }, { m: "Jun", p: 2100 },
    ],
  },
  {
    name: "Cotton",
    emoji: "☁️",
    current: 6200,
    predicted: 6500,
    trend: "up",
    suggestion: "Wait to sell – strong demand ahead",
    profit: "₹22,000/acre",
    data: [
      { m: "Jan", p: 5800 }, { m: "Feb", p: 5900 }, { m: "Mar", p: 6000 },
      { m: "Apr", p: 6100 }, { m: "May", p: 6200 }, { m: "Jun", p: 6350 },
    ],
  },
  {
    name: "Groundnut",
    emoji: "🥜",
    current: 5100,
    predicted: 4900,
    trend: "down",
    suggestion: "Sell now – oversupply expected",
    profit: "₹18,000/acre",
    data: [
      { m: "Jan", p: 5300 }, { m: "Feb", p: 5250 }, { m: "Mar", p: 5200 },
      { m: "Apr", p: 5150 }, { m: "May", p: 5100 }, { m: "Jun", p: 5000 },
    ],
  },
];

export default function MarketInsights() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Market Insights</h1>
        <p className="text-sm text-muted-foreground">AI-predicted price trends and sell recommendations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {crops.map((c) => (
          <Card key={c.name} className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <span>{c.emoji}</span> {c.name}
                <span className={`ml-auto flex items-center gap-1 text-xs font-medium ${
                  c.trend === "up" ? "text-primary" : "text-destructive"
                }`}>
                  {c.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {c.trend === "up" ? "Rising" : "Falling"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={c.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="m" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" domain={["auto", "auto"]} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="p" stroke={c.trend === "up" ? "hsl(var(--chart-green))" : "hsl(var(--chart-red))"} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Current: ₹{c.current}/q</span>
                <span className="text-muted-foreground">Predicted: ₹{c.predicted}/q</span>
              </div>
              <div className={`text-xs px-3 py-2 rounded-lg ${c.trend === "up" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                💡 {c.suggestion}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <DollarSign className="h-3 w-3" /> Est. Profit: {c.profit}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
