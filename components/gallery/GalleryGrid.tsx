import { FlatList, View, Text, Pressable, Dimensions, RefreshControl } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { GalleryImage } from "../../lib/types";
import { COLORS } from "../../lib/constants";

const SCREEN_WIDTH = Dimensions.get("window").width;
const IMAGE_SIZE = (SCREEN_WIDTH - 48) / 2;

interface Props {
  images: GalleryImage[];
  loading: boolean;
  onRefresh: () => void;
}

export default function GalleryGrid({ images, loading, onRefresh }: Props) {
  const renderItem = ({ item }: { item: GalleryImage }) => (
    <Pressable
      onPress={() => router.push({ pathname: "/gallery/[id]", params: { id: item.id, url: item.url, caption: item.caption || "" } })}
      className="mb-3"
      style={{ width: IMAGE_SIZE }}
    >
      <View className="rounded-xl overflow-hidden">
        <Image
          source={{ uri: item.url }}
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
          contentFit="cover"
          transition={200}
        />
        {item.caption && (
          <View className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1.5">
            <Text className="text-white text-xs font-sans" numberOfLines={1}>{item.caption}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} tintColor={COLORS.gold} />
      }
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}
