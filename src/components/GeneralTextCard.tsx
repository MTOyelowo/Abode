import { FC } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { theme } from "../../theme";
import { Text } from "@ui-kitten/components";

interface Props {
  heading: string;
  body: string[];
  style?: ViewStyle | ViewStyle[];
}

const GeneralTextCard: FC<Props> = ({ heading, body, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text category="c1" style={styles.heading}>
        {heading}
      </Text>
      {body.map((item) => (
        <Text category="c1" key={item}>
          {item}
        </Text>
      ))}
    </View>
  );
};

export default GeneralTextCard;

const styles = StyleSheet.create({
  container: {
    width: 250,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme["color-gray"],
  },
  heading: {
    fontWeight: "bold",
    textTransform: "capitalize",
    paddingVertical: 4,
  },
});
