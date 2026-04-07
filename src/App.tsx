import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import CropRecommendation from "./pages/CropRecommendation";
import DiseaseDetection from "./pages/DiseaseDetection";
import SmartIrrigation from "./pages/SmartIrrigation";
import MarketInsights from "./pages/MarketInsights";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import AIAssistant from "./pages/AIAssistant";
import Alerts from "./pages/Alerts";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/crops" element={<CropRecommendation />} />
              <Route path="/disease" element={<DiseaseDetection />} />
              <Route path="/irrigation" element={<SmartIrrigation />} />
              <Route path="/market" element={<MarketInsights />} />
              <Route path="/schemes" element={<GovernmentSchemes />} />
              <Route path="/assistant" element={<AIAssistant />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
