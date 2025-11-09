import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Activity, BarChart3 } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { PriceChart } from "@/components/PriceChart";
import { PredictionsPanel } from "@/components/PredictionsPanel";
import { fetchTokenHistory, fetchTokenDetails } from "@/lib/coingecko";

export default function Dashboard() {
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [ethChange, setEthChange] = useState<number | null>(null);

  // Fetch ETH price and history
  const { data: ethHistory } = useQuery({
    queryKey: ["eth-history"],
    queryFn: () => fetchTokenHistory("ethereum", 7),
    refetchInterval: 60000, // Refetch every minute
  });

  const { data: ethDetails } = useQuery({
    queryKey: ["eth-details"],
    queryFn: () => fetchTokenDetails("ethereum"),
    refetchInterval: 60000,
  });

  useEffect(() => {
    if (ethDetails) {
      setEthPrice(ethDetails.market_data?.current_price?.usd || null);
      setEthChange(ethDetails.market_data?.price_change_percentage_24h || null);
    }
  }, [ethDetails]);

  const chartData =
    ethHistory?.prices?.map(([timestamp, price]) => ({
      timestamp,
      price,
    })) || [];

  const marketCap = ethDetails?.market_data?.market_cap?.usd || 0;
  const volume = ethDetails?.market_data?.total_volume?.usd || 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="ETH Price"
          value={ethPrice ? `$${ethPrice.toLocaleString()}` : "Loading..."}
          change={ethChange || undefined}
          icon={<DollarSign className="h-6 w-6" />}
          loading={!ethPrice}
        />
        <StatCard
          label="Market Cap"
          value={`$${(marketCap / 1e9).toFixed(2)}B`}
          icon={<BarChart3 className="h-6 w-6" />}
          loading={!marketCap}
        />
        <StatCard
          label="24h Volume"
          value={`$${(volume / 1e9).toFixed(2)}B`}
          icon={<Activity className="h-6 w-6" />}
          loading={!volume}
        />
        <StatCard
          label="Total Gainers"
          value="142"
          change={12.5}
          icon={<TrendingUp className="h-6 w-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PriceChart data={chartData} title="Ethereum Price Chart" />
        </div>
        <div>
          <PredictionsPanel />
        </div>
      </div>

      {/* Market Movers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel-glow rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Top Market Movers</h3>
        <div className="space-y-3">
          {[
            { name: "Bitcoin", symbol: "BTC", change: 5.23, price: 67432 },
            { name: "Ethereum", symbol: "ETH", change: 3.45, price: 3456 },
            { name: "Solana", symbol: "SOL", change: -2.12, price: 142 },
          ].map((token) => (
            <div
              key={token.symbol}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                <div>
                  <p className="font-medium">{token.name}</p>
                  <p className="text-sm text-muted-foreground">{token.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${token.price.toLocaleString()}</p>
                <p
                  className={`text-sm ${
                    token.change > 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  {token.change > 0 ? "+" : ""}
                  {token.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
