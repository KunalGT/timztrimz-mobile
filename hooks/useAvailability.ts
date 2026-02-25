import { useState, useEffect, useCallback } from "react";
import { TimeSlot } from "../lib/types";
import { getAvailability } from "../lib/api";

export function useAvailability(date: string | null, duration: number | null) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dayOff, setDayOff] = useState(false);

  const fetchSlots = useCallback(async () => {
    if (!date || !duration) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAvailability(date, duration);
      setSlots(data.slots);
      setDayOff(data.dayOff);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load availability");
    } finally {
      setLoading(false);
    }
  }, [date, duration]);

  useEffect(() => { fetchSlots(); }, [fetchSlots]);

  return { slots, loading, error, dayOff, refetch: fetchSlots };
}
