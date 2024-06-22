import { StyleSheet, View, Animated } from "react-native";
import { FC, useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";
import { IProperty } from "../../../types/property";
import Screen from "../../components/Screen";
import AnimatedListHeader from "../../components/animatedListHeader";
import Map from "../../components/map";
import { HEADERHEIGHT } from "../../../constants";
import Card from "../../components/card";
import { Text } from "@ui-kitten/components";
import LottieView from "lottie-react-native";
import {
  RootStackParamList,
  RootTabParamList,
  SearchScreenParams,
} from "../../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootTabParamList, "Search">;

const SearchScreen: FC<Props> = ({ route }) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const mapRef = useRef<MapView | null>(null);
  const [mapShown, setMapShown] = useState<boolean>(false);
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [location, setLocation] = useState<string | undefined>(undefined);

  const [scrollAnimation] = useState(new Animated.Value(0));

  let boundingBox: number[] = [];
  if (route.params?.boundingBox)
    boundingBox = [
      Number(route.params.boundingBox[0]),
      Number(route.params.boundingBox[1]),
      Number(route.params.boundingBox[2]),
      Number(route.params.boundingBox[3]),
    ];

  useEffect(() => {
    if (route.params) {
      setLocation(route.params.location);

      mapRef?.current?.animateCamera({
        center: {
          latitude: Number(route.params.lat),
          longitude: Number(route.params.lon),
        },
      });
    }
  }, [route]);

  return (
    <Screen>
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
            route.params
              ? {
                  latitude: Number(route.params.lat),
                  longitude: Number(route.params.lon),
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
              renderItem={({ item }) => (
                <Card
                  property={item}
                  onPress={() =>
                    navigate("PropertyDetailsScreen", { propertyID: item.id })
                  }
                />
              )}
            />
          ) : (
            <>
              {route.params ? (
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
                    source={require("../../../assets/lotties/SearchScreen.json")}
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
    </Screen>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "#FFF5F5",
  },
  lottieContainer: {
    marginTop: 300,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    height: 200,
    width: 200,
  },
});
