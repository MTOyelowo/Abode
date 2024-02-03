import { FlatList, Image, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { WIDTH } from "../../../../constants";

const ImageCarousel = ({ images }: { images: string[] }) => {
  const flatListRef = useRef<FlatList | null>(null);
  const viewConfig = { viewAreaCoveragePercentThreshold: 95 };

  const [activeIndex, setActiveIndex] = useState(0);

  const onViewRef = useRef(({ changed }: { changed: any }) => {
    if (changed[0].isViewable) {
      setActiveIndex(changed[0].index);
    }
  });

  const handlePressLeft = () => {
    if (activeIndex === 0)
      return flatListRef.current?.scrollToIndex({
        animated: false,
        index: images.length - 1,
      });
    flatListRef.current?.scrollToIndex({
      index: activeIndex - 1,
    });
  };

  const handlePressRight = () => {
    if (activeIndex === images.length - 1)
      return flatListRef.current?.scrollToIndex({
        animated: false,
        index: 0,
      });
    flatListRef.current?.scrollToIndex({
      index: activeIndex + 1,
    });
  };

  return (
    <>
      <FlatList
        ref={(ref) => (flatListRef.current = ref)}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        pagingEnabled
        viewabilityConfig={viewConfig}
        onViewableItemsChanged={onViewRef.current}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />
      <Pressable
        onPress={handlePressLeft}
        style={[styles.chevronButton, { left: 5 }]}
      >
        <MaterialCommunityIcons name="chevron-left" color="white" size={45} />
      </Pressable>
      <Pressable
        onPress={handlePressRight}
        style={[styles.chevronButton, { right: 5 }]}
      >
        <MaterialCommunityIcons name="chevron-right" color="white" size={45} />
      </Pressable>
    </>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  image: {
    width: WIDTH,
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  chevronButton: {
    position: "absolute",
    top: 90,
  },
});
