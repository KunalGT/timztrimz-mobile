import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { COLORS } from "../../lib/constants";

interface FormData {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface Props {
  formData: FormData;
  onChange: (data: FormData) => void;
}

export default function DetailsForm({ formData, onChange }: Props) {
  const inputClass = "w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3.5 text-white font-sans text-sm";

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-display text-gold mb-1">Your details</Text>
        <Text className="text-sm text-warm-grey font-sans mb-5">So Tim knows who's coming</Text>

        <View className="mb-4">
          <Text className="mb-1.5 text-sm font-sans-medium text-white">Name *</Text>
          <TextInput
            value={formData.name}
            onChangeText={(text) => onChange({ ...formData, name: text })}
            placeholder="Your full name"
            placeholderTextColor="#6B7280"
            className={inputClass}
          />
        </View>

        <View className="mb-4">
          <Text className="mb-1.5 text-sm font-sans-medium text-white">Phone *</Text>
          <TextInput
            value={formData.phone}
            onChangeText={(text) => onChange({ ...formData, phone: text })}
            placeholder="07700 900 000"
            placeholderTextColor="#6B7280"
            keyboardType="phone-pad"
            className={inputClass}
          />
        </View>

        <View className="mb-4">
          <Text className="mb-1.5 text-sm font-sans-medium text-white">Email *</Text>
          <TextInput
            value={formData.email}
            onChangeText={(text) => onChange({ ...formData, email: text })}
            placeholder="you@example.com"
            placeholderTextColor="#6B7280"
            keyboardType="email-address"
            autoCapitalize="none"
            className={inputClass}
          />
        </View>

        <View className="mb-4">
          <Text className="mb-1.5 text-sm font-sans-medium text-white">
            Notes <Text className="text-warm-grey font-sans">(optional)</Text>
          </Text>
          <TextInput
            value={formData.notes}
            onChangeText={(text) => onChange({ ...formData, notes: text })}
            placeholder="e.g. skin fade with 1 on sides"
            placeholderTextColor="#6B7280"
            multiline
            numberOfLines={3}
            className={`${inputClass} min-h-[80px]`}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
