import { motion } from "framer-motion";
import { Wallet, Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAccount } from "wagmi";

export default function Portfolio() {
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
            <Wallet className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-6">
            Connect your wallet to view your portfolio holdings and track performance
          </p>
          <p className="text-sm text-muted-foreground">
            Click the "Connect Wallet" button in the top right corner to get started
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold glow-text-cyan">Portfolio</h1>
          <p className="text-muted-foreground mt-1">
            Track your crypto holdings and performance
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Token
        </Button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-panel-glow p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Value</p>
          <p className="text-3xl font-bold">$0.00</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-success">+0.00%</span>
            <span>24h</span>
          </div>
        </Card>

        <Card className="glass-panel-glow p-6">
          <p className="text-sm text-muted-foreground mb-2">Total P/L</p>
          <p className="text-3xl font-bold text-success">$0.00</p>
          <p className="text-sm text-muted-foreground mt-2">All time</p>
        </Card>

        <Card className="glass-panel-glow p-6">
          <p className="text-sm text-muted-foreground mb-2">Holdings</p>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-muted-foreground mt-2">Tokens tracked</p>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card className="glass-panel-glow p-6">
        <h3 className="text-lg font-semibold mb-4">Your Holdings</h3>
        <div className="text-center py-12 text-muted-foreground">
          <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No holdings found</p>
          <p className="text-sm">
            Start tracking your portfolio by adding your first token
          </p>
          <Button className="mt-6 gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Token
          </Button>
        </div>
      </Card>

      {/* Wallet Info */}
      <Card className="glass-panel-glow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Connected Wallet</p>
              <p className="font-mono text-sm">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Copy Address
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
