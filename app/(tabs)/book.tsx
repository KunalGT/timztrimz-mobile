import { useState, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useServices } from "../../hooks/useServices";
import { useAvailability } from "../../hooks/useAvailability";
import { useUserData } from "../../hooks/useUserData";
import { createBooking } from "../../lib/api";
import { saveUserData } from "../../lib/storage";
import { Service, Booking } from "../../lib/types";
import { COLORS } from "../../lib/constants";
import StepIndicator from "../../components/booking/StepIndicator";
import ServicePicker from "../../components/booking/ServicePicker";
import DatePicker from "../../components/booking/DatePicker";
import TimeSlotGrid from "../../components/booking/TimeSlotGrid";
import DetailsForm from "../../components/booking/DetailsForm";
import ConfirmationCard from "../../components/booking/ConfirmationCard";
import SuccessScreen from "../../components/booking/SuccessScreen";

export default function BookScreen() {
  const params = useLocalSearchParams<{ serviceId?: string }>();
  const { services } = useServices();
  const { userData } = useUserData();

  const [step, setStep] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Cuts");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");

  const { slots, loading: slotsLoading, dayOff } = useAvailability(
    selectedDate,
    selectedService?.duration || null
  );

  // Auto-fill form from saved user data
  useEffect(() => {
    if (userData && !formData.name) {
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        email: userData.email || "",
        notes: "",
      });
    }
  }, [userData]);

  // Pre-select service from params
  useEffect(() => {
    if (params.serviceId && services.length > 0) {
      const service = services.find((s) => s.id === params.serviceId);
      if (service) {
        setSelectedService(service);
        setActiveCategory(service.category);
      }
    }
  }, [params.serviceId, services]);

  const canProceed = () => {
    switch (step) {
      case 0: return !!selectedService;
      case 1: return !!selectedDate && !!selectedTime;
      case 2: return formData.name.trim() !== "" && formData.phone.trim() !== "" && formData.email.trim() !== "";
      default: return true;
    }
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return;
    setSubmitting(true);
    setError("");

    try {
      const result = await createBooking({
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        serviceId: selectedService.id,
        date: selectedDate,
        startTime: selectedTime,
        notes: formData.notes || undefined,
      });

      // Save user data for next time
      await saveUserData({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      });

      setBooking(result);
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetFlow = () => {
    setStep(0);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: userData?.name || "", phone: userData?.phone || "", email: userData?.email || "", notes: "" });
    setBooking(null);
    setError("");
  };

  // Success screen
  if (step === 4 && booking) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <ScrollView className="flex-1">
          <SuccessScreen booking={booking} selectedDate={selectedDate!} onBookAnother={resetFlow} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-4 pt-4">
        <StepIndicator currentStep={step} />

        <View className="flex-1">
          {step === 0 && (
            <ServicePicker
              services={services}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              selectedService={selectedService}
              onSelectService={setSelectedService}
            />
          )}

          {step === 1 && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-2xl font-display text-gold mb-1">Pick a date & time</Text>
              <Text className="text-sm text-warm-grey font-sans mb-4">
                {selectedService?.name} — {selectedService?.duration} min
              </Text>
              <DatePicker
                selectedDate={selectedDate}
                onSelect={(d) => { setSelectedDate(d); setSelectedTime(null); }}
              />
              {selectedDate && (
                <TimeSlotGrid
                  slots={slots}
                  loading={slotsLoading}
                  dayOff={dayOff}
                  selectedTime={selectedTime}
                  onSelect={setSelectedTime}
                />
              )}
            </ScrollView>
          )}

          {step === 2 && (
            <DetailsForm formData={formData} onChange={setFormData} />
          )}

          {step === 3 && selectedService && selectedDate && selectedTime && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <ConfirmationCard
                service={selectedService}
                date={selectedDate}
                time={selectedTime}
                clientName={formData.name}
                notes={formData.notes}
                error={error}
              />
            </ScrollView>
          )}
        </View>

        {/* Navigation */}
        <View className="flex-row items-center justify-between py-4 border-t border-gray-800">
          {step > 0 ? (
            <Pressable onPress={() => setStep(step - 1)} className="flex-row items-center px-4 py-2.5">
              <Text className="text-warm-grey font-sans-medium text-sm">{"\u2190"} Back</Text>
            </Pressable>
          ) : (
            <View />
          )}

          {step < 3 ? (
            <Pressable
              disabled={!canProceed()}
              onPress={() => setStep(step + 1)}
              className={`bg-gold rounded-full px-6 py-2.5 ${!canProceed() ? "opacity-40" : ""}`}
            >
              <Text className="text-black font-sans-semibold text-sm">Continue {"\u2192"}</Text>
            </Pressable>
          ) : (
            <Pressable
              disabled={submitting}
              onPress={handleSubmit}
              className={`bg-gold rounded-full px-6 py-2.5 flex-row items-center ${submitting ? "opacity-60" : ""}`}
            >
              {submitting && <ActivityIndicator size="small" color="#000" className="mr-2" />}
              <Text className="text-black font-sans-semibold text-sm">
                {submitting ? "Booking..." : "Confirm Booking"}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
