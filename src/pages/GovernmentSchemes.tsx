import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Landmark, CheckCircle } from "lucide-react";

const allSchemes = [
  { name: "PM-Kisan Samman Nidhi", benefit: "₹6,000/year direct transfer", desc: "Income support for small and marginal farmers.", minLand: 0, maxLand: 5, maxIncome: 200000, category: "all" },
  { name: "Pradhan Mantri Fasal Bima Yojana", benefit: "Crop insurance at low premium", desc: "Protects against crop loss due to natural calamities.", minLand: 0, maxLand: 100, maxIncome: 500000, category: "all" },
  { name: "Kisan Credit Card", benefit: "Low-interest credit up to ₹3 Lakh", desc: "Short-term credit for crop production and post-harvest.", minLand: 0, maxLand: 100, maxIncome: 500000, category: "all" },
  { name: "Soil Health Card Scheme", benefit: "Free soil testing & recommendations", desc: "Government-issued soil health card with nutrient status.", minLand: 0, maxLand: 100, maxIncome: 1000000, category: "all" },
  { name: "PM Krishi Sinchai Yojana", benefit: "Subsidy on irrigation equipment", desc: "Per drop more crop – micro irrigation subsidy up to 55%.", minLand: 1, maxLand: 100, maxIncome: 500000, category: "all" },
  { name: "National Mission on Sustainable Agriculture", benefit: "Training + equipment subsidy", desc: "Promotes climate-resilient practices and organic farming.", minLand: 0, maxLand: 50, maxIncome: 300000, category: "all" },
  { name: "SC/ST Farmers Support", benefit: "Additional 10% subsidy", desc: "Extra financial support for SC/ST category farmers.", minLand: 0, maxLand: 10, maxIncome: 300000, category: "sc_st" },
  { name: "Women Farmer Empowerment Scheme", benefit: "₹25,000 one-time grant", desc: "Supports women-led farming households.", minLand: 0, maxLand: 10, maxIncome: 200000, category: "women" },
];

export default function GovernmentSchemes() {
  const [income, setIncome] = useState([150000]);
  const [land, setLand] = useState([3]);
  const [category, setCategory] = useState("all");
  const [results, setResults] = useState<typeof allSchemes | null>(null);

  const handleSearch = () => {
    const eligible = allSchemes.filter(
      (s) =>
        income[0] <= s.maxIncome &&
        land[0] >= s.minLand &&
        land[0] <= s.maxLand &&
        (s.category === "all" || s.category === category)
    );
    setResults(eligible);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Government Schemes</h1>
        <p className="text-sm text-muted-foreground">Find schemes you're eligible for.</p>
      </div>

      <Card className="glass-card">
        <CardContent className="p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Annual Income: ₹{income[0].toLocaleString()}</label>
            <Slider value={income} onValueChange={setIncome} min={50000} max={1000000} step={10000} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Land Size: {land[0]} acres</label>
            <Slider value={land} onValueChange={setLand} min={0.5} max={50} step={0.5} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">General</SelectItem>
                <SelectItem value="sc_st">SC/ST</SelectItem>
                <SelectItem value="women">Women Farmer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSearch} className="w-full gradient-primary text-primary-foreground">
            <Landmark className="h-4 w-4 mr-2" /> Find Eligible Schemes
          </Button>
        </CardContent>
      </Card>

      {results !== null && (
        <div className="space-y-3 animate-slide-up">
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No schemes found for the given criteria.</p>
          ) : (
            results.map((s) => (
              <Card key={s.name} className="glass-card hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm">{s.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                      <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {s.benefit}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
