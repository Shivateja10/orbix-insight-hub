import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { wagmiConfig } from "@/lib/wagmi";
import { Navbar } from "@/components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tokens from "./pages/Tokens";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

function AppContent() {
  const { theme } = useTheme();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={theme === "dark" ? darkTheme() : lightTheme()}
          modalSize="compact"
        >
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen w-full bg-background text-foreground">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tokens" element={<Tokens />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
