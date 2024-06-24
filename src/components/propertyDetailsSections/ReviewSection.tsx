import { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { IProperty } from "../../../types/property";
import { Button, Text } from "@ui-kitten/components";
import OverallReviewScoreCard from "../OverallReviewScoreCard";
import ReviewCard from "../ReviewCard";

interface Props {
  property: IProperty;
}

const ReviewSection: FC<Props> = ({ property }) => {
  return (
    <>
      <Text category="h5" style={styles.defaultMarginVertical}>
        Review
      </Text>

      {property.reviews ? (
        <>
          <OverallReviewScoreCard
            key={property.id}
            numberOfReviews={property.reviews?.length || 0}
            score={property.stars}
            style={styles.defaultMarginVertical}
          />
          <FlatList
            data={property.reviews}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.flatListMargin}
            keyExtractor={(item) => item.ID.toString()}
            renderItem={({ item, index }) => <ReviewCard review={item} />}
          />
        </>
      ) : null}

      <Button
        onPress={() => console.log("navigate to the review section")}
        style={styles.defaultMarginVertical}
      >
        Write a Review
      </Button>
    </>
  );
};

export default ReviewSection;

const styles = StyleSheet.create({
  container: {},
  defaultMarginVertical: {
    marginVertical: 10,
  },
  flatListMargin: {
    marginBottom: 50,
  },
});
