import { View, Text } from "react-native";
import { LoyaltyInfo } from "../../lib/types";

interface Props {
  loyalty: LoyaltyInfo;
}

export default function LoyaltyStampCard({ loyalty }: Props) {
  const stamps = loyalty.stampsTowardsFree;
  const total = 10;

  return (
    <View className="rounded-xl bg-gray-900 p-5 mb-4 border border-gold/20">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-display text-gold">Loyalty Card</Text>
        <Text className="text-xs text-warm-grey font-sans">{stamps}/{total} stamps</Text>
      </View>
      <View className="flex-row flex-wrap justify-center gap-2 mb-4">
        {Array.from({ length: total }, (_, i) => (
          <View
            key={i}
            className={`h-9 w-9 rounded-full items-center justify-center border-2 ${
              i < stamps ? "border-gold bg-gold" : "border-warm-grey/40 bg-transparent"
            }`}
          >
            {i < stamps && <Text className="text-black text-xs font-sans-bold">{"\u2713"}</Text>}
          </View>
        ))}
      </View>
      <Text className="text-center text-sm text-gold font-sans-medium">Every 10th Cut Free!</Text>
      {loyalty.freeVisitsEarned > 0 && (
        <Text className="text-center text-xs text-success font-sans mt-1">
          {"\uD83C\uDF89"} {loyalty.freeVisitsEarned} free visit{loyalty.freeVisitsEarned > 1 ? "s" : ""} earned!
        </Text>
      )}
    </View>
  );
}
