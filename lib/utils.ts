import { format, addDays, isSunday } from "date-fns";

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return format(date, "EEEE d MMM yyyy");
}

export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  return format(date, "d MMM");
}

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-()]/g, "");
}

export function generateDateRange(days: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  let current = today;

  while (dates.length < days) {
    if (!isSunday(current)) {
      dates.push(format(current, "yyyy-MM-dd"));
    }
    current = addDays(current, 1);
  }

  return dates;
}

export function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "confirmed": return "success";
    case "cancelled": return "danger";
    case "completed": return "gold";
    case "no-show": return "warm-grey";
    default: return "warm-grey";
  }
}
