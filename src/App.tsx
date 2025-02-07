
import React, { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { handleFileUpload } from './lib/uploadHandler';

const queryClient = new QueryClient();

const App = () => {
  const [changes, setChanges] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        const data = await handleFileUpload('/src/lib/data-today.json');
        setChanges(data);
      } catch (error) {
        console.error('Error fetching changes:', error);
        setChanges({});
      }
    };

    fetchChanges();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index changes={changes} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
