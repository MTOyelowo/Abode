import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { IProperty } from "../../../types/property";
import { Text } from "@ui-kitten/components";
import Row from "../core/Row";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BulletedList from "../BulletedList";

interface Props {
  property: IProperty;
}

const AmenitiesSection: FC<Props> = ({ property }) => {
  return (
    <>
      <Text category="h5" style={styles.defaultMarginVertical}>
        Amenities
      </Text>
      <Row style={styles.row}>
        <MaterialCommunityIcons
          name="google-circles-communities"
          color="black"
          size={24}
        />
        <Text style={styles.text} category="h6">
          Community Amenities
        </Text>
      </Row>
      <BulletedList data={["Controlled Access"]} heading="Services" />
      <BulletedList data={["Clubhouse", "Lounge"]} heading="Interior" />
      <BulletedList
        data={["Picnic Area", "Gated", "Grill"]}
        heading="Outdoor Space"
      />
      <BulletedList
        data={["Fitness Center", "Pool", "Spa", "Walking/Biking Trails"]}
        heading="Fitness & Recreation"
      />

      <Row style={styles.row}>
        <MaterialCommunityIcons
          name="toy-brick-outline"
          color="black"
          size={24}
        />
        <Text style={styles.text} category="h6">
          Apartment Features
        </Text>
      </Row>
      <BulletedList
        data={[
          "Dishwasher",
          "Disposal",
          "Microwave",
          "Kitchen",
          "Refrigerator",
          "Oven",
          "Range",
        ]}
        heading="Kitchen"
      />
      <BulletedList
        data={[
          "Bay Window",
          "Crown Molding",
          "Walk-In Closets",
          "Linen Closets",
        ]}
        heading="Living Space"
      />
      <BulletedList data={["Balcony", "Patio"]} heading="Outdoor Space" />
    </>
  );
};

export default AmenitiesSection;

const styles = StyleSheet.create({
  container: {},
  defaultMarginVertical: {
    marginVertical: 10,
  },
  row: {
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    marginLeft: 10,
  },
});
