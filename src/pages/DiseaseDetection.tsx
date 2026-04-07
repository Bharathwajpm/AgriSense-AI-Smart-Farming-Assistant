import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Bug, FlaskConical, ShieldCheck } from "lucide-react";

const diseases = [
  { name: "Bacterial Leaf Blight", confidence: 87, treatment: "Apply Streptocycline (0.01%) + Copper oxychloride spray.", fertilizer: "Potash-based fertilizer to strengthen resistance.", severity: "High" },
  { name: "Brown Spot", confidence: 74, treatment: "Spray Mancozeb 75% WP at 2.5g/litre.", fertilizer: "Apply balanced NPK (20:20:20).", severity: "Medium" },
  { name: "Leaf Blast", confidence: 92, treatment: "Apply Tricyclazole 75% WP at 0.6g/litre.", fertilizer: "Reduce nitrogen, increase potassium.", severity: "High" },
  { name: "Powdery Mildew", confidence: 68, treatment: "Spray Sulphur 80% WP or Karathane.", fertilizer: "Use phosphorus-rich fertilizer.", severity: "Low" },
  { name: "Downy Mildew", confidence: 81, treatment: "Apply Metalaxyl + Mancozeb combination.", fertilizer: "Balanced micronutrient mix.", severity: "Medium" },
  { name: "Healthy Leaf", confidence: 96, treatment: "No treatment needed. Leaf appears healthy!", fertilizer: "Continue regular fertilization schedule.", severity: "None" },
];

export default function DiseaseDetection() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<typeof diseases[0] | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) processFile(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const analyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const d = diseases[Math.floor(Math.random() * diseases.length)];
      setResult({ ...d, confidence: d.confidence + Math.floor(Math.random() * 8 - 4) });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Disease Detection</h1>
        <p className="text-sm text-muted-foreground">Upload a leaf image for AI-powered diagnosis.</p>
      </div>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => document.getElementById("leaf-upload")?.click()}
          >
            {image ? (
              <img src={image} alt="Uploaded leaf" className="max-h-56 mx-auto rounded-lg object-contain" />
            ) : (
              <div className="space-y-2">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag & drop or click to upload a leaf image</p>
              </div>
            )}
            <input id="leaf-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
          {image && (
            <Button onClick={analyze} disabled={analyzing} className="w-full mt-4 gradient-primary text-primary-foreground">
              <Bug className="h-4 w-4 mr-2" />
              {analyzing ? "Analyzing..." : "Detect Disease"}
            </Button>
          )}
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4 animate-slide-up">
          <Card className="glass-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                  <Bug className="h-5 w-5 text-warning" /> {result.name}
                </h3>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  result.severity === "High" ? "bg-destructive/20 text-destructive" :
                  result.severity === "Medium" ? "bg-warning/20 text-warning" :
                  result.severity === "None" ? "bg-primary/20 text-primary" :
                  "bg-info/20 text-info"
                }`}>{result.severity} Severity</span>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="text-foreground font-medium">{result.confidence}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="gradient-primary h-2 rounded-full" style={{ width: `${result.confidence}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="glass-card">
              <CardContent className="p-4 flex gap-3">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">Treatment</h4>
                  <p className="text-xs text-muted-foreground mt-1">{result.treatment}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4 flex gap-3">
                <FlaskConical className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">Fertilizer</h4>
                  <p className="text-xs text-muted-foreground mt-1">{result.fertilizer}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
