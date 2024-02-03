import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../../../../theme";
import Row from "../../core/Row";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";

const HeaderInput = () => {
  return (
    <TouchableOpacity
      onPress={() => console.warn("Touchable opacity")}
      style={styles.searchInputContainer}
    >
      <Row style={styles.searchInputRow}>
        <MaterialCommunityIcons
          name="magnify"
          color={theme["color-primary-500"]}
          size={28}
        />
        <Text>Find a Location</Text>
      </Row>
    </TouchableOpacity>
  );
};

export default HeaderInput;

const styles = StyleSheet.create({
  searchInputContainer: {
    marginTop: Platform.OS === "ios" ? 40 : 20,
    borderWidth: 1,
    borderColor: theme["color-gray"],
    borderRadius: 9999,
    padding: 6,
  },
  searchInputRow: {
    alignItems: "center",
    gap: 4,
  },
  filterButton: {
    borderRadius: 9999,
    borderColor: theme["color-gray"],
  },
});
