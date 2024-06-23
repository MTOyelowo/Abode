import { FC } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { IScore } from "../../types/score";
import { openURL } from "../utils/openURL";
import { theme } from "../../theme";
import Row from "./core/Row";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  score: IScore;
  style: ViewStyle | ViewStyle[];
}

const ScoreCard: FC<Props> = ({ score, style }) => {
  const handlePress = () => {
    const url = "https://www.redfin.com/how-walk-score-works";
    openURL(url);
  };
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) =>
        pressed
          ? [styles.container, style, styles.activeBackground]
          : [styles.container, style]
      }
    >
      <Row style={styles.row}>
        <Text category="h6" style={styles.mainText}>
          {score.type} Score
        </Text>
        <MaterialCommunityIcons
          name="registered-trademark"
          color="black"
          size={16}
        />
        <Text category="h6">{score.score}</Text>
      </Row>
      <Text category="h6">{score.description}</Text>
    </Pressable>
  );
};

export default ScoreCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: theme["color-gray"],
    borderWidth: 1,
    padding: 12,
    width: 250,
    justifyContent: "space-between",
  },
  activeBackground: {
    backgroundColor: theme["color-gray"],
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 30,
  },
  mainText: {
    width: "75%",
  },
});
