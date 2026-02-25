export interface Service {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  duration: number;
  image: string | null;
  active: boolean;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  service: Service;
  date: string;
  startTime: string;
  endTime: string;
  status: "confirmed" | "cancelled" | "completed" | "no-show";
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  review?: Review | null;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  category: string | null;
  featured: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  booking?: Booking;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export interface LoyaltyInfo {
  totalVisits: number;
  unredeemedVisits: number;
  stampsTowardsFree: number;
  freeVisitsEarned: number;
}

export interface UserData {
  name: string;
  phone: string;
  email: string;
}
