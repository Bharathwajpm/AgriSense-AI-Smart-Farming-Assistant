import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sprout, Leaf, Droplets, Thermometer } from "lucide-react";

const cropDatabase: Record<string, { crops: { name: string; score: number; reason: string; emoji: string }[] }> = {
  loamy: {
    crops: [
      { name: "Rice", score: 92, reason: "Excellent water retention in loamy soil", emoji: "🌾" },
      { name: "Wheat", score: 88, reason: "Loamy soil provides ideal nutrient mix", emoji: "🌿" },
      { name: "Sugarcane", score: 85, reason: "Deep roots thrive in loamy texture", emoji: "🎋" },
      { name: "Cotton", score: 78, reason: "Good drainage supports cotton growth", emoji: "☁️" },
    ],
  },
  clay: {
    crops: [
      { name: "Rice", score: 95, reason: "Clay retains water perfectly for paddy", emoji: "🌾" },
      { name: "Lentils", score: 80, reason: "Nitrogen fixation works well in clay", emoji: "🫘" },
      { name: "Broccoli", score: 75, reason: "Shallow roots suitable for clay", emoji: "🥦" },
      { name: "Cabbage", score: 72, reason: "Tolerates heavy soil conditions", emoji: "🥬" },
    ],
  },
  sandy: {
    crops: [
      { name: "Groundnut", score: 90, reason: "Sandy soil allows easy pod development", emoji: "🥜" },
      { name: "Watermelon", score: 88, reason: "Fast drainage ideal for melons", emoji: "🍉" },
      { name: "Carrot", score: 85, reason: "Loose soil helps root elongation", emoji: "🥕" },
      { name: "Millet", score: 82, reason: "Drought-resistant, suits sandy soil", emoji: "🌿" },
    ],
  },
  silt: {
    crops: [
      { name: "Vegetables", score: 90, reason: "Rich silt provides ample nutrients", emoji: "🥗" },
      { name: "Rice", score: 87, reason: "Moisture retention supports paddy", emoji: "🌾" },
      { name: "Maize", score: 83, reason: "Fertile silt boosts corn yield", emoji: "🌽" },
      { name: "Soybean", score: 80, reason: "Good aeration for legume roots", emoji: "🫛" },
    ],
  },
  red: {
    crops: [
      { name: "Groundnut", score: 88, reason: "Iron-rich soil suits groundnut", emoji: "🥜" },
      { name: "Ragi", score: 86, reason: "Thrives in red laterite soil", emoji: "🌾" },
      { name: "Tomato", score: 82, reason: "Well-drained red soil is ideal", emoji: "🍅" },
      { name: "Potato", score: 78, reason: "Tubers develop well in red soil", emoji: "🥔" },
    ],
  },
  black: {
    crops: [
      { name: "Cotton", score: 94, reason: "Black soil is the best for cotton", emoji: "☁️" },
      { name: "Soybean", score: 88, reason: "High moisture retention for soy", emoji: "🫛" },
      { name: "Wheat", score: 85, reason: "Rich minerals support wheat", emoji: "🌿" },
      { name: "Sunflower", score: 80, reason: "Deep roots access nutrients", emoji: "🌻" },
    ],
  },
};

function adjustScore(base: number, ph: number, temp: number, rain: number) {
  let adj = base;
  if (ph >= 6 && ph <= 7.5) adj += 3;
  else if (ph < 5 || ph > 8.5) adj -= 10;
  if (temp >= 20 && temp <= 35) adj += 2;
  else adj -= 5;
  if (rain >= 800 && rain <= 1500) adj += 3;
  else if (rain > 2000) adj -= 3;
  return Math.max(0, Math.min(100, adj));
}

export default function CropRecommendation() {
  const [soil, setSoil] = useState("");
  const [ph, setPh] = useState([6.5]);
  const [temp, setTemp] = useState([28]);
  const [rain, setRain] = useState([1000]);
  const [results, setResults] = useState<{ name: string; score: number; reason: string; emoji: string }[] | null>(null);

  const handleRecommend = () => {
    const data = cropDatabase[soil];
    if (!data) return;
    const adjusted = data.crops.map((c) => ({
      ...c,
      score: adjustScore(c.score, ph[0], temp[0], rain[0]),
      reason: c.reason + (rain[0] > 1500 ? " • High rainfall area" : rain[0] < 600 ? " • Low rainfall – irrigation needed" : ""),
    }));
    setResults(adjusted.sort((a, b) => b.score - a.score));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Crop Recommendation</h1>
        <p className="text-sm text-muted-foreground">Enter your field conditions for AI-powered crop suggestions.</p>
      </div>

      <Card className="glass-card">
        <CardContent className="p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Soil Type</label>
            <Select value={soil} onValueChange={setSoil}>
              <SelectTrigger><SelectValue placeholder="Select soil type" /></SelectTrigger>
              <SelectContent>
                {Object.keys(cropDatabase).map((s) => (
                  <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)} Soil</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-1">
              <Leaf className="h-3 w-3" /> pH Level: {ph[0]}
            </label>
            <Slider value={ph} onValueChange={setPh} min={3} max={10} step={0.1} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-1">
              <Thermometer className="h-3 w-3" /> Temperature: {temp[0]}°C
            </label>
            <Slider value={temp} onValueChange={setTemp} min={5} max={50} step={1} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-1">
              <Droplets className="h-3 w-3" /> Annual Rainfall: {rain[0]} mm
            </label>
            <Slider value={rain} onValueChange={setRain} min={200} max={3000} step={50} />
          </div>
          <Button onClick={handleRecommend} disabled={!soil} className="w-full gradient-primary text-primary-foreground">
            <Sprout className="h-4 w-4 mr-2" /> Get Recommendations
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-up">
          {results.map((c) => (
            <Card key={c.name} className="glass-card hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{c.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">Suitability</p>
                  </div>
                  <div className="ml-auto text-right">
                    <span className={`text-xl font-bold ${c.score >= 80 ? "text-primary" : c.score >= 60 ? "text-warning" : "text-destructive"}`}>
                      {c.score}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="gradient-primary h-2 rounded-full transition-all" style={{ width: `${c.score}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{c.reason}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
