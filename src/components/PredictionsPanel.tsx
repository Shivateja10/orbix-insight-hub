import { useState } from "react";
import { TrendingUp, TrendingDown, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Prediction {
  direction: "UP" | "DOWN";
  confidence: number;
  changePercent: number;
  horizon: string;
}

export function PredictionsPanel() {
  const [loading, setLoading] = useState(false);
  const [prediction] = useState<Prediction>({
    direction: "UP",
    confidence: 78,
    changePercent: 3.2,
    horizon: "1h",
  });

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 1500);
  };

  const isUp = prediction.direction === "UP";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel-glow rounded-xl p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold">AI Predictions</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={loading}
          className="h-8 w-8"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`rounded-lg p-3 ${
                isUp ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              }`}
            >
              {isUp ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next {prediction.horizon}</p>
              <p className="text-2xl font-bold">
                {isUp ? "+" : "-"}{prediction.changePercent}%
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Confidence</p>
            <p className="text-2xl font-bold text-primary">{prediction.confidence}%</p>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Prediction Model</span>
            <span className="font-medium">GPT-5 + Market Analysis</span>
          </div>
          <div className="h-2 w-full rounded-full bg-background">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${prediction.confidence}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          AI predictions are probabilistic and should not be the sole basis for trading decisions
        </p>
      </div>
    </motion.div>
  );
}
