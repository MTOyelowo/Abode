import { FC } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { IPet } from "../../types/pet";
import { theme } from "../../theme";
import { Divider, Text } from "@ui-kitten/components";
import Row from "./core/Row";

interface Props {
  pet: IPet;
  style?: ViewStyle | ViewStyle[];
}

const cardRow = (label: string, value: string, showDivider: boolean = true) => {
  return (
    <>
      <Row style={styles.cardRow}>
        <Text category={"c1"} style={styles.cardRowText}>
          {label}
        </Text>
        <Text category={"c1"} style={[styles.cardRowText]}>
          {value}
        </Text>
      </Row>
      {showDivider ? <Divider style={styles.divider} /> : null}
    </>
  );
};

const PetCard: FC<Props> = ({ pet, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text category="c1" style={styles.allowedText}>
        {`${pet.type}s`}
        {pet.allowed ? "Allowed" : "Not Allowed"}
      </Text>
      <Text category="c1">{pet.details}</Text>
      {cardRow("Pet Limit", pet.limit.toString())}
      {pet.deposit ? cardRow("Pet Deposit", pet.deposit.toString()) : null}
      {pet.rent ? cardRow("Monthly Pet Rent", `$${pet.rent.toString()}`) : null}
      {pet.fee ? cardRow("One Time Fee", `$${pet.fee.toString()}`) : null}
      {pet.interview
        ? cardRow("Pet Limit", "Required")
        : cardRow("Pet Limit", "Not Required")}
      {pet.neutered
        ? cardRow("Sprayed/Neutered", "Required")
        : cardRow("Sprayed/Neutered", "Not Required")}
      {pet.declawed
        ? cardRow("Declawed", "Required", false)
        : cardRow("Declawed", "Not Required", false)}
    </View>
  );
};

export default PetCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: theme["color-gray"],
    borderWidth: 1,
    padding: 7,
    width: 250,
  },
  allowedText: {
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardRow: {
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  cardRowText: {
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: theme["color-gray"],
  },
});
