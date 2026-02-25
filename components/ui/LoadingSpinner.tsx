import { View, Text, ActivityIndicator } from "react-native";
import { COLORS } from "../../lib/constants";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <View className="flex-1 items-center justify-center py-12">
      <ActivityIndicator size="large" color={COLORS.gold} />
      {message && <Text className="mt-3 text-sm text-warm-grey font-sans">{message}</Text>}
    </View>
  );
}
