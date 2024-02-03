import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { Button } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../../../theme";

const filterButtons = [
  {
    iconName: "filter-variant",
    onPress: () => console.log("Filter all"),
  },
  {
    label: "Price",
    onPress: () => console.log("Price"),
  },
  {
    label: "Move-In Date",
    onPress: () => console.log("Move-In Dateice"),
  },
  {
    label: "Beds & Baths",
    onPress: () => console.log("Beds & Baths"),
  },
  {
    label: "Down Payable",
    onPress: () => console.log("Down Payable"),
  },
];

const HeaderFilterButtons = () => {
  return (
    <FlatList
      data={filterButtons}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginVertical: 10 }}
      contentContainerStyle={{ gap: 4 }}
      renderItem={({ item }) => {
        if (item.iconName) {
          return (
            <Button
              appearance={"ghost"}
              style={styles.filterButton}
              onPress={item.onPress}
              size="small"
              accessoryLeft={
                <MaterialCommunityIcons
                  name={item.iconName as any}
                  size={20}
                  color={theme["color-primary-500"]}
                />
              }
            ></Button>
          );
        }
        return (
          <Button
            appearance={"ghost"}
            style={styles.filterButton}
            onPress={item.onPress}
            size="small"
          >
            {item.label}
          </Button>
        );
      }}
    />
  );
};

export default HeaderFilterButtons;

const styles = StyleSheet.create({
  filterButton: {
    borderRadius: 9999,
    borderColor: theme["color-gray"],
  },
});
