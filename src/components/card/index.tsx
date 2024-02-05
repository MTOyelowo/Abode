import { StyleSheet, View, ViewStyle } from "react-native";
import { IProperty } from "../../../types/property";
import ImageCarousel from "./childComponents/ImageCarousel";

import CardInformation from "./childComponents/CardInformation";
import { LISTMARGIN } from "../../../constants";

const Card = ({
  property,
  style,
}: {
  property: IProperty;
  style?: ViewStyle;
}) => {
  return (
    <View style={[styles.container, style]}>
      <ImageCarousel images={property.images} />
      <CardInformation property={property} />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: LISTMARGIN,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
