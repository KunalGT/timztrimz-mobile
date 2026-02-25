import { View, Text } from "react-native";

interface BadgeProps {
  status: "confirmed" | "cancelled" | "completed" | "no-show";
}

const config = {
  confirmed: { bg: "bg-success/20", text: "text-success", label: "Confirmed" },
  cancelled: { bg: "bg-danger/20", text: "text-danger", label: "Cancelled" },
  completed: { bg: "bg-gold/20", text: "text-gold", label: "Completed" },
  "no-show": { bg: "bg-warm-grey/20", text: "text-warm-grey", label: "No Show" },
};

export default function Badge({ status }: BadgeProps) {
  const c = config[status] || config["no-show"];
  return (
    <View className={`rounded-full px-3 py-1 ${c.bg}`}>
      <Text className={`text-xs font-sans-semibold ${c.text}`}>{c.label}</Text>
    </View>
  );
}
