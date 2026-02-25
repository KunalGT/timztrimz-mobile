import { Modal, View, Text, Pressable } from "react-native";
import { Booking } from "../../lib/types";
import { formatDate, formatTime } from "../../lib/utils";

interface Props {
  visible: boolean;
  booking: Booking;
  loading: boolean;
  onCancel: () => void;
  onClose: () => void;
}

export default function CancelConfirmModal({ visible, booking, loading, onCancel, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/80 items-center justify-center px-6">
        <View className="w-full bg-gray-900 rounded-2xl p-6">
          <Text className="text-xl font-display text-danger mb-2">Cancel Booking?</Text>
          <Text className="text-sm text-warm-grey font-sans mb-4">
            Are you sure you want to cancel this appointment?
          </Text>

          <View className="rounded-lg bg-gray-800 p-3 mb-5">
            <Text className="text-white font-sans-semibold">{booking.service?.name}</Text>
            <Text className="text-sm text-warm-grey font-sans mt-1">
              {formatDate(booking.date)} at {formatTime(booking.startTime)}
            </Text>
          </View>

          <Pressable
            onPress={onCancel}
            disabled={loading}
            className={`bg-danger rounded-full py-3 items-center mb-3 ${loading ? "opacity-60" : ""}`}
          >
            <Text className="text-white font-sans-semibold text-sm">
              {loading ? "Cancelling..." : "Cancel Booking"}
            </Text>
          </Pressable>

          <Pressable onPress={onClose} className="py-3 items-center">
            <Text className="text-warm-grey font-sans-medium text-sm">Keep Booking</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
