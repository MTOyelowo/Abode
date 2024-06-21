import { StyleSheet, View } from "react-native";
import React from "react";
import { IProperty } from "../../../../types/property";
import Row from "../../core/Row";
import { Button, Text } from "@ui-kitten/components";
import { theme } from "../../../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CardInformation = ({ property }: { property: IProperty }) => {
  return (
    <View style={styles.detailsContainer}>
      <Row style={styles.pricingContainer}>
        <Text category={"s1"}>
          ${property.rentLow.toLocaleString()} - $
          {property.rentHigh.toLocaleString()}
        </Text>
        <MaterialCommunityIcons
          name="heart-outline"
          color={theme["color-primary-500"]}
          size={24}
        />
      </Row>
      <Text category={"c1"}>
        {property.bedroomLow} - {property.bedroomHigh} beds
      </Text>
      <Text style={{ marginTop: 5 }} category={"c1"}>
        {property.name}
      </Text>
      <Text category={"c1"}>{property.street}</Text>
      <Text category={"c1"}>
        {property.city}, {property.state}, {property.zip}
      </Text>
      <Text category={"c1"} style={{ marginTop: 5 }}>
        {property.tags.map((tag, index) =>
          index === property.tags.length - 1 ? tag : `${tag}, `
        )}
      </Text>

      <Row style={styles.buttonRow}>
        <Button
          appearance="ghost"
          style={{
            borderColor: theme["color-primary-500"],
            width: "49%",
          }}
          size="small"
          onPress={() => console.log("Email the property manager")}
        >
          Email
        </Button>
        <Button
          style={{ width: "49%" }}
          size="small"
          onPress={() => console.log("Call the property manager")}
        >
          Call
        </Button>
      </Row>
    </View>
  );
};

export default CardInformation;

const styles = StyleSheet.create({
  detailsContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
    borderColor: theme["color-gray"],
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 5,
  },
  pricingContainer: {
    justifyContent: "space-between",
  },
  image: {
    width: "auto",
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  buttonRow: {
    marginTop: 5,
    justifyContent: "space-between",
    gap: 5,
  },
});
