import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "../src/components/layout/ScrollToTop"; // 👈 ADD THIS
import BlogDetails from "./pages/BlogDetails";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import TechTrends from "./pages/TechTrends";
import SmoothScrollProvider from "./components/layout/SmoothScrollProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
      <SmoothScrollProvider>
        {/* 👇 GLOBAL SCROLL BUTTON */}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/our-work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        <Route
    path="/tech-trends"
    element={<TechTrends />}
/>
{/* 
<Route
    path="/tech-trends/:slug"
    element={<BlogDetails />}
/> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </SmoothScrollProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
