import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Monitor from "./pages/Monitor";
import LabelsUploadPage from "./pages/labels/upload";
import ProcessingPage from "./pages/labels/processing";
import ResultsPage from "./pages/labels/results";
import FraudDashboard from "./pages/fraud/dashboard";
import AlertsPage from "./pages/fraud/alerts";
import InsightsPage from "./pages/fraud/insights";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/monitor" element={<Monitor />} />
          <Route path="/labels/upload" element={<LabelsUploadPage />} />
          <Route path="/labels/processing" element={<ProcessingPage />} />
          <Route path="/labels/results" element={<ResultsPage />} />
          <Route path="/fraud/dashboard" element={<FraudDashboard />} />
          <Route path="/fraud/alerts" element={<AlertsPage />} />
          <Route path="/fraud/insights" element={<InsightsPage />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
