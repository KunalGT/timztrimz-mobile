import { View, Text } from "react-native";
import { Service } from "../../lib/types";
import { formatDate, formatTime, formatPrice } from "../../lib/utils";

interface Props {
  service: Service;
  date: string;
  time: string;
  clientName: string;
  notes: string;
  error?: string;
}

export default function ConfirmationCard({ service, date, time, clientName, notes, error }: Props) {
  return (
    <View>
      <Text className="text-2xl font-display text-gold mb-1">Confirm your booking</Text>
      <Text className="text-sm text-warm-grey font-sans mb-4">Check the details below</Text>

      <View className="rounded-xl border border-gray-800 bg-gray-900 p-5">
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1 mr-3">
            <Text className="text-white font-sans-semibold text-base">{service.name}</Text>
            {service.description && (
              <Text className="mt-1 text-sm text-warm-grey font-sans">{service.description}</Text>
            )}
          </View>
          <Text className="text-lg font-sans-bold text-gold">{formatPrice(service.price)}</Text>
        </View>

        <View className="h-px bg-gray-800 mb-4" />

        <View className="flex-row flex-wrap">
          <View className="w-1/2 mb-3">
            <Text className="text-xs text-warm-grey font-sans">Date</Text>
            <Text className="text-sm font-sans-medium text-white mt-0.5">{formatDate(date)}</Text>
          </View>
          <View className="w-1/2 mb-3">
            <Text className="text-xs text-warm-grey font-sans">Time</Text>
            <Text className="text-sm font-sans-medium text-white mt-0.5">{formatTime(time)}</Text>
          </View>
          <View className="w-1/2 mb-3">
            <Text className="text-xs text-warm-grey font-sans">Duration</Text>
            <Text className="text-sm font-sans-medium text-white mt-0.5">{"\u23F1"} {service.duration} min</Text>
          </View>
          <View className="w-1/2 mb-3">
            <Text className="text-xs text-warm-grey font-sans">Client</Text>
            <Text className="text-sm font-sans-medium text-white mt-0.5">{clientName}</Text>
          </View>
        </View>

        {notes ? (
          <>
            <View className="h-px bg-gray-800 mb-3" />
            <View>
              <Text className="text-xs text-warm-grey font-sans">Notes</Text>
              <Text className="mt-1 text-sm text-white font-sans">{notes}</Text>
            </View>
          </>
        ) : null}
      </View>

      {error ? (
        <View className="mt-3 rounded-lg bg-danger/10 px-4 py-3">
          <Text className="text-sm text-danger font-sans">{error}</Text>
        </View>
      ) : null}
    </View>
  );
}
