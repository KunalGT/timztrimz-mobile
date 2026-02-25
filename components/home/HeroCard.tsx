import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function HeroCard() {
  return (
    <View className="rounded-2xl bg-gray-900 p-6 mb-4">
      <Text className="font-display text-3xl text-gold">Timz Trimz</Text>
      <Text className="mt-1 text-sm text-warm-grey font-sans">Premium Barbershop</Text>
      <Text className="mt-3 text-xs text-gray-400 font-sans">Fresh cuts, clean fades, and sharp lineups</Text>
      <Pressable
        onPress={() => router.push("/(tabs)/book")}
        className="mt-5 self-start bg-gold rounded-full px-6 py-3"
      >
        <Text className="text-black font-sans-semibold text-sm">Book Now</Text>
      </Pressable>
    </View>
  );
}
