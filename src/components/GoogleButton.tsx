import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import * as WebBrowser from "expo-web-browser";

import { GoogleLogo } from "./logos/GoogleLogo";

WebBrowser.maybeCompleteAuthSession();

const GoogleButton = ({
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
      <GoogleLogo style={styles.logo} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 5,
    backgroundColor: "white",
    height: 50,
  },
  logo: {
    marginLeft: 10,
    marginTop: 1,
  },
  text: {
    color: "#36454F",
    alignSelf: "center",
    marginLeft: 40,
    fontWeight: "bold",
    fontSize: 15,
  },
});
