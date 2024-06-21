import { StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { Divider, Text } from "@ui-kitten/components";
import { theme } from "../../theme";
import Row from "./core/Row";

const TextDivider = ({ text, style }: { text: string; style?: ViewStyle }) => {
  return (
    <Row style={[styles.container, style as ViewStyle]}>
      <Divider style={styles.divider} />
      <Text style={styles.orText} appearance="hint">
        {text}
      </Text>
      <Divider style={styles.divider} />
    </Row>
  );
};

export default TextDivider;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    borderWidth: StyleSheet.hairlineWidth,
    width: "45%",
    borderColor: theme["color-gray"],
  },
  orText: {
    paddingHorizontal: 10,
    marginTop: -5,
  },
});
