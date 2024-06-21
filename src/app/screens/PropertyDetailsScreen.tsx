import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Divider, Text } from "@ui-kitten/components";
import { properties } from "../../../data/properties";
import ImageCarousel from "../../components/card/childComponents/ImageCarousel";
import { RootStackParamList } from "../../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import PropertyHeaderSection from "../../components/propertyDetailsSections/PropertyHeaderSection";
import { theme } from "../../../theme";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "PropertyDetailsScreen"
>;

const PropertyDetailsScreen: FC<Props> = ({ route }) => {
  const propertyId = route.params.propertyID;
  const index = properties.findIndex((i) => i.id === propertyId);

  const propertyToShow = properties[index];
  return (
    <View style={styles.container}>
      <FlatList
        data={[propertyToShow]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            {item.images ? (
              <ImageCarousel
                images={item.images}
                indexShown
                imageStyle={styles.image}
              />
            ) : null}
            <View style={styles.contentContainer}>
              <PropertyHeaderSection property={item} />
              <Divider style={styles.divider} />
            </View>
          </>
        )}
      />
    </View>
  );
};

export default PropertyDetailsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  image: {
    width: Dimensions.get("window").width,
    height: 250,
    borderTopEndRadius: 0,
  },
  contentContainer: {
    marginHorizontal: 10,
  },
  divider: {
    backgroundColor: theme["color-gray"],
    marginTop: 10,
  },
});
