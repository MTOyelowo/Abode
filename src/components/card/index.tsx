import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { IProperty } from "../../../types/property";
import ImageCarousel from "./childComponents/ImageCarousel";
import CardInformation from "./childComponents/CardInformation";
import { LISTMARGIN } from "../../../constants";
import { useNavigation } from "@react-navigation/native";

const Card = ({
  property,
  onPress,
  style,
}: {
  property: IProperty;
  style?: ViewStyle;
  onPress?: () => void;
}) => {
  const { navigate } = useNavigation();

  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <ImageCarousel
        images={property.images}
        chevronShown={true}
        onImagePress={onPress}
      />
      <CardInformation property={property} />
    </Pressable>
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
