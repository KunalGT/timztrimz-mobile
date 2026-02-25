import { useState, useEffect, useCallback } from "react";
import { Service } from "../lib/types";
import { getServices } from "../lib/api";

export function useServices(category?: string) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getServices(category);
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load services");
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  return { services, loading, error, refetch: fetchServices };
}
