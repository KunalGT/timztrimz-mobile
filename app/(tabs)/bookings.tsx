import { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useUserData } from "../../hooks/useUserData";
import { useBookings } from "../../hooks/useBookings";
import { useLoyalty } from "../../hooks/useLoyalty";
import PhoneLookup from "../../components/bookings/PhoneLookup";
import BookingList from "../../components/bookings/BookingList";
import LoyaltyStampCard from "../../components/bookings/LoyaltyStampCard";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { normalizePhone } from "../../lib/utils";
import { saveUserData } from "../../lib/storage";

export default function MyBookingsScreen() {
  const { userData, loading: userLoading } = useUserData();
  const { bookings, loading: bookingsLoading, refetch: fetchBookings } = useBookings();
  const { loyalty, refetch: fetchLoyalty } = useLoyalty();
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    if (userData?.phone) {
      setPhone(userData.phone);
    }
  }, [userData]);

  useEffect(() => {
    if (phone) {
      const normalized = normalizePhone(phone);
      fetchBookings(normalized);
      fetchLoyalty(normalized);
    }
  }, [phone]);

  const handleLookup = async (inputPhone: string) => {
    setPhone(inputPhone);
    if (userData) {
      await saveUserData({ ...userData, phone: inputPhone });
    } else {
      await saveUserData({ name: "", phone: inputPhone, email: "" });
    }
  };

  const handleRefresh = useCallback(() => {
    if (phone) {
      const normalized = normalizePhone(phone);
      fetchBookings(normalized);
      fetchLoyalty(normalized);
    }
  }, [phone]);

  if (userLoading) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  if (!phone) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <PhoneLookup onLookup={handleLookup} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-4 pt-4">
        <Text className="text-2xl font-display text-gold mb-4">My Bookings</Text>
        {loyalty && <LoyaltyStampCard loyalty={loyalty} />}
        <BookingList bookings={bookings} loading={bookingsLoading} onRefresh={handleRefresh} />
      </View>
    </SafeAreaView>
  );
}
