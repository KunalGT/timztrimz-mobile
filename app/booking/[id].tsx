import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { getBookings, cancelBooking } from "../../lib/api";
import { Booking } from "../../lib/types";
import { formatDate, formatTime, formatPrice } from "../../lib/utils";
import { useUserData } from "../../hooks/useUserData";
import Badge from "../../components/ui/Badge";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import CancelConfirmModal from "../../components/bookings/CancelConfirmModal";
import ReviewModal from "../../components/bookings/ReviewModal";

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userData } = useUserData();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCancel, setShowCancel] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const fetchBooking = useCallback(async () => {
    if (!userData?.phone) return;
    try {
      const bookings = await getBookings(userData.phone);
      const found = bookings.find((b) => b.id === id);
      setBooking(found || null);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }, [id, userData?.phone]);

  useEffect(() => { fetchBooking(); }, [fetchBooking]);

  const handleCancel = async () => {
    if (!booking) return;
    setCancelling(true);
    try {
      await cancelBooking(booking.id);
      await fetchBooking();
      setShowCancel(false);
      Alert.alert("Cancelled", "Your booking has been cancelled.");
    } catch (err) {
      Alert.alert("Error", err instanceof Error ? err.message : "Could not cancel booking");
    } finally {
      setCancelling(false);
    }
  };

  const handleReviewSuccess = () => {
    setShowReview(false);
    fetchBooking();
    Alert.alert("Thank you!", "Your review has been submitted.");
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <LoadingSpinner message="Loading booking..." />
      </SafeAreaView>
    );
  }

  if (!booking) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <Text className="text-warm-grey font-sans">Booking not found</Text>
        <Pressable onPress={() => router.back()} className="mt-4 bg-gold rounded-full px-6 py-3">
          <Text className="text-black font-sans-semibold">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const isUpcoming = booking.status === "confirmed" && new Date(booking.date) >= new Date(new Date().toDateString());
  const canReview = booking.status === "completed" && !booking.review;

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Back button */}
        <Pressable onPress={() => router.back()} className="mb-4">
          <Text className="text-gold font-sans-medium">{"\u2190"} Back</Text>
        </Pressable>

        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-display text-gold">Booking Detail</Text>
          <Badge status={booking.status} />
        </View>

        <View className="rounded-xl bg-gray-900 p-5 mb-4">
          <Text className="text-lg font-sans-bold text-white mb-1">{booking.service?.name}</Text>
          {booking.service?.description && (
            <Text className="text-sm text-warm-grey font-sans mb-3">{booking.service.description}</Text>
          )}

          <View className="h-px bg-gray-800 mb-3" />

          <View className="flex-row flex-wrap">
            <View className="w-1/2 mb-3">
              <Text className="text-xs text-warm-grey font-sans">Date</Text>
              <Text className="text-sm font-sans-medium text-white mt-0.5">{formatDate(booking.date)}</Text>
            </View>
            <View className="w-1/2 mb-3">
              <Text className="text-xs text-warm-grey font-sans">Time</Text>
              <Text className="text-sm font-sans-medium text-white mt-0.5">
                {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
              </Text>
            </View>
            <View className="w-1/2 mb-3">
              <Text className="text-xs text-warm-grey font-sans">Duration</Text>
              <Text className="text-sm font-sans-medium text-white mt-0.5">
                {booking.service?.duration} min
              </Text>
            </View>
            <View className="w-1/2 mb-3">
              <Text className="text-xs text-warm-grey font-sans">Price</Text>
              <Text className="text-sm font-sans-medium text-gold mt-0.5">
                {formatPrice(booking.service?.price || 0)}
              </Text>
            </View>
          </View>

          {booking.notes && (
            <>
              <View className="h-px bg-gray-800 mb-3" />
              <Text className="text-xs text-warm-grey font-sans">Notes</Text>
              <Text className="text-sm text-white font-sans mt-0.5">{booking.notes}</Text>
            </>
          )}

          <View className="h-px bg-gray-800 my-3" />
          <Text className="text-xs text-warm-grey font-sans">Booking Reference</Text>
          <Text className="text-xs text-white font-sans mt-0.5" style={{ fontFamily: "monospace" }}>
            {booking.id}
          </Text>
        </View>

        {/* Action buttons */}
        {isUpcoming && (
          <Pressable
            onPress={() => setShowCancel(true)}
            className="bg-danger/20 border border-danger/40 rounded-full py-3 items-center mb-3"
          >
            <Text className="text-danger font-sans-semibold text-sm">Cancel Booking</Text>
          </Pressable>
        )}

        {canReview && (
          <Pressable
            onPress={() => setShowReview(true)}
            className="bg-gold rounded-full py-3 items-center mb-3"
          >
            <Text className="text-black font-sans-semibold text-sm">Leave a Review</Text>
          </Pressable>
        )}

        {booking.review && (
          <View className="rounded-xl bg-gray-900 p-4 mb-4">
            <Text className="text-sm text-gold font-sans-semibold mb-1">Your Review</Text>
            <Text className="text-gold">
              {"\u2605".repeat(booking.review.rating)}{"\u2606".repeat(5 - booking.review.rating)}
            </Text>
            {booking.review.comment && (
              <Text className="text-sm text-warm-grey font-sans mt-1">{booking.review.comment}</Text>
            )}
          </View>
        )}
      </ScrollView>

      {/* Modals */}
      {showCancel && booking && (
        <CancelConfirmModal
          visible={showCancel}
          booking={booking}
          loading={cancelling}
          onCancel={handleCancel}
          onClose={() => setShowCancel(false)}
        />
      )}

      {showReview && userData?.phone && (
        <ReviewModal
          visible={showReview}
          phone={userData.phone}
          onClose={() => setShowReview(false)}
          onSuccess={handleReviewSuccess}
        />
      )}
    </SafeAreaView>
  );
}
