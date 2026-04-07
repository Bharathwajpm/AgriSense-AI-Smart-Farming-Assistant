import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

export function TopNav() {
  const { isDark, toggleTheme } = useAppContext();
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-sm font-semibold text-foreground hidden sm:block">AgriSense AI</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Mic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-xs text-muted-foreground">
          {isDark ? "☀️" : "🌙"}
        </Button>
      </div>
    </header>
  );
}
