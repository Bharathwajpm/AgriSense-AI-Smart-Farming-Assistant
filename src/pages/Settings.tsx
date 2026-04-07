import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";
import { Globe, Moon, Bell, Smartphone } from "lucide-react";

export default function SettingsPage() {
  const { language, setLanguage, isDark, toggleTheme } = useAppContext();

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure your AgriSense AI experience.</p>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Globe className="h-4 w-4" /> Language</CardTitle></CardHeader>
        <CardContent>
          <Select value={language} onValueChange={(v) => setLanguage(v as any)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
              <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Moon className="h-4 w-4" /> Appearance</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label>Dark Mode</Label>
            <Switch checked={isDark} onCheckedChange={toggleTheme} />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Weather Alerts</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>Disease Warnings</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>Market Updates</Label>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Smartphone className="h-4 w-4" /> App Info</CardTitle></CardHeader>
        <CardContent className="text-xs text-muted-foreground space-y-1">
          <p>AgriSense AI v1.0.0</p>
          <p>Demo Mode – Simulated AI responses</p>
        </CardContent>
      </Card>
    </div>
  );
}
