import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import Row from "./core/Row";

const ModalHeader = ({
  xShown,
  text,
  style,
}: {
  xShown?: boolean;
  text?: string;
  style?: ViewStyle | ViewStyle[];
}) => {
  const router = useRouter();

  if (text) {
    return (
      <Row style={[styles.container, style as ViewStyle]}>
        {xShown ? (
          <MaterialCommunityIcons
            onPress={router.back}
            style={styles.x}
            name="close"
            color={"black"}
            size={24}
          />
        ) : null}
        <Text category={"h5"}>{text}</Text>
      </Row>
    );
  }

  return (
    <View>
      <View />
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  x: {
    position: "absolute",
    left: 10,
    alignSelf: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#A4A4A4",
  },
  bar: {
    width: 50,
    backgroundColor: "#A4A4A4",
    height: 4,
    borderRadius: 30,
  },
});
