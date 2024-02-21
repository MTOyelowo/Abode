import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";

const Row = ({
  children,
  style,
}: {
  children: any;
  style?: ViewStyle | ViewStyle[];
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
