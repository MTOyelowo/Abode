import { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { IProperty } from "../../../types/property";
import { Text } from "@ui-kitten/components";
import Row from "../core/Row";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getItem } from "expo-secure-store";
import PetCard from "../PetCard";
import GeneralTextCard from "../GeneralTextCard";

interface Props {
  property: IProperty;
}

const LeaseAndFeesSection: FC<Props> = ({ property }) => {
  return (
    <>
      <Text category="h5" style={styles.defaultMarginVertical}>
        Lease Details & Fees
      </Text>
      {property.pets ? (
        <>
          <Row style={styles.row}>
            <MaterialIcons name="pets" color="black" size={24} />
            <Text category="h6" style={styles.rowText}>
              Pet Policies
            </Text>
          </Row>
          <FlatList
            style={styles.defaultMarginVertical}
            horizontal
            data={property.pets}
            renderItem={({ item }) => (
              <PetCard pet={item} style={styles.petCard} />
            )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.type}
          />
        </>
      ) : null}

      <Row style={styles.row}>
        <MaterialIcons name="attach-money" color="black" size={24} />
        <Text category="h6" style={styles.rowText}>
          Fees
        </Text>
      </Row>
      <GeneralTextCard heading="Parking" body={["Other"]} />

      <Row style={[styles.row, { marginTop: 10 }]}>
        <MaterialIcons name="list-alt" color="black" size={24} />
        <Text category="h6" style={styles.rowText}>
          Details{" "}
        </Text>
      </Row>
      <FlatList
        data={[
          { heading: "lease options", body: ["12 months"] },
          {
            heading: "property information",
            body: [
              "Built in 2017",
              "Apartment Community",
              "242 units/5 stories",
            ],
          },
        ]}
        style={styles.defaultMarginVertical}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.heading}
        renderItem={({ item, index }) => (
          <GeneralTextCard
            key={index}
            heading={item.heading}
            body={item.body}
            style={styles.textCard}
          />
        )}
      />
    </>
  );
};

export default LeaseAndFeesSection;

const styles = StyleSheet.create({
  container: {},
  defaultMarginVertical: {
    marginVertical: 10,
  },
  row: {
    alignItems: "center",
    marginVertical: 15,
  },
  rowText: {
    marginLeft: 10,
  },
  petCard: {
    marginRight: 15,
  },
  textCard: {
    marginRight: 10,
  },
});
