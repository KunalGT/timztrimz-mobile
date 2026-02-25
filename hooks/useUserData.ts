import { useState, useEffect, useCallback } from "react";
import { UserData } from "../lib/types";
import { getUserData, saveUserData as saveUserDataStorage, clearUserData as clearUserDataStorage } from "../lib/storage";

export function useUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData().then((data) => {
      setUserData(data);
      setLoading(false);
    });
  }, []);

  const saveUser = useCallback(async (data: UserData) => {
    await saveUserDataStorage(data);
    setUserData(data);
  }, []);

  const clearUser = useCallback(async () => {
    await clearUserDataStorage();
    setUserData(null);
  }, []);

  return { userData, saveUser, clearUser, loading };
}
