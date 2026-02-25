import { useRef, useEffect } from "react";
import { ScrollView, Pressable, Text, View } from "react-native";
import { format, isToday } from "date-fns";
import { generateDateRange } from "../../lib/utils";

interface Props {
  selectedDate: string | null;
  onSelect: (date: string) => void;
}

export default function DatePicker({ selectedDate, onSelect }: Props) {
  const dates = generateDateRange(30);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (selectedDate) {
      const index = dates.indexOf(selectedDate);
      if (index > 0 && scrollRef.current) {
        scrollRef.current.scrollTo({ x: index * 72, animated: true });
      }
    }
  }, [selectedDate]);

  return (
    <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} className="mb-4">
      {dates.map((dateStr) => {
        const date = new Date(dateStr + "T00:00:00");
        const isSelected = selectedDate === dateStr;
        const today = isToday(date);

        return (
          <Pressable
            key={dateStr}
            onPress={() => onSelect(dateStr)}
            className={`mr-2 rounded-xl px-4 py-3 items-center w-16 ${
              isSelected ? "bg-gold" : today ? "border border-gold bg-transparent" : "bg-gray-800"
            }`}
          >
            <Text className={`text-[10px] font-sans-medium uppercase ${isSelected ? "text-black" : "text-warm-grey"}`}>
              {format(date, "EEE")}
            </Text>
            <Text className={`text-lg font-sans-bold ${isSelected ? "text-black" : "text-white"}`}>
              {format(date, "d")}
            </Text>
            <Text className={`text-[10px] font-sans ${isSelected ? "text-black" : "text-warm-grey"}`}>
              {format(date, "MMM")}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
