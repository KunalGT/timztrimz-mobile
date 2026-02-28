import { View, Text, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function GalleryDetailScreen() {
  const { id, url, caption } = useLocalSearchParams<{ id: string; url: string; caption: string }>();

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        {/* Close button */}
        <Pressable
          onPress={() => router.back()}
          className="absolute top-14 right-4 z-10 h-10 w-10 rounded-full bg-black/60 items-center justify-center"
        >
          <Text className="text-white text-lg font-sans-bold">✕</Text>
        </Pressable>

        {/* Image */}
        <View className="flex-1 items-center justify-center">
          {url ? (
            <Image
              source={{ uri: url as string }}
              style={{ width, height: height * 0.7 }}
              contentFit="contain"
              transition={300}
            />
          ) : (
            <Text className="text-warm-grey font-sans">Image not available</Text>
          )}
        </View>

        {/* Caption */}
        {caption ? (
          <View className="px-6 pb-8">
            <Text className="text-white text-base font-sans-medium text-center">{caption}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </View>
  );
}
