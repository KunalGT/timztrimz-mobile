import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGallery } from "../../hooks/useGallery";
import CategoryFilterChips from "../../components/gallery/CategoryFilterChips";
import GalleryGrid from "../../components/gallery/GalleryGrid";
import { SkeletonGalleryItem } from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";

export default function GalleryScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const category = activeCategory === "All" ? undefined : activeCategory;
  const { images, loading, refetch } = useGallery(category);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-display text-gold mb-4">Gallery</Text>
        <CategoryFilterChips active={activeCategory} onChange={setActiveCategory} />
      </View>
      <View className="flex-1 px-4">
        {loading && images.length === 0 ? (
          <View className="flex-row flex-wrap mt-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <View key={i} className="w-1/2 p-1">
                <SkeletonGalleryItem />
              </View>
            ))}
          </View>
        ) : images.length === 0 ? (
          <EmptyState icon="📸" title="No images yet" subtitle="Check back soon for fresh styles" />
        ) : (
          <GalleryGrid images={images} loading={loading} onRefresh={refetch} />
        )}
      </View>
    </SafeAreaView>
  );
}
