import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import MapView, { Region } from "react-native-maps";
import { IProperty } from "../../../types/property";
import MapMarker from "./childComponents/MapMarker";
import { theme } from "../../../theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "../card";
import {
  setTabShown,
  toggleTabShown,
} from "../../utils/redux/features/tabDisplaySlice";
import { RootState } from "../../utils/redux/store";
import { Button } from "@ui-kitten/components";
import { getPropertiesInArea } from "../../../data/properties";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types";

let mapRegion: Region | undefined = undefined;

const Map = ({
  properties,
  mapRef,
  location,
  setLocation,
  setProperties,
  initialRegion,
}: {
  properties: IProperty[];
  mapRef: MutableRefObject<MapView | null>;
  location: string;
  setLocation: (location: string) => void;
  setProperties: (properties: IProperty[]) => void; //to remove later
  initialRegion?: Region | undefined;
}) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSearchAreaButton, setShowSearchAreaButton] = useState(false);
  const [boundingBox, setBoundingBox] = useState<number[]>([]);
  const [region, setRegion] = useState<Region | undefined>(
    mapRegion ? mapRegion : undefined
  );

  // console.log("Active Index", activeIndex);
  // console.log(properties[activeIndex]);

  useEffect(() => {
    if (location === "Map Area") return;

    if (initialRegion) {
      setShowSearchAreaButton(false);
      setRegion(initialRegion);
    }
  }, [initialRegion]);

  const unFocusProperty = () => {
    setActiveIndex(-1);
  };

  const handleMapPress = () => {
    if (Platform.OS === "android") unFocusProperty();
  };

  const handleMarkerPress = (index: number) => {
    setTimeout(() => {
      mapRef.current?.animateCamera({
        center: {
          latitude: properties[index].lat,
          longitude: properties[index].lng,
        },
      });
    }, 100);
    setTimeout(() => {
      const newRegion: Region = {
        latitude: properties[index].lat,
        latitudeDelta: region?.latitudeDelta ? region.latitudeDelta : 0.4,
        longitude: properties[index].lng,
        longitudeDelta: region?.longitudeDelta ? region.longitudeDelta : 0.4,
      };

      setRegion(newRegion);
    }, 600);

    setActiveIndex(index);
  };

  const handleSearchAreaButtonPress = () => {
    setProperties(getPropertiesInArea(boundingBox));
    setLocation("Map Area");
    mapRegion = region;
    setShowSearchAreaButton(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={"google"}
        style={styles.map}
        userInterfaceStyle="light"
        ref={mapRef}
        onPress={handleMapPress}
        region={region}
        onRegionChangeComplete={(region, isGesture) => {
          if (isGesture?.isGesture) {
            if (!showSearchAreaButton) setShowSearchAreaButton(true);

            const newBoundingBox = [
              region.latitude - region.latitudeDelta / 2,
              region.latitude + region.latitudeDelta / 2,
              region.longitude - region.longitudeDelta / 2,
              region.longitude + region.longitudeDelta / 2,
            ];

            setRegion(region);
            setBoundingBox(newBoundingBox);
          }
        }}
      >
        {properties.map((item, index) => (
          <MapMarker
            key={index}
            lat={item.lat}
            lng={item.lng}
            onPress={() => handleMarkerPress(index)}
            color={
              activeIndex === index
                ? theme["color-info-400"]
                : theme["color-primary-500"]
            }
          />
        ))}
      </MapView>
      {activeIndex > -1 && (
        <>
          {Platform.OS === "ios" && (
            <TouchableOpacity
              style={styles.cardClose}
              onPress={unFocusProperty}
            >
              <MaterialCommunityIcons
                name="close"
                color={theme["color-primary-500"]}
                size={24}
              />
            </TouchableOpacity>
          )}
          <Card
            property={properties[activeIndex]}
            style={styles.card}
            onPress={() =>
              navigate("PropertyDetailsScreen", {
                propertyID: properties[activeIndex].id,
              })
            }
          />
        </>
      )}
      {showSearchAreaButton && activeIndex === -1 ? (
        <Button
          style={styles.searchAreaButton}
          appearance={"ghost"}
          onPress={handleSearchAreaButtonPress}
        >
          Search Area
        </Button>
      ) : null}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#FFF5F5",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  card: {
    position: "absolute",
    bottom: 10,
    height: 360,
  },
  cardClose: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    position: "absolute",
    top: 170,
    left: 15,
    borderRadius: 9999,
  },
  searchAreaButton: {
    position: "absolute",
    bottom: 30,
    zIndex: 100,
    borderRadius: 30,
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: theme["color-gray"],
    borderWidth: 1,
  },
});
