import { StyleSheet, View, ViewStyle } from "react-native";
import { IProperty } from "../../../types/property";
import ImageCarousel from "./childComponents/ImageCarousel";

import CardInformation from "./childComponents/CardInformation";

const Card = ({
  property,
  style,
}: {
  property: IProperty;
  style?: ViewStyle;
}) => {
  return (
    <View style={style}>
      <ImageCarousel images={property.images} />
      <CardInformation property={property} />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
