const API_BASE_URL = "https://www.tradelinemaster.com/api";
const API_VERSION = "3";
const REFERER_URL = "https://a1tradelines.com";
const VENDOR_MARKUP_MULTIPLIER = 1.8;

type VendorTradeline = {
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
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type ApiRequest = {
  method?: string;
};

function getCredentials() {
  return {
    user: process.env.TRADELINE_API_USER || "",
    pass: process.env.TRADELINE_API_PASS || "",
  };
}

function buildAuthHeader(user: string, pass: string) {
  return `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;
}

function calculateAgeInYears(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 0;

  const now = new Date();
  const ageMs = now.getTime() - date.getTime();
  const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(0, Math.floor(ageYears));
}

function categorizeTradelineByPrice(price: number, limit: number) {
  if (price >= 900 || limit >= 30000) return "Premium";
  if (price >= 500 || limit >= 15000) return "Standard";
  return "Economy";
}

function transformTradeline(item: VendorTradeline) {
  const vendorPrice = Number(item.Price) || 0;
  const creditLimit = Number(item.Limit) || 0;
  const cycles = Number(item.Cycles) || 1;
  const ageYears = calculateAgeInYears(item.DateOpened);
  const markedUpPrice = vendorPrice * VENDOR_MARKUP_MULTIPLIER;

  return {
    id: item.Id,
    bank: item.Lender || "Unknown Bank",
    creditLimit,
    ageYears,
    ageMonths: ageYears * 12,
    price: Math.round(markedUpPrice * 100) / 100,
    category: categorizeTradelineByPrice(markedUpPrice, creditLimit),
    spotsAvailable: Number(item.SpotsAvailable) || 0,
    cycles,
    dateOpened: item.DateOpened,
    statementDate: item.StatementDate,
    postingDate: item.PostingDate,
  };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  if (req.method && req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { user, pass } = getCredentials();

  if (!user || !pass) {
    console.error("Tradeline API credentials are not configured on the server.");
    return res.status(500).json({
      success: false,
      message: "Tradeline inventory is not configured yet.",
    });
  }

  try {
    const vendorResponse = await fetch(`${API_BASE_URL}/Tradeline`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: buildAuthHeader(user, pass),
        Referer: REFERER_URL,
        APIVersion: API_VERSION,
      },
    });

    if (!vendorResponse.ok) {
      const detail = await vendorResponse.text().catch(() => "");
      console.error("Tradeline vendor API error", vendorResponse.status, detail.slice(0, 500));
      return res.status(502).json({
        success: false,
        message: "Vendor inventory API is not responding correctly.",
      });
    }

    const data = (await vendorResponse.json()) as VendorTradeline[];

    if (!Array.isArray(data)) {
      console.error("Tradeline vendor API returned an unexpected payload.");
      return res.status(502).json({
        success: false,
        message: "Vendor inventory API returned an unexpected response.",
      });
    }

    return res.status(200).json({
      success: true,
      data: data.map(transformTradeline),
    });
  } catch (error) {
    console.error("Tradeline inventory proxy failed", error);
    return res.status(502).json({
      success: false,
      message: "Unable to load tradeline inventory right now.",
    });
  }
}
