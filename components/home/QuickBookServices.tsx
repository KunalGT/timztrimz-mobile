import { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { getServices } from "../../lib/api";
import { Service } from "../../lib/types";
import { formatPrice } from "../../lib/utils";

export default function QuickBookServices() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getServices().then((data) => setServices(data.slice(0, 5))).catch(() => {});
  }, []);

  if (services.length === 0) return null;

  return (
    <View className="mb-4">
      <Text className="text-lg text-white font-sans-bold mb-3">Quick Book</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service) => (
          <Pressable
            key={service.id}
            onPress={() => router.push({ pathname: "/(tabs)/book", params: { serviceId: service.id } })}
            className="mr-3 rounded-xl bg-gray-900 p-4 w-40"
          >
            <Text className="text-sm text-white font-sans-semibold" numberOfLines={1}>{service.name}</Text>
            <Text className="mt-1 text-xs text-warm-grey font-sans">{service.duration} min</Text>
            <Text className="mt-2 text-gold font-sans-bold">{formatPrice(service.price)}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
