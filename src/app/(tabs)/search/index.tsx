import { StyleSheet, View, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";
import Card from "../../../components/card";
import { HEADERHEIGHT, LISTMARGIN } from "../../../../constants";
import AnimatedListHeader from "../../../components/animatedListHeader";
import Map from "../../../components/map";
import { getPropertiesInArea } from "../../../../data/properties";
import { useLocalSearchParams } from "expo-router";
import MapView from "react-native-maps";
import { IProperty } from "../../../../types/property";
import { ISearchParams } from "../../../../types/searchParams";
import { Text } from "@ui-kitten/components";
import LottieView from "lottie-react-native";

const SearchPage = () => {
  const params = useLocalSearchParams() as ISearchParams;

  const mapRef = useRef<MapView | null>(null);

  const [mapShown, setMapShown] = useState<boolean>(false);
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [location, setLocation] = useState<string | undefined>(undefined);

  const [scrollAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      const splitBoundingBox = params.boundingBox.split(",");

      const numBoundingBox = [
        Number(splitBoundingBox[0]),
        Number(splitBoundingBox[1]),
        Number(splitBoundingBox[2]),
        Number(splitBoundingBox[3]),
      ];

      setLocation(params.location);
      setProperties(getPropertiesInArea(numBoundingBox));
      // console.log("Params: ", params);
      // console.log("BoundingBox: ", params.boundingBox);
      // console.log("Location: ", params.location);
      // console.log("NumBoundingBox: ", numBoundingBox);
      // console.log("Properties: ", getPropertiesInArea(numBoundingBox));
      // setProperties(properties);
      mapRef.current?.animateCamera({
        center: {
          latitude: Number(params.lat),
          longitude: Number(params.lon),
        },
      });
    }
  }, [params.location]);

  return (
    <View style={styles.container}>
      <AnimatedListHeader
        scrollAnimation={scrollAnimation}
        setMapShown={setMapShown}
        mapShown={mapShown}
        location={location ? location : "Find a Location"}
        availableProperties={properties ? properties.length : undefined}
      />
      {mapShown ? (
        <Map
          properties={properties}
          mapRef={mapRef}
          location={location ? location : "Find a Location"}
          setLocation={setLocation}
          setProperties={setProperties}
          initialRegion={
            params
              ? {
                  latitude: Number(params.lat),
                  longitude: Number(params.lon),
                  latitudeDelta: 0.4,
                  longitudeDelta: 0.4,
                }
              : undefined
          }
        />
      ) : (
        <>
          {properties.length > 0 ? (
            <Animated.FlatList
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnimation,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              bounces={false}
              scrollEventThrottle={16}
              data={properties}
              contentContainerStyle={{ gap: 10, paddingTop: HEADERHEIGHT + 5 }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toLocaleString()}
              renderItem={({ item }) => <Card property={item} />}
            />
          ) : (
            <>
              {params.location ? (
                <View style={styles.lottieContainer}>
                  <Text category={"h6"}>No Properties Found</Text>
                  <Text appearance={"hint"}>
                    Please search in a different location
                  </Text>
                </View>
              ) : (
                <View style={styles.lottieContainer}>
                  <LottieView
                    autoPlay
                    loop
                    style={styles.lottie}
                    source={require("../../../../assets/lotties/SearchScreen.json")}
                  />
                  <Text category={"h6"}>Begin Your Search</Text>
                  <Text appearance={"hint"}>
                    Find an apartment for you and your loved ones
                  </Text>
                </View>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  lottieContainer: {
    marginTop: 300,
    //backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    height: 200,
    width: 200,
  },
});
