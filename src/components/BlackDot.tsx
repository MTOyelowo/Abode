import { FC } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface Props {
  style?: ViewStyle | ViewStyle[];
}

const BlackDot: FC<Props> = ({ style }) => {
  return <View style={[styles.dot, style]} />;
};

export default BlackDot;

const styles = StyleSheet.create({
  dot: {
    padding: 3,
    height: 3,
    marginTop: 7,
    backgroundColor: "black",
    borderRadius: 30,
    marginRight: 10,
  },
});
