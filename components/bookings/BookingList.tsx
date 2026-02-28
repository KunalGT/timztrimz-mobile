import { useRef, useCallback } from "react";
import { SectionList, View, Text, RefreshControl } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Booking } from "../../lib/types";
import BookingCard from "./BookingCard";
import EmptyState from "../ui/EmptyState";
import { COLORS } from "../../lib/constants";

interface Props {
  bookings: Booking[];
  loading: boolean;
  onRefresh: () => void;
  onCancel?: (booking: Booking) => void;
}

export default function BookingList({ bookings, loading, onRefresh, onCancel }: Props) {
  const now = new Date(new Date().toDateString());
  const openSwipeable = useRef<Swipeable | null>(null);
  const swipeableRefs = useRef<Map<string, Swipeable | null>>(new Map());

  const upcoming = bookings
    .filter((b) => b.status === "confirmed" && new Date(b.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = bookings
    .filter((b) => b.status !== "confirmed" || new Date(b.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const sections = [
    ...(upcoming.length > 0 ? [{ title: "Upcoming", data: upcoming }] : []),
    ...(past.length > 0 ? [{ title: "Past", data: past }] : []),
  ];

  const closeOpenSwipeable = useCallback(() => {
    if (openSwipeable.current) {
      openSwipeable.current.close();
      openSwipeable.current = null;
    }
  }, []);

  if (sections.length === 0) {
    return <EmptyState icon={"\uD83D\uDCCB"} title="No bookings found" subtitle="Book your first appointment!" />;
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BookingCard
          booking={item}
          onCancel={onCancel}
          swipeableRef={(ref) => {
            swipeableRefs.current.set(item.id, ref);
          }}
          onSwipeOpen={() => {
            if (openSwipeable.current && openSwipeable.current !== swipeableRefs.current.get(item.id)) {
              openSwipeable.current.close();
            }
            openSwipeable.current = swipeableRefs.current.get(item.id) || null;
          }}
        />
      )}
      renderSectionHeader={({ section }) => (
        <Text className="text-sm font-sans-semibold text-gold mb-2 mt-4 uppercase tracking-wider">
          {section.title}
        </Text>
      )}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} tintColor={COLORS.gold} />
      }
      contentContainerStyle={{ paddingBottom: 20 }}
      onScrollBeginDrag={closeOpenSwipeable}
    />
  );
}
