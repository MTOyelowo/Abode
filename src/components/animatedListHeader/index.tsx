import { Animated, LayoutChangeEvent, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { HEADERHEIGHT, LISTMARGIN } from "../../../constants";
import { theme } from "../../../theme";
import { Divider } from "@ui-kitten/components";
import HeaderInput from "./childComponents/HeaderInput";
import HeaderFilterButtons from "./childComponents/HeaderFilterButtons";
import HeaderLogistics from "./childComponents/HeaderLogistics";

const AnimatedListHeader = ({
  scrollAnimation,
  mapShown,
  setMapShown,
  location,
  availableProperties,
}: {
  scrollAnimation: Animated.Value;
  mapShown: boolean;
  setMapShown: (bool: boolean) => void;
  location: string;
  availableProperties?: number;
}) => {
  const [offsetAnimation] = useState(new Animated.Value(0));
  const [clampedScroll, setClampedScroll] = useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: "clamp",
        }),
        offsetAnimation
      ),
      0,
      1
    )
  );

  const navbarTabTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADERHEIGHT],
    outputRange: [0, -HEADERHEIGHT],
    extrapolate: "clamp",
  });

  const onLayout = (event: LayoutChangeEvent) => {
    let { height } = event.nativeEvent.layout;
    setClampedScroll(
      Animated.diffClamp(
        Animated.add(
          scrollAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: "clamp",
          }),
          offsetAnimation
        ),
        0,
        height
      )
    );
  };

  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        styles.header,
        { transform: [{ translateY: navbarTabTranslate }] },
      ]}
    >
      <View style={styles.headerContainer}>
        <HeaderInput location={location} />
        <HeaderFilterButtons />
      </View>

      <Divider style={{ backgroundColor: theme["color-gray"] }} />

      <HeaderLogistics
        setMapShown={setMapShown}
        mapShown={mapShown}
        availableProperties={availableProperties}
      />
    </Animated.View>
  );
};

export default AnimatedListHeader;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 10,
    right: 0,
    left: 0,
    zIndex: 1000,
    height: HEADERHEIGHT,
    backgroundColor: "white",
  },
  headerContainer: {
    marginHorizontal: LISTMARGIN,
  },
});
