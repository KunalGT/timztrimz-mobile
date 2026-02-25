import { useState, useCallback } from "react";
import { LoyaltyInfo } from "../lib/types";
import { getLoyalty } from "../lib/api";

export function useLoyalty() {
  const [loyalty, setLoyalty] = useState<LoyaltyInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLoyalty = useCallback(async (phone: string) => {
    if (!phone) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getLoyalty(phone);
      setLoyalty(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load loyalty data");
    } finally {
      setLoading(false);
    }
  }, []);

  return { loyalty, loading, error, refetch: fetchLoyalty };
}
