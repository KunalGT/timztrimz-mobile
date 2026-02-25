import { View, Text, Pressable } from "react-native";
import { Service } from "../../lib/types";
import { formatPrice } from "../../lib/utils";

interface Props {
  service: Service;
  selected: boolean;
  onSelect: (service: Service) => void;
}

export default function ServiceCard({ service, selected, onSelect }: Props) {
  return (
    <Pressable
      onPress={() => onSelect(service)}
      className={`rounded-xl p-4 mb-3 border ${
        selected ? "border-gold bg-gold/10" : "border-gray-800 bg-gray-900"
      }`}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 mr-3">
          <Text className="text-white font-sans-semibold text-base">{service.name}</Text>
          {service.description && (
            <Text className="mt-1 text-sm text-warm-grey font-sans" numberOfLines={2}>
              {service.description}
            </Text>
          )}
          <Text className="mt-2 text-xs text-warm-grey font-sans">{"\u23F1"} {service.duration} min</Text>
        </View>
        <Text className="text-gold font-sans-bold text-lg">{formatPrice(service.price)}</Text>
      </View>
    </Pressable>
  );
}
