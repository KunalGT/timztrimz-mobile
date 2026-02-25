import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

interface Props {
  onLookup: (phone: string) => void;
}

export default function PhoneLookup({ onLookup }: Props) {
  const [phone, setPhone] = useState("");

  return (
    <View className="flex-1 items-center justify-center px-8">
      <Text className="text-4xl mb-4">{"\uD83D\uDCF1"}</Text>
      <Text className="text-xl font-display text-gold text-center mb-2">Find Your Bookings</Text>
      <Text className="text-sm text-warm-grey font-sans text-center mb-6">
        Enter your phone number to view your appointments
      </Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="07700 900 000"
        placeholderTextColor="#6B7280"
        keyboardType="phone-pad"
        className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3.5 text-white font-sans text-sm mb-4"
      />
      <Pressable
        onPress={() => phone.trim() && onLookup(phone.trim())}
        disabled={!phone.trim()}
        className={`w-full bg-gold rounded-full py-3 items-center ${!phone.trim() ? "opacity-40" : ""}`}
      >
        <Text className="text-black font-sans-semibold text-sm">Look Up</Text>
      </Pressable>
    </View>
  );
}
