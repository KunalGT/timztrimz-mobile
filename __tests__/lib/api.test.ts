import {
  getServices,
  getAvailability,
  createBooking,
  getBookings,
  cancelBooking,
  getLoyalty,
  getGallery,
  getReviews,
  submitReview,
} from "../../lib/api";

// Mock the constants module to control API_BASE_URL
jest.mock("../../lib/constants", () => ({
  API_BASE_URL: "http://test-api.com",
}));

const API = "http://test-api.com";

// Helper to create mock fetch responses
function mockFetchSuccess(data: any) {
  return jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  });
}

function mockFetchError(status: number, errorBody?: any) {
  return jest.fn().mockResolvedValue({
    ok: false,
    status,
    json: () => Promise.resolve(errorBody || { error: `HTTP ${status}` }),
  });
}

beforeEach(() => {
  jest.resetAllMocks();
});

describe("getServices", () => {
  it("fetches services without category", async () => {
    const mockServices = [{ id: "1", name: "Fade", price: 25 }];
    global.fetch = mockFetchSuccess(mockServices);

    const result = await getServices();

    expect(global.fetch).toHaveBeenCalledWith(
      `${API}/api/services`,
      undefined
    );
    expect(result).toEqual(mockServices);
  });

  it("fetches services with category filter", async () => {
    const mockServices = [{ id: "1", name: "Fade", price: 25 }];
    global.fetch = mockFetchSuccess(mockServices);

    const result = await getServices("Cuts");

    expect(global.fetch).toHaveBeenCalledWith(
      `${API}/api/services?category=Cuts`,
      undefined
    );
    expect(result).toEqual(mockServices);
  });

  it("encodes special characters in category", async () => {
    global.fetch = mockFetchSuccess([]);

    await getServices("Add-ons");

    expect(global.fetch).toHaveBeenCalledWith(
      `${API}/api/services?category=Add-ons`,
      undefined
    );
  });

  it("throws on error response", async () => {
    global.fetch = mockFetchError(500, { error: "Server error" });

    await expect(getServices()).rejects.toThrow("Server error");
  });
});

describe("getAvailability", () => {
  it("fetches availability with date and duration", async () => {
    const mockAvailability = {
      slots: [{ time: "09:00", available: true }],
      dayOff: false,
    };
    global.fetch = mockFetchSuccess(mockAvailability);

    const result = await getAvailability("2025-01-15", 30);

    expect(global.fetch).toHaveBeenCalledWith(
      `${API}/api/availability?date=2025-01-15&duration=30`,
      undefined
    );
    expect(result).toEqual(mockAvailability);
  });

  it("returns dayOff=true for closed days", async () => {
    const mockAvailability = { slots: [], dayOff: true };
    global.fetch = mockFetchSuccess(mockAvailability);

    const result = await getAvailability("2025-01-19", 30);

    expect(result.dayOff).toBe(true);
    expect(result.slots).toEqual([]);
  });
});

