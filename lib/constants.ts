export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3009";

export const COLORS = {
  gold: "#C9A84C",
  goldLight: "#D4B85E",
  goldDark: "#B8973F",
  warmGrey: "#6B7280",
  offWhite: "#F9FAFB",
  success: "#10B981",
  danger: "#EF4444",
  black: "#000000",
  white: "#FFFFFF",
} as const;

export const CATEGORIES = ["Cuts", "Beard", "Kids", "Specials", "Add-ons", "SMP"] as const;

export const GALLERY_CATEGORIES = ["All", "fades", "beards", "lineups", "kids", "smp"] as const;

export const SHOP_LOCATION = {
  name: "Timz Trimz",
  address: "8 Avenue Parade, Winchmore Hill",
  postcode: "N21 2AX",
  phone: "020 7123 4567",
  lat: 51.6342,
  lng: -0.1003,
} as const;

export const OPENING_HOURS = {
  weekday: "9:00 AM - 7:00 PM",
  saturday: "9:00 AM - 7:00 PM",
  sunday: "Closed",
} as const;
