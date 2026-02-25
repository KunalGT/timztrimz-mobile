import { ScrollView, Pressable, Text } from "react-native";

const CATEGORIES = ["All", "fades", "beards", "lineups", "kids"];

interface Props {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilterChips({ active, onChange }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
      {CATEGORIES.map((cat) => (
        <Pressable
          key={cat}
          onPress={() => onChange(cat)}
          className={`mr-2 rounded-full px-4 py-2 ${
            active === cat ? "bg-gold" : "bg-gray-800"
          }`}
        >
          <Text
            className={`text-sm font-sans-medium capitalize ${
              active === cat ? "text-black" : "text-warm-grey"
            }`}
          >
            {cat}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
