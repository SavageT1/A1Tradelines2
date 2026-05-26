/**
 * TradelineMaster API Service
 * Handles all API calls to the TradelineMaster vendor
 */

interface TradelineFromAPI {
  Id: number;
  Price: number;
  SpotsAvailable: number;
  Lender: string;
  Cycles: number;
  Limit: number;
  DateOpened: string;
  StatementDate: string;
  PostingDate: string;
  CardholderAddressID: number;
}

export interface TradelineItem {
  id: number;
  bank: string;
  creditLimit: number;
  ageYears: number;
  ageMonths: number;
  price: number;
  category: string;
  spotsAvailable: number;
  cycles: number;
  dateOpened: string;
}

// API Configuration
const API_BASE_URL = "https://www.tradelinemaster.com/api";
const API_USER_KEY = import.meta.env.VITE_TRADELINE_API_USER || "";
const API_PASS_KEY = import.meta.env.VITE_TRADELINE_API_PASS || "";
const REFERER_URL = "https://a1tradelines.com";
const API_VERSION = "3";

/**
 * Calculate the age in years from a date string
 */
function calculateAgeInYears(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const ageMs = now.getTime() - date.getTime();
  const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(ageYears);
}

/**
 * Categorize tradeline based on price and credit limit
 */
function categorizeTradelineByPrice(price: number, limit: number): string {
  if (price >= 900 || limit >= 30000) {
    return "Premium";
  } else if (price >= 500 || limit >= 15000) {
    return "Standard";
  } else {
    return "Economy";
  }
}

/**
 * Transform API response to internal format
 * Applies 50% markup to vendor prices
 */
function transformTradelineFromAPI(item: TradelineFromAPI): TradelineItem {
  const ageYears = calculateAgeInYears(item.DateOpened);
  const ageMonths = ageYears * 12;
  const markupPrice = item.Price * 1.5; // 50% markup

  return {
    id: item.Id,
    bank: item.Lender,
    creditLimit: item.Limit,
    ageYears,
    ageMonths,
    price: Math.round(markupPrice * 100) / 100, // Round to 2 decimal places
    category: categorizeTradelineByPrice(markupPrice, item.Limit),
    spotsAvailable: item.SpotsAvailable,
    cycles: item.Cycles,
    dateOpened: item.DateOpened,
  };
}

/**
 * Build Basic Auth header
 */
function buildAuthHeader(): string {
  const credentials = `${API_USER_KEY}:${API_PASS_KEY}`;
  const encoded = btoa(credentials);
  return `Basic ${encoded}`;
}

/**
 * Fetch all available tradelines from TradelineMaster API
 */
export async function fetchTradelines(): Promise<TradelineItem[]> {
  try {
    if (!API_USER_KEY || !API_PASS_KEY) {
      console.error("API credentials not configured");
      throw new Error("API credentials not configured");
    }

    const response = await fetch(`${API_BASE_URL}/Tradeline`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": buildAuthHeader(),
        "Referer": REFERER_URL,
        "APIVersion": API_VERSION,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: TradelineFromAPI[] = await response.json();
    return data.map(transformTradelineFromAPI);
  } catch (error) {
    console.error("Failed to fetch tradelines:", error);
    throw error;
  }
}

/**
 * Fetch a specific tradeline by ID
 */
export async function fetchTradelineById(id: number): Promise<TradelineItem> {
  try {
    if (!API_USER_KEY || !API_PASS_KEY) {
      throw new Error("API credentials not configured");
    }

    const response = await fetch(`${API_BASE_URL}/Tradeline/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": buildAuthHeader(),
        "Referer": REFERER_URL,
        "APIVersion": API_VERSION,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: TradelineFromAPI = await response.json();
    return transformTradelineFromAPI(data);
  } catch (error) {
    console.error("Failed to fetch tradeline:", error);
    throw error;
  }
}

/**
 * Get user account balance
 */
export async function fetchUserBalance(): Promise<number> {
  try {
    if (!API_USER_KEY || !API_PASS_KEY) {
      throw new Error("API credentials not configured");
    }

    const response = await fetch(`${API_BASE_URL}/User`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": buildAuthHeader(),
        "Referer": REFERER_URL,
        "APIVersion": API_VERSION,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.Balance || 0;
  } catch (error) {
    console.error("Failed to fetch user balance:", error);
    throw error;
  }
}
