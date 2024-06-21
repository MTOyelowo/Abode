import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Screen = ({ children, style }: { children: any; style?: ViewStyle }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar />
      {children}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
