import {
  FlatList,
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { WIDTH } from "../../../../constants";
import { Text } from "@ui-kitten/components";

const ImageCarousel = ({
  images,
  chevronShown,
  indexShown,
  imageStyle,
  onImagePress,
}: {
  images: string[];
  chevronShown?: boolean;
  indexShown?: boolean;
  imageStyle?: ImageStyle;
  onImagePress?: () => void;
}) => {
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
        renderItem={({ item }) => (
          <Pressable onPress={onImagePress}>
            <Image source={{ uri: item }} style={[styles.image, imageStyle]} />
          </Pressable>
        )}
      />
      {chevronShown ? (
        <>
          <Pressable
            onPress={handlePressLeft}
            style={[styles.chevronButton, { left: 5 }]}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              color="white"
              size={45}
            />
          </Pressable>
          <Pressable
            onPress={handlePressRight}
            style={[styles.chevronButton, { right: 5 }]}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              color="white"
              size={45}
            />
          </Pressable>
        </>
      ) : null}

      {indexShown ? (
        <View style={styles.index}>
          <Text category="c2" style={styles.indexText}>
            {activeIndex + 1} or {images.length} photos
          </Text>
        </View>
      ) : null}
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
  index: {
    position: "absolute",
    top: 20,
    left: 15,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // to achieve a black background opacity
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  indexText: {
    color: "#FFFFFF",
  },
});
