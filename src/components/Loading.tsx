import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { FC, useEffect, useRef } from "react";
import { Text } from "@ui-kitten/components";

const Loading = () => {
  const animation = useRef<LottieView | null>(null);

  setTimeout(() => {
    animation.current?.play();
  }, 100);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        autoPlay
        style={styles.lottie}
        source={require("../../assets/lotties/Loading.json")}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    height: 250,
    width: 250,
    marginBottom: 20,
    alignSelf: "center",
  },
});
