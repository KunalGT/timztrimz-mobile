import { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useUserData } from "../../hooks/useUserData";
import { useBookings } from "../../hooks/useBookings";
import { useLoyalty } from "../../hooks/useLoyalty";
import { cancelBooking } from "../../lib/api";
import { Booking } from "../../lib/types";
import PhoneLookup from "../../components/bookings/PhoneLookup";
import BookingList from "../../components/bookings/BookingList";
import LoyaltyStampCard from "../../components/bookings/LoyaltyStampCard";
import CancelConfirmModal from "../../components/bookings/CancelConfirmModal";
import Skeleton, { SkeletonBookingCard } from "../../components/ui/Skeleton";
import { normalizePhone } from "../../lib/utils";
import { saveUserData } from "../../lib/storage";

export default function MyBookingsScreen() {
  const { userData, loading: userLoading } = useUserData();
  const { bookings, loading: bookingsLoading, refetch: fetchBookings } = useBookings();
  const { loyalty, refetch: fetchLoyalty } = useLoyalty();
  const [phone, setPhone] = useState<string | null>(null);

  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

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

  const handleCancelRequest = (booking: Booking) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCancelTarget(booking);
  };

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      await cancelBooking(cancelTarget.id);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setCancelTarget(null);
      handleRefresh();
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setCancelling(false);
    }
  };

  if (userLoading) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 px-4 pt-4">
          <Skeleton width="50%" height={28} className="mb-4" />
          {[1, 2, 3].map((i) => <SkeletonBookingCard key={i} />)}
        </View>
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
        {bookingsLoading && bookings.length === 0 ? (
          <View className="mt-4">
            {[1, 2, 3].map((i) => <SkeletonBookingCard key={i} />)}
          </View>
        ) : (
          <BookingList
            bookings={bookings}
            loading={bookingsLoading}
            onRefresh={handleRefresh}
            onCancel={handleCancelRequest}
          />
        )}
      </View>

      {cancelTarget && (
        <CancelConfirmModal
          visible={!!cancelTarget}
          booking={cancelTarget}
          loading={cancelling}
          onCancel={handleConfirmCancel}
          onClose={() => setCancelTarget(null)}
        />
      )}
    </SafeAreaView>
  );
}
