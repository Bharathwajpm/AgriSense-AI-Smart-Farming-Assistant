import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droplets, ThermometerSun, CloudRain } from "lucide-react";

function getIrrigationAdvice(moisture: number, weather: string) {
  const isRainy = weather === "rainy" || weather === "stormy";
  const isHot = weather === "hot";

  let waterLiters: number;
  let recommendation: string;
  let shouldWater: boolean;
  let details: string;

  if (moisture > 70 || isRainy) {
    shouldWater = false;
    waterLiters = 0;
    recommendation = "Skip Irrigation";
    details = isRainy
      ? "Rain is expected. Save water and let nature do the work."
      : "Soil moisture is sufficient. No watering needed today.";
  } else if (moisture > 40) {
    shouldWater = true;
    waterLiters = Math.round((70 - moisture) * 15 + (isHot ? 200 : 0));
    recommendation = "Light Watering";
    details = `Soil is moderately moist. Apply ${waterLiters}L per acre for optimal growth.`;
  } else {
    shouldWater = true;
    waterLiters = Math.round((70 - moisture) * 20 + (isHot ? 300 : 100));
    recommendation = "Water Today";
    details = `Soil is dry! Immediate irrigation recommended. Apply ${waterLiters}L per acre.`;
  }

  return { shouldWater, waterLiters, recommendation, details };
}

export default function SmartIrrigation() {
  const [moisture, setMoisture] = useState([50]);
  const [weather, setWeather] = useState("sunny");
  const [result, setResult] = useState<ReturnType<typeof getIrrigationAdvice> | null>(null);

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Smart Irrigation</h1>
        <p className="text-sm text-muted-foreground">AI-optimized watering schedule based on conditions.</p>
      </div>

      <Card className="glass-card">
        <CardContent className="p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-1">
              <Droplets className="h-3 w-3" /> Soil Moisture: {moisture[0]}%
            </label>
            <Slider value={moisture} onValueChange={setMoisture} min={0} max={100} step={1} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-1">
              <ThermometerSun className="h-3 w-3" /> Weather Condition
            </label>
            <Select value={weather} onValueChange={setWeather}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sunny">☀️ Sunny</SelectItem>
                <SelectItem value="cloudy">⛅ Cloudy</SelectItem>
                <SelectItem value="rainy">🌧️ Rainy</SelectItem>
                <SelectItem value="hot">🔥 Hot & Dry</SelectItem>
                <SelectItem value="stormy">⛈️ Stormy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setResult(getIrrigationAdvice(moisture[0], weather))} className="w-full gradient-primary text-primary-foreground">
            <CloudRain className="h-4 w-4 mr-2" /> Calculate Irrigation
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className={`animate-slide-up border-2 ${result.shouldWater ? "border-destructive/30" : "border-primary/30"}`}>
          <CardContent className="p-6 text-center space-y-3">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
              result.shouldWater ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"
            }`}>
              <Droplets className="h-4 w-4" /> {result.recommendation}
            </div>
            {result.waterLiters > 0 && (
              <p className="text-3xl font-bold text-foreground">{result.waterLiters} L/acre</p>
            )}
            <p className="text-sm text-muted-foreground">{result.details}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
