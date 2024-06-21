import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import * as WebBrowser from "expo-web-browser";

import { FacebookLogo } from "./logos/FacebookLogo";

WebBrowser.maybeCompleteAuthSession();

const FacebookButton = ({
  text,
  style,
  onPress,
}: {
  text: string;
  style?: ViewStyle;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <FacebookLogo style={styles.logo} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default FacebookButton;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#3B5998",
    height: 50,
  },
  logo: {
    marginLeft: 10,
    marginTop: 1,
  },
  text: {
    color: "#FFFFFF",
    alignSelf: "center",
    marginLeft: 40,
    fontWeight: "bold",
    fontSize: 15,
  },
});
