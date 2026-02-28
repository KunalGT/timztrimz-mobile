import { useRef } from "react";
import { View, Text, Pressable, Animated as RNAnimated } from "react-native";
import { router } from "expo-router";
import { Swipeable } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { Booking } from "../../lib/types";
import { formatDate, formatTime, formatPrice } from "../../lib/utils";
import Badge from "../ui/Badge";

interface Props {
  booking: Booking;
  onCancel?: (booking: Booking) => void;
  swipeableRef?: (ref: Swipeable | null) => void;
  onSwipeOpen?: () => void;
}

function CancelAction(
  _progress: RNAnimated.AnimatedInterpolation<number>,
  dragX: RNAnimated.AnimatedInterpolation<number>
) {
  const scale = dragX.interpolate({
    inputRange: [-100, -50, 0],
    outputRange: [1, 0.8, 0.5],
    extrapolate: "clamp",
  });

  return (
    <View className="justify-center items-center bg-danger rounded-r-xl w-24 mb-3">
      <RNAnimated.Text
        style={{ transform: [{ scale }] }}
        className="text-white font-sans-semibold text-sm"
      >
        Cancel
      </RNAnimated.Text>
    </View>
  );
}

export default function BookingCard({ booking, onCancel, swipeableRef, onSwipeOpen }: Props) {
  const isUpcoming = booking.status === "confirmed" && new Date(booking.date) >= new Date(new Date().toDateString());
  const localRef = useRef<Swipeable | null>(null);
  const hasTriggeredHaptic = useRef(false);

  const cardContent = (
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

  if (!isUpcoming || !onCancel) {
    return cardContent;
  }

  return (
    <Swipeable
      ref={(ref) => {
        localRef.current = ref;
        swipeableRef?.(ref);
      }}
      renderRightActions={CancelAction}
      rightThreshold={60}
      onSwipeableWillOpen={() => {
        if (!hasTriggeredHaptic.current) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          hasTriggeredHaptic.current = true;
        }
        onSwipeOpen?.();
      }}
      onSwipeableClose={() => {
        hasTriggeredHaptic.current = false;
      }}
      onSwipeableOpen={() => {
        onCancel(booking);
        localRef.current?.close();
      }}
      overshootRight={false}
    >
      {cardContent}
    </Swipeable>
  );
}
