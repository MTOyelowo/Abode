import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import { Text } from "@ui-kitten/components";
import Row from "../core/Row";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../../../theme";
import * as Location from "expo-location";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParamList } from "../../../types";

const CurrentLocationButton = ({ style }: { style?: ViewStyle }) => {
  const { navigate } = useNavigation<NavigationProp<RootTabParamList>>();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    handleNavigate(location);
  };

  const handleNavigate = (location: Location.LocationObject) => {
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    let boundingBox = [
      (lat - 0.048).toString(),
      (lat + 0.048).toString(),
      (lon - 0.041).toString(),
      (lat + 0.041).toString(),
    ];

    navigate("Search", {
      location: "Your Current Location",
      boundingBox,
      lat: lat.toString(),
      lon: lon.toString(),
    });
  };

  return (
    <Row style={[styles.container, style as ViewStyle]}>
      <FontAwesome
        name="location-arrow"
        size={30}
        style={styles.icon}
        color={theme["color-primary-500"]}
      />
      <TouchableOpacity onPress={async () => await getLocation()}>
        <Text style={styles.text} status={"info"}>
          Use my current location
        </Text>
      </TouchableOpacity>
    </Row>
  );
};

export default CurrentLocationButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  icon: {
    marginLeft: 5,
  },
  text: {
    marginLeft: 10,
    fontWeight: "600",
  },
});
