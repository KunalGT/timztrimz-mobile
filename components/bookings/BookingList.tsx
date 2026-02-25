import { SectionList, View, Text, RefreshControl } from "react-native";
import { Booking } from "../../lib/types";
import BookingCard from "./BookingCard";
import EmptyState from "../ui/EmptyState";
import { COLORS } from "../../lib/constants";

interface Props {
  bookings: Booking[];
  loading: boolean;
  onRefresh: () => void;
}

export default function BookingList({ bookings, loading, onRefresh }: Props) {
  const now = new Date(new Date().toDateString());

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

  if (sections.length === 0) {
    return <EmptyState icon={"\uD83D\uDCCB"} title="No bookings found" subtitle="Book your first appointment!" />;
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <BookingCard booking={item} />}
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
    />
  );
}
