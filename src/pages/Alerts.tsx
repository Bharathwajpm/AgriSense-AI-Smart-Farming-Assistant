import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Bug, TrendingUp, AlertTriangle, Info } from "lucide-react";

const alerts = [
  { type: "Weather", icon: Cloud, priority: "High", title: "Heavy Rainfall Warning", desc: "Expected 80mm rainfall in next 48 hours. Secure stored crops and avoid spraying pesticides.", time: "2 hours ago", color: "destructive" as const },
  { type: "Disease", icon: Bug, priority: "High", title: "Leaf Blight Outbreak Alert", desc: "Bacterial leaf blight detected in neighboring fields. Inspect your rice paddies immediately.", time: "5 hours ago", color: "destructive" as const },
  { type: "Market", icon: TrendingUp, priority: "Medium", title: "Rice Price Surge", desc: "Rice prices up 8% this week due to export demand. Consider selling stored stock.", time: "1 day ago", color: "warning" as const },
  { type: "Weather", icon: Cloud, priority: "Medium", title: "Temperature Drop Expected", desc: "Night temperatures expected to drop to 12°C. Protect young seedlings with mulch cover.", time: "1 day ago", color: "warning" as const },
  { type: "Disease", icon: Bug, priority: "Low", title: "Fungal Risk Advisory", desc: "Humid conditions increasing powdery mildew risk. Preventive sulphur spray recommended.", time: "2 days ago", color: "info" as const },
  { type: "Market", icon: TrendingUp, priority: "Low", title: "Government MSP Update", desc: "New Minimum Support Prices announced for Rabi season 2026. Check eligible crops.", time: "3 days ago", color: "info" as const },
];

const colorMap = {
  destructive: { bg: "bg-destructive/10", text: "text-destructive", icon: "text-destructive" },
  warning: { bg: "bg-warning/10", text: "text-warning", icon: "text-warning" },
  info: { bg: "bg-info/10", text: "text-info", icon: "text-info" },
};

export default function Alerts() {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Alerts</h1>
        <p className="text-sm text-muted-foreground">Stay updated with important notifications.</p>
      </div>

      <div className="space-y-3">
        {alerts.map((a, i) => {
          const c = colorMap[a.color];
          return (
            <Card key={i} className="glass-card hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`rounded-lg p-2 ${c.bg}`}>
                  <a.icon className={`h-4 w-4 ${c.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-foreground text-sm">{a.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>{a.priority}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{a.time} · {a.type}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
