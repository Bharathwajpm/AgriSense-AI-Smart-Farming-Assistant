import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, Sprout, Bug, Droplets, TrendingUp,
  Landmark, Bot, Bell, Settings, Leaf, Wifi, WifiOff, MapPin
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Crop Recommendation", url: "/crops", icon: Sprout },
  { title: "Disease Detection", url: "/disease", icon: Bug },
  { title: "Smart Irrigation", url: "/irrigation", icon: Droplets },
  { title: "Market Insights", url: "/market", icon: TrendingUp },
  { title: "Government Schemes", url: "/schemes", icon: Landmark },
  { title: "AI Assistant", url: "/assistant", icon: Bot },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="gradient-primary rounded-lg p-1.5">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            AgriSense AI
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                          active
                            ? "bg-sidebar-accent text-sidebar-primary font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3 group-data-[collapsible=icon]:hidden">
        <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
          <MapPin className="h-3 w-3" /> Tamil Nadu, India
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-flex items-center gap-1 text-xs bg-sidebar-accent px-2 py-0.5 rounded-full text-sidebar-primary">
            <Wifi className="h-3 w-3" /> Online
          </span>
          <span className="inline-flex items-center gap-1 text-xs bg-sidebar-accent/50 px-2 py-0.5 rounded-full text-sidebar-foreground/60">
            <WifiOff className="h-3 w-3" /> Offline Ready
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