describe("createBooking", () => {
  const bookingData = {
    clientName: "John Doe",
    clientEmail: "john@example.com",
    clientPhone: "07777123456",
    serviceId: "service-1",
    date: "2025-01-15",
    startTime: "10:00",
    notes: "Skin fade please",
  };

  it("sends POST request with booking data", async () => {
    const mockBooking = { id: "booking-1", ...bookingData, status: "confirmed" };
    global.fetch = mockFetchSuccess(mockBooking);

    const result = await createBooking(bookingData);

    expect(global.fetch).toHaveBeenCalledWith(`${API}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    expect(result).toEqual(mockBooking);
  });

  it("sends POST without optional notes", async () => {
    const dataWithoutNotes = { ...bookingData };
    delete (dataWithoutNotes as any).notes;
    global.fetch = mockFetchSuccess({ id: "booking-2" });

    await createBooking(dataWithoutNotes);

    const callArgs = (global.fetch as jest.Mock).mock.calls[0];
    const sentBody = JSON.parse(callArgs[1].body);
    expect(sentBody.notes).toBeUndefined();
  });

  it("throws on error response", async () => {
    global.fetch = mockFetchError(400, { error: "Slot not available" });

    await expect(createBooking(bookingData)).rejects.toThrow("Slot not available");
  });
});

describe("getBookings", () => {
  it("fetches bookings by phone number", async () => {
    const mockBookings = [{ id: "booking-1", status: "confirmed" }];
    global.fetch = mockFetchSuccess(mockBookings);

    const result = await getBookings("07777123456");

    expect(global.fetch).toHaveBeenCalledWith(
      `${API}/api/bookings?phone=07777123456`,
      undefined
    );
    expect(result).toEqual(mockBookings);
  });

  it("encodes phone number with special characters", async () => {
    global.fetch = mockFetchSuccess([]);

    await getBookings("+44 7777 123456");

    expect(global.fetch).toHaveBeenCalledWith(
      `${API}/api/bookings?phone=%2B44%207777%20123456`,
      undefined
    );
  });
});

describe("cancelBooking", () => {
  it("sends PATCH request to cancel booking", async () => {
    const mockBooking = { id: "booking-1", status: "cancelled" };
    global.fetch = mockFetchSuccess(mockBooking);

    const result = await cancelBooking("booking-1");

    expect(global.fetch).toHaveBeenCalledWith(
      `${API}/api/bookings/booking-1`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      }
    );
    expect(result).toEqual(mockBooking);
  });

  it("throws on error response", async () => {
    global.fetch = mockFetchError(404, { error: "Booking not found" });

    await expect(cancelBooking("nonexistent")).rejects.toThrow("Booking not found");
  });
});

describe("getLoyalty", () => {
  it("fetches loyalty info by phone number", async () => {
    const mockLoyalty = {
      totalVisits: 8,
      unredeemedVisits: 3,
      stampsTowardsFree: 3,
      freeVisitsEarned: 0,
    };
    global.fetch = mockFetchSuccess(mockLoyalty);

    const result = await getLoyalty("07777123456");

    expect(global.fetch).toHaveBeenCalledWith(
      `${API}/api/loyalty?phone=07777123456`,
      undefined
    );
    expect(result).toEqual(mockLoyalty);
  });
});

describe("getGallery", () => {
  it("fetches gallery without category", async () => {
    const mockGallery = [{ id: "1", url: "https://img.com/1.jpg" }];
    global.fetch = mockFetchSuccess(mockGallery);

    const result = await getGallery();

    expect(global.fetch).toHaveBeenCalledWith(
      `${API}/api/gallery`,
      undefined
    );
    expect(result).toEqual(mockGallery);
  });

  it("fetches gallery with category filter", async () => {
    global.fetch = mockFetchSuccess([]);

    await getGallery("fades");

    expect(global.fetch).toHaveBeenCalledWith(
      `${API}/api/gallery?category=fades`,
      undefined
    );
  });

  it("does not add params when category is 'All'", async () => {
    global.fetch = mockFetchSuccess([]);

    await getGallery("All");

    expect(global.fetch).toHaveBeenCalledWith(
      `${API}/api/gallery`,
      undefined
    );
  });
});

describe("getReviews", () => {
  it("fetches reviews without limit", async () => {
    const mockReviews = [{ id: "r1", rating: 5 }];
    global.fetch = mockFetchSuccess(mockReviews);

    const result = await getReviews();

    expect(global.fetch).toHaveBeenCalledWith(
      `${API}/api/reviews`,
      undefined
    );
    expect(result).toEqual(mockReviews);
  });

  it("fetches reviews with limit", async () => {
    global.fetch = mockFetchSuccess([]);

    await getReviews(5);

    expect(global.fetch).toHaveBeenCalledWith(
      `${API}/api/reviews?limit=5`,
      undefined
    );
  });
});

describe("submitReview", () => {
  it("sends POST request with review data", async () => {
    global.fetch = mockFetchSuccess({});

    const reviewData = { phone: "07777123456", rating: 5, comment: "Great cut!" };
    await submitReview(reviewData);

    expect(global.fetch).toHaveBeenCalledWith(`${API}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });
  });

  it("sends review without optional comment", async () => {
    global.fetch = mockFetchSuccess({});

    const reviewData = { phone: "07777123456", rating: 4 };
    await submitReview(reviewData);

    const callArgs = (global.fetch as jest.Mock).mock.calls[0];
    const sentBody = JSON.parse(callArgs[1].body);
    expect(sentBody.phone).toBe("07777123456");
    expect(sentBody.rating).toBe(4);
    expect(sentBody.comment).toBeUndefined();
  });

  it("throws on error response", async () => {
    global.fetch = mockFetchError(400, { error: "Invalid rating" });

    await expect(
      submitReview({ phone: "07777123456", rating: 0 })
    ).rejects.toThrow("Invalid rating");
  });
});

describe("fetchJSON error handling", () => {
  it("handles non-JSON error responses gracefully", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.reject(new Error("not JSON")),
    });

    await expect(getServices()).rejects.toThrow("Request failed");
  });

  it("uses HTTP status when error body has no error field", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 403,
      json: () => Promise.resolve({}),
    });

    await expect(getServices()).rejects.toThrow("HTTP 403");
  });
});
