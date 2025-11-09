import { motion } from "framer-motion";
import { User, Settings, Bell, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAccount } from "wagmi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Profile() {
  const { isConnected, address } = useAccount();

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="glass-panel-glow rounded-xl p-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-6">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-6">
            Connect your wallet to access your profile settings
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 space-y-6 max-w-4xl"
    >
      <div>
        <h1 className="text-3xl font-bold glow-text-cyan">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      {/* Wallet Info */}
      <Card className="glass-panel-glow p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Wallet Address</h3>
            <p className="font-mono text-sm text-muted-foreground">
              {address?.slice(0, 16)}...{address?.slice(-16)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
          <Shield className="h-5 w-5 text-success" />
          <div>
            <p className="font-medium text-success">Connected & Verified</p>
            <p className="text-sm text-muted-foreground">Your wallet is securely connected</p>
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card className="glass-panel-glow p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Preferences</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currency">Display Currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger id="currency" className="glass-panel">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
                <SelectItem value="inr">INR (₹)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chart-style">Chart Style</Label>
            <Select defaultValue="area">
              <SelectTrigger id="chart-style" className="glass-panel">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area">Area Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="candle">Candlestick</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-url">Predictions API URL</Label>
            <Input
              id="api-url"
              placeholder="https://api.example.com/predict"
              className="glass-panel"
            />
            <p className="text-sm text-muted-foreground">
              Configure your AI predictions API endpoint (optional)
            </p>
          </div>

          <Button className="w-full">Save Preferences</Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="glass-panel-glow p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>

        <div className="space-y-4">
          {[
            { label: "Price Alerts", description: "Get notified when prices reach your targets" },
            { label: "Market News", description: "Receive updates on market movements" },
            { label: "AI Predictions", description: "Get alerts for new AI predictions" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
