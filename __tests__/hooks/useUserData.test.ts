import { renderHook, act, waitFor } from "@testing-library/react-native";
import { useUserData } from "../../hooks/useUserData";
import AsyncStorage from "@react-native-async-storage/async-storage";

// The mock is auto-loaded from __mocks__/@react-native-async-storage/async-storage.ts

const USER_DATA_KEY = "timztrimz_user_data";

const mockUser = {
  name: "John Doe",
  phone: "07777123456",
  email: "john@example.com",
};

beforeEach(() => {
  jest.clearAllMocks();
  // Reset the internal mock store
  (AsyncStorage as any).__resetStore?.();
});

describe("useUserData", () => {
  it("starts with loading=true and userData=null", () => {
    // Make getItem return null (no stored data)
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useUserData());

    expect(result.current.loading).toBe(true);
    expect(result.current.userData).toBeNull();
  });

  it("loads user data from AsyncStorage on mount", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockUser)
    );

    const { result } = renderHook(() => useUserData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.userData).toEqual(mockUser);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(USER_DATA_KEY);
  });

  it("sets loading=false and userData=null when no stored data", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useUserData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.userData).toBeNull();
  });

  it("saves user data to AsyncStorage via saveUser", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useUserData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.saveUser(mockUser);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      USER_DATA_KEY,
      JSON.stringify(mockUser)
    );
    expect(result.current.userData).toEqual(mockUser);
  });

  it("clears user data from AsyncStorage via clearUser", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockUser)
    );

    const { result } = renderHook(() => useUserData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.userData).toEqual(mockUser);

    await act(async () => {
      await result.current.clearUser();
    });

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(USER_DATA_KEY);
    expect(result.current.userData).toBeNull();
  });

  it("handles storage errors gracefully on load", async () => {
    // storage.ts catches errors and returns null
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
      new Error("Storage error")
    );

    const { result } = renderHook(() => useUserData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // getUserData catches errors and returns null
    expect(result.current.userData).toBeNull();
  });
});
