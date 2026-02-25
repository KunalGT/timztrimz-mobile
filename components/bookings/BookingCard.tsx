import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { Booking } from "../../lib/types";
import { formatDate, formatTime, formatPrice } from "../../lib/utils";
import Badge from "../ui/Badge";

interface Props {
  booking: Booking;
}

export default function BookingCard({ booking }: Props) {
  const isUpcoming = booking.status === "confirmed" && new Date(booking.date) >= new Date(new Date().toDateString());

  return (
    <Pressable
      onPress={() => router.push({
        pathname: "/booking/[id]",
        params: { id: booking.id }
      })}
      className={`rounded-xl p-4 mb-3 bg-gray-900 ${isUpcoming ? "border-l-2 border-l-gold" : ""}`}
    >
      <View className="flex-row items-start justify-between mb-2">
        <Text className="text-white font-sans-semibold text-base flex-1 mr-2">{booking.service?.name || "Service"}</Text>
        <Badge status={booking.status} />
      </View>
      <Text className="text-sm text-warm-grey font-sans">
        {formatDate(booking.date)} at {formatTime(booking.startTime)}
      </Text>
      <Text className="mt-1 text-sm text-gold font-sans-medium">
        {formatPrice(booking.service?.price || 0)}
      </Text>
    </Pressable>
  );
}
