import { View, Text } from "react-native";

interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
}

export default function EmptyState({ icon = "📭", title, subtitle }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-16 px-8">
      <Text className="text-4xl mb-4">{icon}</Text>
      <Text className="text-lg font-sans-semibold text-white text-center">{title}</Text>
      {subtitle && <Text className="mt-2 text-sm text-warm-grey text-center">{subtitle}</Text>}
    </View>
  );
}
