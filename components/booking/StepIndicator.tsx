import { View, Text } from "react-native";

const STEPS = [
  { label: "Service", icon: "\u2702\uFE0F" },
  { label: "Date & Time", icon: "\uD83D\uDCC5" },
  { label: "Details", icon: "\uD83D\uDC64" },
  { label: "Confirm", icon: "\u2713" },
];

interface Props {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: Props) {
  return (
    <View className="flex-row items-center justify-between mb-6 px-2">
      {STEPS.map((step, i) => (
        <View key={step.label} className="flex-row flex-1 items-center">
          <View className="items-center">
            <View
              className={`h-10 w-10 rounded-full items-center justify-center ${
                i === currentStep
                  ? "bg-gold"
                  : i < currentStep
                  ? "bg-gold/20"
                  : "bg-gray-800"
              }`}
            >
              <Text className={`text-base ${i === currentStep ? "text-black" : i < currentStep ? "text-gold" : "text-gray-500"}`}>
                {step.icon}
              </Text>
            </View>
            <Text
              className={`mt-1 text-[10px] font-sans-medium ${
                i === currentStep ? "text-gold" : i < currentStep ? "text-gold/60" : "text-gray-500"
              }`}
            >
              {step.label}
            </Text>
          </View>
          {i < STEPS.length - 1 && (
            <View className={`flex-1 h-px mx-2 ${i < currentStep ? "bg-gold/30" : "bg-gray-700"}`} />
          )}
        </View>
      ))}
    </View>
  );
}
