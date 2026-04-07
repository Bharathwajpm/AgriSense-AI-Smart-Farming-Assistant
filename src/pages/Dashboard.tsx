import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Thermometer, Droplets, Wind, TrendingUp, Sprout, AlertTriangle, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const weatherData = { temp: 28, humidity: 72, wind: 12, condition: "Partly Cloudy", rain: "15% chance" };

const growthData = [
  { week: "W1", rice: 12, wheat: 8, corn: 5 },
  { week: "W2", rice: 22, wheat: 15, corn: 12 },
  { week: "W3", rice: 35, wheat: 28, corn: 22 },
  { week: "W4", rice: 50, wheat: 40, corn: 35 },
  { week: "W5", rice: 68, wheat: 55, corn: 48 },
  { week: "W6", rice: 82, wheat: 68, corn: 60 },
  { week: "W7", rice: 90, wheat: 78, corn: 72 },
  { week: "W8", rice: 95, wheat: 85, corn: 80 },
];

const priceData = [
  { month: "Jan", rice: 2200, wheat: 2050, corn: 1800 },
  { month: "Feb", rice: 2250, wheat: 2020, corn: 1850 },
  { month: "Mar", rice: 2180, wheat: 2100, corn: 1900 },
  { month: "Apr", rice: 2320, wheat: 2080, corn: 1870 },
  { month: "May", rice: 2400, wheat: 2150, corn: 1950 },
  { month: "Jun", rice: 2380, wheat: 2200, corn: 2000 },
];

const alerts = [
  { type: "weather", text: "Heavy rainfall expected in 2 days", priority: "High", icon: Cloud },
  { type: "disease", text: "Leaf blight risk in rice paddies", priority: "Medium", icon: AlertTriangle },
  { type: "market", text: "Wheat prices rising – consider selling", priority: "Low", icon: TrendingUp },
];

const stats = [
  { label: "Active Crops", value: "4", icon: Sprout, change: "+1 this month" },
  { label: "Est. Yield", value: "2.8 ton", icon: TrendingUp, change: "+12% vs last" },
  { label: "Profit Estimate", value: "₹1.2L", icon: DollarSign, change: "+8% projected" },
  { label: "Alerts", value: "3", icon: AlertTriangle, change: "1 high priority" },
];

export default function Dashboard() {
  const time = useMemo(() => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }), []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back, Farmer! Here's your farm overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="glass-card">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="gradient-primary rounded-lg p-2">
                <s.icon className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-primary">{s.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weather + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="glass-card lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Cloud className="h-4 w-4 text-info" /> Weather Now
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold text-foreground">{weatherData.temp}°C</div>
            <p className="text-sm text-muted-foreground">{weatherData.condition}</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Droplets className="h-3 w-3" /> {weatherData.humidity}%
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Wind className="h-3 w-3" /> {weatherData.wind} km/h
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Cloud className="h-3 w-3" /> {weatherData.rain}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Updated at {time}</p>
          </CardContent>
        </Card>

        <Card className="glass-card lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                <a.icon className="h-4 w-4 text-warning shrink-0" />
                <span className="text-sm text-foreground flex-1">{a.text}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  a.priority === "High" ? "bg-destructive/20 text-destructive" :
                  a.priority === "Medium" ? "bg-warning/20 text-warning" :
                  "bg-primary/20 text-primary"
                }`}>{a.priority}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Crop Growth Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Line type="monotone" dataKey="rice" stroke="hsl(var(--chart-green))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="wheat" stroke="hsl(var(--chart-orange))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="corn" stroke="hsl(var(--chart-blue))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Market Price Trends (₹/quintal)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="rice" fill="hsl(var(--chart-green))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="wheat" fill="hsl(var(--chart-orange))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="corn" fill="hsl(var(--chart-blue))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
