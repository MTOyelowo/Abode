import { FC, useState } from "react";
import { StyleSheet, View, Share, TouchableOpacity } from "react-native";
import { IProperty } from "../../../types/property";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { theme } from "../../../theme";
import Row from "../core/Row";
import { getStateAbbrevation } from "../../utils/getStateAbbrevation";

interface Props {
  property: IProperty;
}

const PropertyHeaderSection: FC<Props> = ({ property }) => {
  const [heartIconName, setHeartIconName] = useState<"heart" | "heart-outline">(
    "heart-outline"
  );

  const handleHeartPress = () => {
    if (heartIconName === "heart") {
      return setHeartIconName("heart-outline");
    }

    setHeartIconName("heart");
  };

  const shareIcon = async () => {
    try {
      await Share.share({
        message: "Checkout this nice apartment I found on Abode.com",
      });
    } catch (error) {
      alert("Sorry, we're unable to share at the moment");
    }
  };

  return (
    <>
      <Text category={"h5"} style={styles.defaultMarginVertical}>
        {property.name}
      </Text>
      <Row style={styles.containerRow}>
        <View>
          <Text category={"c1"}>{property.street}</Text>
          <Text category={"c1"}>
            {property.city}, ${getStateAbbrevation(property.state)} $
            {property.zip}
          </Text>
        </View>
        <Row style={styles.iconRow}>
          <MaterialIcons
            onPress={async () => {
              await shareIcon();
            }}
            name="ios-share"
            size={30}
            color={theme["color-primary-500"]}
            style={styles.shareIcon}
          />
          <MaterialCommunityIcons
            onPress={handleHeartPress}
            name={heartIconName}
            size={30}
            color={theme["color-primary-500"]}
          />
        </Row>
      </Row>
    </>
  );
};

export default PropertyHeaderSection;

const styles = StyleSheet.create({
  container: {},
  defaultMarginVertical: {
    marginVertical: 10,
  },
  containerRow: {
    justifyContent: "space-between",
  },
  iconRow: {
    paddingRight: 5,
    gap: 20,
  },
  shareIcon: {
    marginTop: -4,
  },
});
