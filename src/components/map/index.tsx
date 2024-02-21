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

const Map = ({
  properties,
  mapRef,
  initialRegion,
}: {
  properties: IProperty[];
  mapRef: MutableRefObject<MapView | null>;
  initialRegion?: Region | undefined;
}) => {
  const dispatch = useDispatch();
  const tabShown = useSelector((state: RootState) => state.tab.tabShown);

  const [activeIndex, setActiveIndex] = useState(-1);

  const unFocusProperty = () => {
    setActiveIndex(-1);
    dispatch(setTabShown(true));
  };

  const handleMapPress = () => {
    if (Platform.OS === "android") unFocusProperty();
  };

  const handleMarkerPress = (index: number) => {
    if (Platform.OS === "ios") {
      setTimeout(() => {
        mapRef.current?.animateCamera({
          center: {
            latitude: properties[index].lat,
            longitude: properties[index].lng,
          },
        });
      }, 300);
    }

    setActiveIndex(index);
  };

  useEffect(() => {
    dispatch(setTabShown(false));
  }, []);

  return (
    <View>
      <MapView
        style={styles.map}
        userInterfaceStyle="light"
        ref={mapRef}
        onPress={handleMapPress}
        initialRegion={initialRegion ? initialRegion : undefined}
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
});
