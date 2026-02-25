import { useState, useCallback } from "react";
import { Booking } from "../lib/types";
import { getBookings } from "../lib/api";

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async (phone: string) => {
    if (!phone) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getBookings(phone);
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  return { bookings, loading, error, refetch: fetchBookings };
}
