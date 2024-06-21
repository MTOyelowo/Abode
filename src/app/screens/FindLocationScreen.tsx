import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";

import { useState } from "react";

import { useQueryClient } from "react-query";
import { Location } from "../../../types/locationIQ";
import ModalHeader from "../../components/ModalHeader";
import { getSuggestedLocations } from "../../../services/location";
import { theme } from "../../../theme";
import Row from "../../components/core/Row";
import CurrentLocationButton from "../../components/currentLocationButton";
import { getFormattedLocationText } from "../../utils/getFormattedLocationText";
import RecentSearchList from "../../components/RecentSearchList";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParamList } from "../../../types";

const FindLocationsScreen = () => {
  const queryClient = useQueryClient();
  const { navigate, goBack } =
    useNavigation<NavigationProp<RootTabParamList>>();

  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);

  const recentSearches: Location[] | undefined = queryClient.getQueryData([
    "recentSearches",
  ]);

  const setRecentSearch = (location: Location) => {
    queryClient.setQueryData(["recentSearches"], () => {
      if (recentSearches) {
        let included = false;

        for (let i of recentSearches) {
          if (
            i.display_name === location.display_name &&
            i.lon === location.lon &&
            i.lat === location.lat
          ) {
            included = true;
            break;
          }
        }
        if (!included) return [location, ...recentSearches];
        return recentSearches;
      }
      return [location];
    });
  };

  const handleChange = async (val: string) => {
    setValue(val);
    if (val.length > 2) {
      const locations = await getSuggestedLocations(val);
      if (locations.length > 0) setSuggestions(locations);
    } else if (val.length === 0) setSuggestions([]);
  };

  const handleSubmitEditing = async () => {
    const locations = await getSuggestedLocations(value);
    if (locations.length > 0) {
      handleNavigate(locations[0]);
    }
  };

  const handleNavigate = (location: Location) => {
    setRecentSearch(location);
    navigate("Search", {
      location: getFormattedLocationText(location),
      lat: location.lat,
      lon: location.lon,
      boundingBox: location.boundingbox,
    });
  };

  const getInput = () => {
    if (Platform.OS === "ios")
      return (
        <Input
          keyboardType="default"
          autoFocus
          selectionColor={theme["color-primary-500"]}
          placeholder="Enter Location"
          size={"large"}
          value={value}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmitEditing}
          style={styles.defaultMarginTop}
        />
      );

    return (
      <Row>
        <Input
          keyboardType="default"
          autoFocus
          selectionColor={theme["color-primary-500"]}
          placeholder="Enter Location"
          size={"large"}
          value={value}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmitEditing}
          style={[styles.defaultMarginTop, { width: "80%" }]}
        />

        <Button appearance={"ghost"} status="info" onPress={handleCancel}>
          Cancel
        </Button>
      </Row>
    );
  };

  const SuggestedText = ({ locationItem }: { locationItem: Location }) => {
    const location = getFormattedLocationText(locationItem);
    return (
      <Row style={styles.suggestionContainer}>
        <Text>{location}</Text>
      </Row>
    );
  };

  const handleCancel = () => {
    goBack();
  };

  return (
    <View style={{ marginTop: 30 }}>
      {Platform.OS === "ios" ? <ModalHeader /> : null}
      <View style={styles.screenContent}>
        {getInput()}
        {suggestions.length > 0 ? (
          <FlatList
            data={suggestions}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.place_id + index}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleNavigate(item)}>
                <SuggestedText locationItem={item} />
              </TouchableOpacity>
            )}
          />
        ) : (
          <ScrollView bounces={false}>
            <CurrentLocationButton style={styles.currentLocationButton} />
            <RecentSearchList
              recentSearches={recentSearches}
              style={styles.recentSearchContainer}
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default FindLocationsScreen;

const styles = StyleSheet.create({
  screenContent: {
    marginHorizontal: 10,
  },
  defaultMarginTop: {
    marginTop: 10,
  },
  suggestionContainer: {
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme["color-gray"],
  },
  currentLocationButton: {
    marginTop: 20,
  },
  recentSearchContainer: {
    marginTop: 30,
  },
});
