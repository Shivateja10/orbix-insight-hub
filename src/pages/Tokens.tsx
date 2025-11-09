import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchTopTokens, type TokenPrice } from "@/lib/coingecko";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Tokens() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"market_cap" | "price" | "change">("market_cap");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data: tokens = [], isLoading } = useQuery({
    queryKey: ["tokens"],
    queryFn: () => fetchTopTokens(100),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const filteredTokens = tokens
    .filter(
      (token) =>
        token.name.toLowerCase().includes(search.toLowerCase()) ||
        token.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let aVal = 0;
      let bVal = 0;

      if (sortBy === "market_cap") {
        aVal = a.market_cap;
        bVal = b.market_cap;
      } else if (sortBy === "price") {
        aVal = a.current_price;
        bVal = b.current_price;
      } else if (sortBy === "change") {
        aVal = a.price_change_percentage_24h;
        bVal = b.price_change_percentage_24h;
      }

      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

  const toggleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 space-y-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold glow-text-cyan">Token Explorer</h1>
          <p className="text-muted-foreground mt-1">
            Browse and analyze over 100 cryptocurrencies
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tokens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 glass-panel"
          />
        </div>
      </div>

      <div className="glass-panel-glow rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Token</TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSort("price")}
                  className="hover:bg-transparent"
                >
                  Price <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSort("change")}
                  className="hover:bg-transparent"
                >
                  24h % <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSort("market_cap")}
                  className="hover:bg-transparent"
                >
                  Market Cap <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={6}>
                    <div className="h-12 animate-pulse bg-muted/50 rounded" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredTokens.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                  No tokens found matching your search
                </TableCell>
              </TableRow>
            ) : (
              filteredTokens.map((token: TokenPrice) => (
                <TableRow
                  key={token.id}
                  className="border-border/50 hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <TableCell className="font-medium text-muted-foreground">
                    {token.market_cap_rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={token.image}
                        alt={token.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{token.name}</p>
                        <p className="text-sm text-muted-foreground uppercase">
                          {token.symbol}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${token.current_price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-medium ${
                        token.price_change_percentage_24h > 0
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {token.price_change_percentage_24h > 0 ? "+" : ""}
                      {token.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    ${(token.market_cap / 1e9).toFixed(2)}B
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    ${(token.total_volume / 1e6).toFixed(0)}M
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
