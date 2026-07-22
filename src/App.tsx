import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "../src/components/layout/ScrollToTop"; // 👈 ADD THIS
import BlogDetails from "./pages/BlogDetails";
import BlogsPage from "./pages/TechTrends";
import Login from "./pages/superadmin/Login";
import Dashboard from "./pages/superadmin/Dashboard";
import CreateBlog from "./pages/superadmin/CreateBlog";
import EditBlog from "./pages/superadmin/EditBlog";

import Index from "./pages/Index";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import TechTrends from "./pages/TechTrends";
import SmoothScrollProvider from "./components/layout/SmoothScrollProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogDetailPage from "./pages/BlogDetails";

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
  <Route path="/tech-trends" element={<BlogsPage />} />
        <Route path="/tech-trends/:slug" element={<BlogDetailPage />} />
        
        {/* Superadmin Auth */}
        <Route path="/superadmin/login" element={<Login />} />
        
        {/* Protected Superadmin Routes */}
        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        
          <Route path="*" element={<NotFound />} />
          
        </Routes>
        </SmoothScrollProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
