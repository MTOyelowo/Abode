import {MaterialCommunityIcons} from "@expo/vector-icons";
import {View, StyleSheet, ViewStyle} from "react-native";
import {Text} from "@ui-kitten/components";

import Row from "./core/Row";
import {useNavigation} from "@react-navigation/native";

const ModalHeader = ({
  xShown,
  text,
  style,
}: {
  xShown?: boolean;
  text?: string;
  style?: ViewStyle | ViewStyle[];
}) => {
  const {goBack} = useNavigation();

  if (text) {
    return (
      <Row style={[styles.container, style as ViewStyle]}>
        {xShown ? (
          <MaterialCommunityIcons
            onPress={goBack}
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
