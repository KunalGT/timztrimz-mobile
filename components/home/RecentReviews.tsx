import { View, Text, ScrollView } from "react-native";
import { useReviews } from "../../hooks/useReviews";

function Stars({ rating }: { rating: number }) {
  return (
    <Text className="text-gold text-xs">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </Text>
  );
}

export default function RecentReviews() {
  const { reviews, loading } = useReviews(5);

  if (loading || reviews.length === 0) return null;

  return (
    <View className="mb-4">
      <Text className="text-lg text-white font-sans-bold mb-3">Recent Reviews</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {reviews.map((review) => (
          <View key={review.id} className="mr-3 rounded-xl bg-gray-900 p-4 w-56">
            <Stars rating={review.rating} />
            {review.comment && (
              <Text className="mt-2 text-sm text-gray-300 font-sans" numberOfLines={2}>
                "{review.comment}"
              </Text>
            )}
            <Text className="mt-2 text-xs text-warm-grey font-sans">
              {review.booking?.clientName?.split(" ")[0] || "Customer"}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
