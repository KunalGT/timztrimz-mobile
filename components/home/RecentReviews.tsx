import { View, Text, ScrollView } from "react-native";
import { useReviews } from "../../hooks/useReviews";
import Skeleton from "../ui/Skeleton";

function Stars({ rating }: { rating: number }) {
  return (
    <Text className="text-gold text-xs">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </Text>
  );
}

function SkeletonReviewCard() {
  return (
    <View className="mr-3 rounded-xl bg-gray-900 p-4 w-56">
      <Skeleton width={80} height={12} />
      <Skeleton width="90%" height={12} className="mt-2" />
      <Skeleton width={50} height={10} className="mt-2" />
    </View>
  );
}

export default function RecentReviews() {
  const { reviews, loading } = useReviews(5);

  if (loading) {
    return (
      <View className="mb-4">
        <Text className="text-lg text-white font-sans-bold mb-3">Recent Reviews</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((i) => <SkeletonReviewCard key={i} />)}
        </ScrollView>
      </View>
    );
  }

  if (reviews.length === 0) return null;

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
