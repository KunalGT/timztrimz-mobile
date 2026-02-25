import { API_BASE_URL } from "./constants";
import { Service, Booking, TimeSlot, GalleryImage, Review, LoyaltyInfo } from "./types";

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function getServices(category?: string): Promise<Service[]> {
  const params = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchJSON<Service[]>(`${API_BASE_URL}/api/services${params}`);
}

export async function getAvailability(date: string, duration: number): Promise<{ slots: TimeSlot[]; dayOff: boolean }> {
  return fetchJSON(`${API_BASE_URL}/api/availability?date=${date}&duration=${duration}`);
}

export async function createBooking(data: {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  date: string;
  startTime: string;
  notes?: string;
}): Promise<Booking> {
  return fetchJSON<Booking>(`${API_BASE_URL}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getBookings(phone: string): Promise<Booking[]> {
  return fetchJSON<Booking[]>(`${API_BASE_URL}/api/bookings?phone=${encodeURIComponent(phone)}`);
}

export async function cancelBooking(id: string): Promise<Booking> {
  return fetchJSON<Booking>(`${API_BASE_URL}/api/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "cancelled" }),
  });
}

export async function getLoyalty(phone: string): Promise<LoyaltyInfo> {
  return fetchJSON<LoyaltyInfo>(`${API_BASE_URL}/api/loyalty?phone=${encodeURIComponent(phone)}`);
}

export async function getGallery(category?: string): Promise<GalleryImage[]> {
  const params = category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
  return fetchJSON<GalleryImage[]>(`${API_BASE_URL}/api/gallery${params}`);
}

export async function getReviews(limit?: number): Promise<Review[]> {
  const params = limit ? `?limit=${limit}` : "";
  return fetchJSON<Review[]>(`${API_BASE_URL}/api/reviews${params}`);
}

export async function submitReview(data: { phone: string; rating: number; comment?: string }): Promise<void> {
  await fetchJSON(`${API_BASE_URL}/api/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
