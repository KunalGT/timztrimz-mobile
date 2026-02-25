import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { getLoyalty } from "../../lib/api";
import { LoyaltyInfo } from "../../lib/types";

interface Props {
  phone: string;
}

export default function LoyaltyProgress({ phone }: Props) {
  const [loyalty, setLoyalty] = useState<LoyaltyInfo | null>(null);

  useEffect(() => {
    if (!phone) return;
    getLoyalty(phone).then(setLoyalty).catch(() => {});
  }, [phone]);

  if (!loyalty) return null;

  const stamps = loyalty.stampsTowardsFree;
  const total = 10;

  return (
    <View className="mb-4 rounded-xl bg-gray-900 p-4">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-sm text-gold font-sans-semibold">Loyalty Progress</Text>
        <Text className="text-xs text-warm-grey font-sans">{stamps}/{total} stamps</Text>
      </View>
      <View className="flex-row justify-center gap-2 flex-wrap mb-3">
        {Array.from({ length: total }, (_, i) => (
          <View
            key={i}
            className={`h-7 w-7 rounded-full items-center justify-center ${
              i < stamps ? "bg-gold" : "border border-warm-grey/40"
            }`}
          >
            {i < stamps && <Text className="text-black text-xs font-sans-bold">✓</Text>}
          </View>
        ))}
      </View>
      <Text className="text-center text-xs text-gold font-sans-medium">Every 10th Cut Free!</Text>
    </View>
  );
}
