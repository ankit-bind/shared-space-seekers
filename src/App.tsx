
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";

// Layout
import MainLayout from "./components/MainLayout";
import { useState } from "react";

// Create Query Client for React Query
const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);

  // Auth routes don't use the main layout
  const isAuthRoute = (pathname: string) => {
    return pathname === "/auth";
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Routes with MainLayout */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/listings" element={<MainLayout><Listings /></MainLayout>} />
            <Route path="/listings/:id" element={<MainLayout><ListingDetail /></MainLayout>} />
            <Route path="/create-listing" element={<MainLayout><CreateListing /></MainLayout>} />
            <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
            <Route path="/messages" element={<MainLayout><Messages /></MainLayout>} />
            
            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
