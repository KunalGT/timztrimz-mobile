import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "./types";

const USER_DATA_KEY = "timztrimz_user_data";

export async function getUserData(): Promise<UserData | null> {
  try {
    const data = await AsyncStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function saveUserData(data: UserData): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
  } catch {
    // silently fail
  }
}

export async function clearUserData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
  } catch {
    // silently fail
  }
}
