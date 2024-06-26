import { Text } from "@ui-kitten/components";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { IProperty } from "../../../types/property";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Row from "../core/Row";
import BulletedList from "../BulletedList";

interface Props {
  property: IProperty;
}

const AboutSection: FC<Props> = ({ property }) => {
  return (
    <>
      <Text category="h5" style={styles.header}>
        About
      </Text>
      <Row>
        <MaterialIcons color={"#36454F"} size={24} name="apartment" />
        <Text category="h6" style={styles.apartmentText}>
          {property.name}
        </Text>
      </Row>
      <Text category="c1">{property.about}</Text>
      {/*Unique features*/}
      <>
        <Row style={styles.row}>
          <MaterialCommunityIcons name="star-outline" size={26} color="black" />
          <Text category="h6" style={styles.featuresText}>
            Unique Features
          </Text>
        </Row>
        <View style={styles.bulletListContainer}>
          {property.features ? (
            <BulletedList data={[...property.tags, ...property.features]} />
          ) : (
            <BulletedList data={property.tags} />
          )}
        </View>
      </>
    </>
  );
};

export default AboutSection;

const styles = StyleSheet.create({
  header: {
    marginBottom: 15,
    marginTop: 10,
  },
  apartmentText: {
    paddingLeft: 10,
    marginBottom: 10,
  },
  row: {
    alignItems: "center",
    marginTop: 10,
  },
  featuresText: {
    paddingLeft: 10,
  },
  bulletListContainer: {
    paddingHorizontal: 5,
  },
});
