// CoinGecko API utilities
const COINGECKO_API = "https://api.coingecko.com/api/v3";

export interface TokenPrice {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d?: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface MarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

// Fetch top tokens by market cap
export async function fetchTopTokens(limit = 50): Promise<TokenPrice[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=7d`
    );
    if (!response.ok) throw new Error("Failed to fetch tokens");
    return response.json();
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
}

// Fetch price history for a specific token
export async function fetchTokenHistory(
  tokenId: string,
  days: number = 7
): Promise<MarketData | null> {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`
    );
    if (!response.ok) throw new Error("Failed to fetch token history");
    return response.json();
  } catch (error) {
    console.error("Error fetching token history:", error);
    return null;
  }
}

// Fetch detailed token info
export async function fetchTokenDetails(tokenId: string) {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/${tokenId}?localization=false&tickers=false&community_data=false&developer_data=false`
    );
    if (!response.ok) throw new Error("Failed to fetch token details");
    return response.json();
  } catch (error) {
    console.error("Error fetching token details:", error);
    return null;
  }
}

// Search tokens
export async function searchTokens(query: string) {
  try {
    const response = await fetch(`${COINGECKO_API}/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Failed to search tokens");
    return response.json();
  } catch (error) {
    console.error("Error searching tokens:", error);
    return { coins: [] };
  }
}
