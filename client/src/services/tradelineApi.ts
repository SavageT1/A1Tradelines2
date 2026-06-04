/**
 * Tradeline inventory client service.
 *
 * The browser calls our own API route so vendor credentials stay private on the server.
 */

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
  statementDate: string;
  postingDate: string;
}

type TradelineApiResponse =
  | { success: true; data: TradelineItem[] }
  | { success: false; message?: string };

export async function fetchTradelines(): Promise<TradelineItem[]> {
  const response = await fetch("/api/tradelines", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  let payload: TradelineApiResponse | null = null;

  try {
    payload = (await response.json()) as TradelineApiResponse;
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.success) {
    const message = payload && "message" in payload && payload.message
      ? payload.message
      : `Inventory request failed with status ${response.status}`;

    throw new Error(message);
  }

  return payload.data;
}

export async function fetchTradelineById(id: number): Promise<TradelineItem> {
  const tradelines = await fetchTradelines();
  const tradeline = tradelines.find((item) => item.id === id);

  if (!tradeline) {
    throw new Error("Tradeline not found");
  }

  return tradeline;
}

export async function fetchUserBalance(): Promise<number> {
  throw new Error("User balance is not exposed to the client.");
}
