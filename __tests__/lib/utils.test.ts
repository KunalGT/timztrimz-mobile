import {
  formatDate,
  formatShortDate,
  formatTime,
  formatPrice,
  normalizePhone,
  generateDateRange,
  getStatusColor,
} from "../../lib/utils";
import { isSunday } from "date-fns";

describe("formatDate", () => {
  it("formats a date string to full format (EEEE d MMM yyyy)", () => {
    // 2025-01-15 is a Wednesday
    expect(formatDate("2025-01-15")).toBe("Wednesday 15 Jan 2025");
  });

  it("formats another date correctly", () => {
    // 2025-03-01 is a Saturday
    expect(formatDate("2025-03-01")).toBe("Saturday 1 Mar 2025");
  });

  it("handles end of year date", () => {
    // 2025-12-31 is a Wednesday
    expect(formatDate("2025-12-31")).toBe("Wednesday 31 Dec 2025");
  });
});

describe("formatShortDate", () => {
  it("formats a date string to short format (d MMM)", () => {
    expect(formatShortDate("2025-01-15")).toBe("15 Jan");
  });

  it("formats single digit day correctly", () => {
    expect(formatShortDate("2025-03-01")).toBe("1 Mar");
  });

  it("formats December date", () => {
    expect(formatShortDate("2025-12-25")).toBe("25 Dec");
  });
});

describe("formatTime", () => {
  it("formats morning time correctly", () => {
    expect(formatTime("09:00")).toBe("9:00 AM");
  });

  it("formats afternoon time correctly", () => {
    expect(formatTime("14:30")).toBe("2:30 PM");
  });

  it("formats midnight (00:00) as 12:00 AM", () => {
    expect(formatTime("00:00")).toBe("12:00 AM");
  });

  it("formats noon (12:00) as 12:00 PM", () => {
    expect(formatTime("12:00")).toBe("12:00 PM");
  });

  it("formats 1 PM correctly", () => {
    expect(formatTime("13:00")).toBe("1:00 PM");
  });

  it("pads single digit minutes", () => {
    expect(formatTime("09:05")).toBe("9:05 AM");
  });
});

describe("formatPrice", () => {
  it("formats a whole number price", () => {
    expect(formatPrice(25)).toBe("£25.00");
  });

  it("formats a price with pence", () => {
    expect(formatPrice(12.5)).toBe("£12.50");
  });

  it("formats zero", () => {
    expect(formatPrice(0)).toBe("£0.00");
  });

  it("formats a price with two decimal places already", () => {
    expect(formatPrice(9.99)).toBe("£9.99");
  });
});

describe("normalizePhone", () => {
  it("removes spaces from phone number", () => {
    expect(normalizePhone("020 7123 4567")).toBe("02071234567");
  });

  it("removes hyphens from phone number", () => {
    expect(normalizePhone("020-7123-4567")).toBe("02071234567");
  });

  it("removes parentheses from phone number", () => {
    expect(normalizePhone("(020) 71234567")).toBe("02071234567");
  });

  it("removes mixed formatting", () => {
    expect(normalizePhone("(020) 7123-4567")).toBe("02071234567");
  });

  it("returns already clean number unchanged", () => {
    expect(normalizePhone("07777123456")).toBe("07777123456");
  });
});

describe("generateDateRange", () => {
  it("returns the correct number of dates", () => {
    const dates = generateDateRange(7);
    expect(dates).toHaveLength(7);
  });

  it("excludes Sundays", () => {
    const dates = generateDateRange(14);
    dates.forEach((dateStr) => {
      const date = new Date(dateStr);
      expect(isSunday(date)).toBe(false);
    });
  });

  it("returns dates in yyyy-MM-dd format", () => {
    const dates = generateDateRange(3);
    dates.forEach((dateStr) => {
      expect(dateStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it("returns at least one date for days=1", () => {
    const dates = generateDateRange(1);
    expect(dates).toHaveLength(1);
  });
});

describe("getStatusColor", () => {
  it("returns 'success' for confirmed status", () => {
    expect(getStatusColor("confirmed")).toBe("success");
  });

  it("returns 'danger' for cancelled status", () => {
    expect(getStatusColor("cancelled")).toBe("danger");
  });

  it("returns 'gold' for completed status", () => {
    expect(getStatusColor("completed")).toBe("gold");
  });

  it("returns 'warm-grey' for no-show status", () => {
    expect(getStatusColor("no-show")).toBe("warm-grey");
  });

  it("returns 'warm-grey' for unknown status", () => {
    expect(getStatusColor("unknown")).toBe("warm-grey");
  });

  it("returns 'warm-grey' for empty string", () => {
    expect(getStatusColor("")).toBe("warm-grey");
  });
});
