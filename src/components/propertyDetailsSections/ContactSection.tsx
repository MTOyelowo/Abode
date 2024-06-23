import { FC } from "react";
import { StyleSheet, View, TouchableOpacity, Share } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Text } from "@ui-kitten/components";
import { IProperty } from "../../../types/property";
import { useNavigation } from "@react-navigation/native";
import Row from "../core/Row";
import { theme } from "../../../theme";
import { callPhoneNumber } from "../../utils/callPhoneNumber";
import { openURL } from "../../utils/openURL";

const formatPhoneNumber = (str: string) => {
  let cleaned = ("" + str).replace(/\D/g, "");
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    let intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return "Give Us A Call";
};

interface Props {
  property: IProperty;
}

const ContactSection: FC<Props> = ({ property }) => {
  const navigation = useNavigation();
  return (
    <>
      <Text category="h5" style={styles.defaultMarginVertical}>
        Contact
      </Text>
      <TouchableOpacity onPress={() => callPhoneNumber(property.phoneNumber)}>
        <Row style={styles.row}>
          <MaterialIcons
            name="smartphone"
            color={theme["color-info-500"]}
            size={16}
          />
          <Text category="c1" status="info" style={styles.rowText}>
            {formatPhoneNumber(property.phoneNumber)}
          </Text>
        </Row>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openURL(property.website)}>
        <Row style={styles.row}>
          <MaterialIcons name="web" color={theme["color-info-500"]} size={16} />
          <Text category="c1" status="info" style={styles.rowText}>
            View Property Website
          </Text>
        </Row>
      </TouchableOpacity>
      <Row style={styles.buttonRow}>
        <Button
          style={styles.button}
          appearance="ghost"
          onPress={() =>
            navigation.navigate("Message", {
              propertyID: property.id,
              tour: true,
            })
          }
        >
          Tour
        </Button>
        <Button
          style={styles.button}
          appearance="ghost"
          onPress={() =>
            navigation.navigate("Message", {
              propertyID: property.id,
            })
          }
        >
          Message
        </Button>
      </Row>
    </>
  );
};

export default ContactSection;

const styles = StyleSheet.create({
  container: {},
  defaultMarginVertical: {
    marginVertical: 10,
  },
  row: {
    alignItems: "center",
    paddingVertical: 5,
  },
  rowText: {
    marginLeft: 10,
  },
  buttonRow: {
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  button: {
    borderColor: theme["color-primary-500"],
    borderWidth: 1,
    width: "45%",
  },
});
