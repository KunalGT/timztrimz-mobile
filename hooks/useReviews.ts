import { useState, useEffect, useCallback } from "react";
import { Review } from "../lib/types";
import { getReviews } from "../lib/api";

export function useReviews(limit?: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getReviews(limit);
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  return { reviews, loading, error, refetch: fetchReviews };
}
