import { useState } from "react";
import { Modal, View, Text, Pressable, TextInput } from "react-native";
import { submitReview } from "../../lib/api";

interface Props {
  visible: boolean;
  phone: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewModal({ visible, phone, onClose, onSuccess }: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    setError("");
    try {
      await submitReview({ phone, rating, comment: comment || undefined });
      setRating(0);
      setComment("");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/80 items-center justify-center px-6">
        <View className="w-full bg-gray-900 rounded-2xl p-6">
          <Text className="text-xl font-display text-gold mb-2">Leave a Review</Text>
          <Text className="text-sm text-warm-grey font-sans mb-4">How was your experience?</Text>

          {/* Star Rating */}
          <View className="flex-row justify-center gap-2 mb-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} onPress={() => setRating(star)}>
                <Text className="text-3xl">{star <= rating ? "\u2605" : "\u2606"}</Text>
              </Pressable>
            ))}
          </View>

          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Tell us about your visit (optional)"
            placeholderTextColor="#6B7280"
            multiline
            numberOfLines={3}
            className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white font-sans text-sm mb-4 min-h-[80px]"
            textAlignVertical="top"
          />

          {error ? <Text className="text-danger text-sm font-sans mb-3">{error}</Text> : null}

          <Pressable
            onPress={handleSubmit}
            disabled={rating === 0 || submitting}
            className={`bg-gold rounded-full py-3 items-center mb-3 ${rating === 0 || submitting ? "opacity-40" : ""}`}
          >
            <Text className="text-black font-sans-semibold text-sm">
              {submitting ? "Submitting..." : "Submit Review"}
            </Text>
          </Pressable>

          <Pressable onPress={onClose} className="py-3 items-center">
            <Text className="text-warm-grey font-sans-medium text-sm">Skip</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
