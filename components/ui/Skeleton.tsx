import { useEffect } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export default function Skeleton({
  width = "100%",
  height = 16,
  borderRadius = 8,
  style,
  className = "",
}: SkeletonProps) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.7, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[{ width, height, borderRadius, backgroundColor: "#374151" }, style, animatedStyle]}
      className={className}
    />
  );
}

export function SkeletonServiceCard() {
  return (
    <View className="rounded-xl bg-gray-900 p-4 mb-3">
      <Skeleton width="60%" height={18} />
      <Skeleton width="90%" height={12} className="mt-2" />
      <View className="flex-row items-center justify-between mt-3">
        <Skeleton width={60} height={14} />
        <Skeleton width={50} height={14} />
      </View>
    </View>
  );
}

export function SkeletonBookingCard() {
  return (
    <View className="rounded-xl bg-gray-900 p-4 mb-3">
      <View className="flex-row items-start justify-between mb-2">
        <Skeleton width="55%" height={18} />
        <Skeleton width={80} height={24} borderRadius={12} />
      </View>
      <Skeleton width="70%" height={14} className="mt-1" />
      <Skeleton width={60} height={14} className="mt-2" />
    </View>
  );
}

export function SkeletonHomeCard() {
  return (
    <View className="mr-3 rounded-xl bg-gray-900 p-4 w-40">
      <Skeleton width="80%" height={14} />
      <Skeleton width={50} height={12} className="mt-2" />
      <Skeleton width={60} height={16} className="mt-3" />
    </View>
  );
}

export function SkeletonGalleryItem() {
  return (
    <View className="flex-1 aspect-square m-1">
      <Skeleton width="100%" height="100%" borderRadius={12} />
    </View>
  );
}
