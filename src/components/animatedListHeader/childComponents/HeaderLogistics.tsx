import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Row from "../../core/Row";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";
import { theme } from "../../../../theme";
import { LISTMARGIN } from "../../../../constants";

const HeaderLogisticsButton = ({
  onPress,
  iconName,
  label,
  style,
}: {
  onPress: () => void;
  iconName: any;
  label: string;
  style?: any;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Row style={{ alignItems: "center", gap: 4 }}>
        {iconName ? (
          <MaterialCommunityIcons
            name={iconName}
            size={18}
            color={theme["color-info-300"]}
          />
        ) : null}
        <Text category={"c1"} style={styles.logisticsButtonText}>
          {label}
        </Text>
      </Row>
    </TouchableOpacity>
  );
};

const HeaderLogistics = ({
  mapShown,
  setMapShown,
  availableProperties,
}: {
  mapShown: boolean;
  setMapShown: (bool: boolean) => void;
  availableProperties?: number;
}) => {
  const handleMapPress = () => {
    if (mapShown) return setMapShown(false);
    setMapShown(true);
  };
  return (
    <Row style={styles.container}>
      <Row style={{ gap: 8, alignItems: "center" }}>
        <Row style={{ alignItems: "center" }}>
          <MaterialCommunityIcons
            name="map-marker"
            size={18}
            color={theme["color-primary-500"]}
          />
          <Text category={"c1"} appearance={"hint"}>
            {availableProperties
              ? `${availableProperties} Spaces available`
              : `Search Spaces`}
          </Text>
        </Row>
        <TouchableOpacity onPress={() => console.warn("save")}>
          <Text
            category={"c1"}
            style={{ color: theme["color-info-300"], fontWeight: "bold" }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </Row>
      <Row style={{ gap: 16 }}>
        <HeaderLogisticsButton
          iconName="sort"
          label="Sort"
          onPress={() => console.warn("sort")}
        />

        {mapShown ? (
          <HeaderLogisticsButton
            iconName="format-list-bulleted"
            label="List"
            onPress={handleMapPress}
          />
        ) : (
          <HeaderLogisticsButton
            iconName="map-outline"
            label="Map"
            onPress={handleMapPress}
          />
        )}
      </Row>
    </Row>
  );
};

export default HeaderLogistics;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: LISTMARGIN,
    marginVertical: 5,
  },
  logisticsButtonText: {
    color: theme["color-info-300"],
    fontWeight: "bold",
  },
});
