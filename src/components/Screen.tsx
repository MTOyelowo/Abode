import {
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = ({ children, style }: { children: any; style?: ViewStyle }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar barStyle={"dark-content"} />
      {children}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
