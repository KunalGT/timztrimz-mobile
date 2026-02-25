import { View, Text, Pressable, Alert } from "react-native";
import * as Haptics from "expo-haptics";
import * as Calendar from "expo-calendar";
import { useEffect } from "react";
import { Booking } from "../../lib/types";
import { formatDate, formatTime, formatPrice } from "../../lib/utils";

interface Props {
  booking: Booking;
  selectedDate: string;
  onBookAnother: () => void;
}

export default function SuccessScreen({ booking, selectedDate, onBookAnother }: Props) {
  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const handleAddToCalendar = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission needed", "Calendar access is required to add the event.");
        return;
      }

      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const defaultCalendar = calendars.find((c) => c.isPrimary) || calendars[0];

      if (!defaultCalendar) {
        Alert.alert("No calendar found", "Unable to find a calendar on your device.");
        return;
      }

      const [h, m] = booking.startTime.split(":").map(Number);
      const startDate = new Date(selectedDate + "T00:00:00");
      startDate.setHours(h, m, 0);

      const [eh, em] = booking.endTime.split(":").map(Number);
      const endDate = new Date(selectedDate + "T00:00:00");
      endDate.setHours(eh, em, 0);

      await Calendar.createEventAsync(defaultCalendar.id, {
        title: `Timz Trimz - ${booking.service?.name || "Appointment"}`,
        startDate,
        endDate,
        location: "Timz Trimz, 123 High Street, E1 1AA",
        notes: `Booking ref: ${booking.id}`,
      });

      Alert.alert("Added!", "Your appointment has been added to your calendar.");
    } catch {
      Alert.alert("Error", "Could not add to calendar.");
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-4 py-8">
      <View className="h-20 w-20 rounded-full bg-success/20 items-center justify-center mb-6">
        <Text className="text-4xl">{"\u2713"}</Text>
      </View>

      <Text className="text-2xl font-display text-gold mb-1">You're booked in!</Text>
      <Text className="text-sm text-warm-grey font-sans mb-6">See you at Timz Trimz</Text>

      <View className="w-full max-w-xs rounded-xl border border-gray-800 bg-gray-900 p-5">
        <View className="mb-3">
          <Text className="text-xs text-warm-grey font-sans">Booking reference</Text>
          <Text className="text-sm font-sans-bold text-white mt-0.5" style={{ fontFamily: "monospace" }}>
            {booking.id}
          </Text>
        </View>
        <View className="h-px bg-gray-800 mb-3" />
        <View className="mb-3">
          <Text className="text-xs text-warm-grey font-sans">Service</Text>
          <Text className="text-sm font-sans-medium text-white mt-0.5">{booking.service?.name}</Text>
        </View>
        <View className="flex-row mb-3">
          <View className="flex-1">
            <Text className="text-xs text-warm-grey font-sans">Date</Text>
            <Text className="text-sm font-sans-medium text-white mt-0.5">{formatDate(selectedDate)}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-warm-grey font-sans">Time</Text>
            <Text className="text-sm font-sans-medium text-white mt-0.5">
              {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
            </Text>
          </View>
        </View>
        <View>
          <Text className="text-xs text-warm-grey font-sans">Price</Text>
          <Text className="text-sm font-sans-medium text-gold mt-0.5">{formatPrice(booking.service?.price || 0)}</Text>
        </View>
      </View>

      <Pressable onPress={handleAddToCalendar} className="mt-5 border border-gold rounded-full px-6 py-3">
        <Text className="text-gold font-sans-semibold text-sm">{"\uD83D\uDCC5"} Add to Calendar</Text>
      </Pressable>

      <Pressable onPress={onBookAnother} className="mt-3 bg-gold rounded-full px-6 py-3">
        <Text className="text-black font-sans-semibold text-sm">Book Another</Text>
      </Pressable>
    </View>
  );
}
