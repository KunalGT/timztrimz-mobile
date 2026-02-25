import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { getBookings } from "../../lib/api";
import { Booking } from "../../lib/types";
import { formatDate, formatTime } from "../../lib/utils";
import { COLORS } from "../../lib/constants";

interface Props {
  phone: string;
}

export default function NextAppointment({ phone }: Props) {
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (!phone) return;
    getBookings(phone).then((bookings) => {
      const now = new Date();
      const upcoming = bookings
        .filter((b) => b.status === "confirmed" && new Date(b.date) >= new Date(now.toDateString()))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setBooking(upcoming[0] || null);
    }).catch(() => {});
  }, [phone]);

  if (!booking) return null;

  return (
    <View className="mb-4 rounded-xl bg-gray-900 p-4" style={{ borderLeftWidth: 3, borderLeftColor: COLORS.gold }}>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-xs text-gold font-sans-semibold uppercase tracking-wider">Next Appointment</Text>
        <Pressable onPress={() => router.push("/(tabs)/bookings")}>
          <Text className="text-xs text-gold font-sans-medium">View All</Text>
        </Pressable>
      </View>
      <Text className="text-base text-white font-sans-semibold">{booking.service?.name || "Service"}</Text>
      <Text className="mt-1 text-sm text-warm-grey font-sans">
        {formatDate(booking.date)} at {formatTime(booking.startTime)}
      </Text>
    </View>
  );
}
