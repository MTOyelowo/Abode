import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Divider, Text } from "@ui-kitten/components";
import { properties } from "../../../data/properties";
import ImageCarousel from "../../components/card/childComponents/ImageCarousel";
import { RootStackParamList } from "../../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import PropertyHeaderSection from "../../components/propertyDetailsSections/PropertyHeaderSection";
import { theme } from "../../../theme";
import PricingAndFloorPlanSection from "../../components/PricingAndFloorPlanSection";
import AboutSection from "../../components/propertyDetailsSections/AboutSection";
import ContactSection from "../../components/propertyDetailsSections/ContactSection";
import Screen from "../../components/Screen";
import AmenitiesSection from "../../components/propertyDetailsSections/AmenitiesSection";
import LeaseAndFeesSection from "../../components/propertyDetailsSections/LeaseAndFeesSection";
import LocationSection from "../../components/propertyDetailsSections/LocationSection";

type Props = NativeStackScreenProps<RootStackParamList, "PropertyDetails">;

const PropertyDetailsScreen: FC<Props> = ({ route }) => {
  const propertyId = route.params.propertyID;
  const index = properties.findIndex((i) => i.id === propertyId);

  const propertyToShow = properties[index];
  return (
    <Screen>
      <ScrollView>
        <>
          {propertyToShow.images ? (
            <ImageCarousel
              images={propertyToShow.images}
              indexShown
              imageStyle={styles.image}
            />
          ) : null}
          <View style={styles.contentContainer}>
            <PropertyHeaderSection property={propertyToShow} />
            <Divider style={styles.divider} />
            <PricingAndFloorPlanSection property={propertyToShow} />
            <Divider style={styles.divider} />
            <AboutSection property={propertyToShow} />
            <Divider style={styles.divider} />
            <ContactSection property={propertyToShow} />
            <Divider style={styles.divider} />
            <AmenitiesSection property={propertyToShow} />
            <Divider style={styles.divider} />
            <LeaseAndFeesSection property={propertyToShow} />
            <Divider style={styles.divider} />
            <LocationSection property={propertyToShow} />
          </View>
        </>
      </ScrollView>
      {/* <FlatList
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
              <PricingAndFloorPlanSection property={item} />
              <Divider style={styles.divider} />
              <AboutSection property={item} />
              <Divider style={styles.divider} />
            </View>
          </>
        )}
      /> */}
    </Screen>
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
