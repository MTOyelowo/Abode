import { FC } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Row from "./core/Row";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../theme";

interface Props {
  score: number;
  style?: ViewStyle | ViewStyle[];
}

const Stars: FC<Props> = ({ score, style }) => {
  return (
    <Row style={style}>
      {[1, 2, 3, 4, 5].map((item, index) => {
        let decimalValue = score % 1;
        let compareScore = score | 0;

        if (score / item >= 1)
          return (
            <MaterialCommunityIcons
              key={item}
              name="star"
              size={24}
              color={theme["color-primary-500"]}
            />
          );
        else if (decimalValue > 0 && compareScore === index)
          if (decimalValue >= 0.5)
            return (
              <MaterialCommunityIcons
                key={item}
                name="star-half-full"
                size={24}
                color={theme["color-primary-500"]}
              />
            );

        return (
          <MaterialCommunityIcons
            key={item}
            name="star-outline"
            size={24}
            color={theme["color-primary-500"]}
          />
        );
      })}
    </Row>
  );
};

export default Stars;

const styles = StyleSheet.create({
  container: {},
});
