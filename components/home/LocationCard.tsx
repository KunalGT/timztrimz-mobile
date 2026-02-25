import { View, Text, Pressable, Linking } from "react-native";
import { SHOP_LOCATION, OPENING_HOURS } from "../../lib/constants";

export default function LocationCard() {
  const handleDirections = () => {
    Linking.openURL(`https://maps.google.com/?q=${SHOP_LOCATION.lat},${SHOP_LOCATION.lng}`);
  };

  return (
    <View className="mb-8 rounded-xl bg-gray-900 p-4">
      <Text className="text-sm text-gold font-sans-semibold mb-3">Find Us</Text>
      <Text className="text-white font-sans-medium">{SHOP_LOCATION.name}</Text>
      <Text className="text-sm text-warm-grey font-sans mt-1">
        {SHOP_LOCATION.address}, {SHOP_LOCATION.postcode}
      </Text>
      <View className="mt-3 border-t border-gray-800 pt-3">
        <Text className="text-xs text-warm-grey font-sans">Mon-Sat: {OPENING_HOURS.weekday}</Text>
        <Text className="text-xs text-warm-grey font-sans">Sun: {OPENING_HOURS.sunday}</Text>
      </View>
      <Pressable onPress={handleDirections} className="mt-3 bg-gold/20 rounded-full px-4 py-2 self-start">
        <Text className="text-gold font-sans-semibold text-xs">Get Directions</Text>
      </Pressable>
    </View>
  );
}
