import { Text } from "@ui-kitten/components";
import { FC } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { IReview } from "../../types/review";
import { theme } from "../../theme";
import Row from "./core/Row";
import Stars from "./Stars";
import TextMoreOrLess from "./TextMoreOrLess";

interface Props {
  review: IReview;
  style?: ViewStyle | ViewStyle[];
}

const getFormattedDate = (date: Date) => {
  const dateStr = date.toDateString();
  const dateArr = dateStr.split(" ");
  return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
};

const ReviewCard: FC<Props> = ({ review, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Row style={styles.row}>
        <Stars score={review.stars} />
        <Text appearance="hint" category="c1">
          {getFormattedDate(new Date(review.CreatedAt))}
        </Text>
      </Row>
      <Text category="s1" style={styles.reviewTitle}>
        {review.title}
      </Text>
      <TextMoreOrLess children={review.body} initialLines={10} />
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: theme["color-gray"],
    width: 300,
    padding: 10,
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    flexShrink: 1,
    textTransform: "capitalize",
  },
});
