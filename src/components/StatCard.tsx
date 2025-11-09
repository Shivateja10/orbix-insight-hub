import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
  loading?: boolean;
}

export function StatCard({ label, value, change, icon, loading }: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel-glow rounded-xl p-6 hover:shadow-primary/20 transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          {loading ? (
            <div className="h-8 w-32 animate-pulse bg-muted rounded" />
          ) : (
            <p className="text-2xl font-bold">{value}</p>
          )}
          {change !== undefined && !loading && (
            <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-success" : isNegative ? "text-destructive" : "text-muted-foreground"}`}>
              {isPositive ? <TrendingUp className="h-4 w-4" /> : isNegative ? <TrendingDown className="h-4 w-4" /> : null}
              <span className="font-medium">{change > 0 ? "+" : ""}{change.toFixed(2)}%</span>
              <span className="text-muted-foreground">24h</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
