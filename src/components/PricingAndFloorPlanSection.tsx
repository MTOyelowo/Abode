import { FC, useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { IProperty } from "../../types/property";
import { Divider, Text } from "@ui-kitten/components";
import TabBar from "./TabBar";
import { theme } from "../../theme";
import Row from "./core/Row";

const removeUnnecessaryButtons = (
  array: {
    title: string;
    onPress: () => void;
  }[],
  title: "Studio" | "1 Bedroom" | "2 Bedrooms" | "3+ Bedrooms"
) => {
  array.splice(array.findIndex((item) => item.title === title));
};

interface Props {
  property: IProperty;
}

const PricingAndFloorPlanSection: FC<Props> = ({ property }) => {
  const [currentApartments, setCurrentApartments] = useState(
    property.apartments
  );

  useEffect(() => {
    if (property.apartments !== currentApartments) {
      setCurrentApartments(property.apartments);
    }
  }, [property]);

  const filterByBedroom = (
    numberOfBedrooms: number,
    equalityType: "gt" | "eq"
  ) => {
    if (property.apartments) {
      let filtered;

      if (equalityType === "eq")
        filtered = property.apartments.filter(
          (i) => i.bedrooms === numberOfBedrooms
        );
      else
        filtered = property.apartments.filter(
          (i) => i.bedrooms > numberOfBedrooms
        );

      setCurrentApartments(filtered);
    }
  };

  const floorPlanOptions = [
    {
      title: "All",
      onPress: () => setCurrentApartments(property.apartments),
    },
    {
      title: "Studio",
      onPress: () => filterByBedroom(0, "eq"),
    },
    {
      title: "1 Bedroom",
      onPress: () => filterByBedroom(1, "eq"),
    },
    {
      title: "2 Bedrooms",
      onPress: () => filterByBedroom(2, "eq"),
    },
    {
      title: "3+ Bedrooms",
      onPress: () => filterByBedroom(2, "gt"),
    },
  ];

  let containsStudio,
    contains1Bed,
    contains2Bed,
    contains3Plus = false;

  if (property.apartments && property.apartments.length > 0) {
    for (let i in property.apartments) {
      if (property.apartments[i].bedrooms === 0) containsStudio = true;
      if (property.apartments[i].bedrooms === 1) contains1Bed = true;
      if (property.apartments[i].bedrooms === 2) contains2Bed = true;
      if (property.apartments[i].bedrooms >= 3) contains3Plus = true;
    }
    if (!containsStudio) removeUnnecessaryButtons(floorPlanOptions, "Studio");
    if (!contains1Bed) removeUnnecessaryButtons(floorPlanOptions, "1 Bedroom");
    if (!contains2Bed) removeUnnecessaryButtons(floorPlanOptions, "2 Bedrooms");
    if (!contains3Plus)
      removeUnnecessaryButtons(floorPlanOptions, "3+ Bedrooms");
  }

  return (
    <>
      <Text category="h5" style={styles.defaultMarginVertical}>
        Pricing & Floor Plans
      </Text>

      {currentApartments && currentApartments.length > 0 ? (
        <>
          <TabBar
            tabs={floorPlanOptions}
            style={styles.defaultMarginVertical}
          />
          {currentApartments.map((item) => (
            <View
              style={[styles.container, styles.defaultMarginVertical]}
              key={item.ID.toString()}
            >
              <Row>
                <View style={styles.apartmentLogisticsContainer}>
                  <Text style={styles.apartmentLogisticsTitle}>
                    {item.bedrooms === 0 ? "Studio " : item.bedrooms + " Bed"}{" "}
                    {item.bathrooms} Bath
                  </Text>
                  <Text style={styles.apartmentLogisticsMargin} category="c1">
                    {item.rent.toLocaleString("en-US")}
                  </Text>
                  <Text style={styles.apartmentLogisticsTitle} category="c1">
                    {item.bedrooms === 0 ? "Studio " : item.bedrooms + " Bed, "}{" "}
                    {item.bathrooms + " Bath, "}{" "}
                    {item.sqFt.toLocaleString("en-US") + " sqft"}
                  </Text>
                </View>
                {item.images && item.images.length > 0 ? (
                  <Image
                    source={{ uri: item.images[0] }}
                    style={styles.image}
                  />
                ) : null}
              </Row>
              <Row style={styles.availableNowContainer}>
                <Text category="c1" style={{ fontWeight: "600" }}>
                  Available: Now
                </Text>
                <TouchableOpacity
                  onPress={() => console.log("navigate to floor plan details")}
                >
                  <Text category="c1" status="info">
                    Floor Plan Details
                  </Text>
                </TouchableOpacity>
              </Row>
              <Divider style={styles.divider} />
              <Row>
                <Text category="c1" style={styles.layeredText}>
                  Unit
                </Text>
                <Text category="c1" style={styles.layeredText}>
                  Price
                </Text>
                <Text category="c1" style={styles.layeredText}>
                  Sq Ft
                </Text>
                <Text category="c1" style={styles.layeredText}>
                  Availability
                </Text>
              </Row>
              <Divider style={styles.divider} />
              <Row style={styles.defaultMarginVertical}>
                <Text category="c1" style={styles.layeredText}>
                  {item.unit}
                </Text>
                <Text category="c1" style={styles.layeredText}>
                  {item.rent.toLocaleString("en-US")}
                </Text>
                <Text category="c1" style={styles.layeredText}>
                  {item.sqFt.toLocaleString("en-US")}
                </Text>
                <Text category="c1" style={styles.availableText}>
                  {new Date().toLocaleString("en", {
                    year: "numeric",
                    month: "2-digit",
                    day: "numeric",
                  })}
                </Text>
              </Row>
              <Divider style={styles.divider} />
            </View>
          ))}
        </>
      ) : (
        <>
          <Text style={styles.apartmentLogisticsTitle}>
            No ;Apartments Listed
          </Text>
        </>
      )}
    </>
  );
};

export default PricingAndFloorPlanSection;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    borderColor: theme["color-gray"],
    borderWidth: 1,
    borderRadius: 5,
  },
  defaultMarginVertical: {
    marginVertical: 10,
  },
  apartmentLogisticsContainer: {
    flexShrink: 1,
    width: "90%",
    paddingRight: 10,
    marginTop: -5,
  },
  apartmentLogisticsTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  apartmentLogisticsMargin: { marginTop: 1 },
  image: {
    height: 60,
    width: 60,
    borderRadius: 5,
    borderColor: theme["color-gray"],
    borderWidth: 1,
  },
  availableNowContainer: {
    marginTop: 15,
    justifyContent: "space-between",
  },
  divider: {
    backgroundColor: theme["color-gray"],
    marginTop: 5,
  },
  layeredText: {
    width: "21%",
  },
  availableText: {
    width: "37%",
  },
});
