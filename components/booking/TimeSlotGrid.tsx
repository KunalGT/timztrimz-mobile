import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { TimeSlot } from "../../lib/types";
import { COLORS } from "../../lib/constants";
import { formatTime } from "../../lib/utils";

interface Props {
  slots: TimeSlot[];
  loading: boolean;
  dayOff: boolean;
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

export default function TimeSlotGrid({ slots, loading, dayOff, selectedTime, onSelect }: Props) {
  if (loading) {
    return (
      <View className="py-8 items-center">
        <ActivityIndicator color={COLORS.gold} />
        <Text className="mt-2 text-sm text-warm-grey font-sans">Loading times...</Text>
      </View>
    );
  }

  if (dayOff) {
    return (
      <View className="py-8 items-center">
        <Text className="text-warm-grey font-sans text-center">Closed on this day</Text>
      </View>
    );
  }

  const availableSlots = slots.filter(s => s.available);
  if (availableSlots.length === 0) {
    return (
      <View className="py-8 items-center">
        <Text className="text-warm-grey font-sans text-center">No available times on this date</Text>
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap">
      {slots.map((slot) => {
        const isSelected = selectedTime === slot.time;
        return (
          <Pressable
            key={slot.time}
            onPress={() => slot.available && onSelect(slot.time)}
            disabled={!slot.available}
            className={`m-1 rounded-lg px-3 py-2.5 items-center`}
            style={{ width: "30%" }}
          >
            <View className={`w-full rounded-lg px-3 py-2.5 items-center ${
              isSelected ? "bg-gold" : slot.available ? "border border-gold/40 bg-transparent" : "bg-gray-800/50"
            }`}>
              <Text
                className={`text-sm font-sans-medium ${
                  isSelected ? "text-black" : slot.available ? "text-white" : "text-gray-600 line-through"
                }`}
              >
                {formatTime(slot.time)}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
