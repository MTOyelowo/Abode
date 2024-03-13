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
import { useDispatch, useSelector } from "react-redux";
import {
  setTabShown,
  toggleTabShown,
} from "../../utils/redux/features/tabDisplaySlice";
import { RootState } from "../../utils/redux/store";
import { Button } from "@ui-kitten/components";
import { getPropertiesInArea } from "../../../data/properties";

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
  const dispatch = useDispatch();
  const tabShown = useSelector((state: RootState) => state.tab.tabShown);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSearchAreaButton, setShowSearchAreaButton] = useState(false);
  const [boundingBox, setBoundingBox] = useState<number[]>([]);
  const [region, setRegion] = useState<Region | undefined>(
    mapRegion ? mapRegion : undefined
  );

  useEffect(() => {
    if (location === "Map Area") return;

    if (initialRegion) {
      setShowSearchAreaButton(false);
      setRegion(initialRegion);
    }
  }, [initialRegion]);

  const unFocusProperty = () => {
    setActiveIndex(-1);
    dispatch(setTabShown(true));
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

  useEffect(() => {
    dispatch(setTabShown(false));
  }, []);

  const handleSearchAreaButtonPress = () => {
    setProperties(getPropertiesInArea(boundingBox));
    setLocation("Map Area");
    mapRegion = region;
    setShowSearchAreaButton(false);
  };

  return (
    <View>
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
          <Card property={properties[activeIndex]} style={styles.card} />
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
  container: {},
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
