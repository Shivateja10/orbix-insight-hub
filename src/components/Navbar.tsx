import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/tokens", label: "Tokens" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <nav className="glass-panel-glow sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="h-8 w-8 rounded-lg gradient-bg animate-glow" />
              <div className="absolute inset-0 h-8 w-8 rounded-lg border-2 border-primary/50" />
            </div>
            <span className="text-xl font-bold glow-text-primary">Orbix</span>
            <span className="text-xl font-light text-muted-foreground">Intellegence</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant="ghost"
                  className={`relative ${
                    isActive(link.path)
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side - Theme Toggle & Wallet */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative overflow-hidden"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180, scale: theme === "dark" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <Moon className="h-5 w-5" />
              </motion.div>
              <motion.div
                initial={false}
                animate={{ rotate: theme === "light" ? 0 : 180, scale: theme === "light" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <Sun className="h-5 w-5" />
              </motion.div>
            </Button>

            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
