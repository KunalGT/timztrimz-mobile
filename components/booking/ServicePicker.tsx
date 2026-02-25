import { View, Text, FlatList } from "react-native";
import { Service } from "../../lib/types";
import CategoryChips from "./CategoryChips";
import ServiceCard from "./ServiceCard";

interface Props {
  services: Service[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedService: Service | null;
  onSelectService: (service: Service) => void;
}

export default function ServicePicker({ services, activeCategory, onCategoryChange, selectedService, onSelectService }: Props) {
  const filtered = services.filter((s) => s.category === activeCategory);

  return (
    <View className="flex-1">
      <Text className="text-2xl font-display text-gold mb-1">Choose your service</Text>
      <Text className="text-sm text-warm-grey font-sans mb-4">Select what you'd like done today</Text>
      <CategoryChips active={activeCategory} onChange={onCategoryChange} />
      {filtered.length === 0 ? (
        <Text className="text-center text-warm-grey font-sans py-8">No services in this category</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ServiceCard
              service={item}
              selected={selectedService?.id === item.id}
              onSelect={onSelectService}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
