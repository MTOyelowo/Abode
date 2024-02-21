import { StyleSheet, View, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";
import Card from "../../../components/card";
import { HEADERHEIGHT, LISTMARGIN } from "../../../../constants";
import AnimatedListHeader from "../../../components/animatedListHeader";
import Map from "../../../components/map";
import { properties } from "../../../../data/properties";
import { useLocalSearchParams, useRouter } from "expo-router";
import MapView from "react-native-maps";
import { setTabShown } from "../../../utils/redux/features/tabDisplaySlice";
import { useDispatch } from "react-redux";

const SearchPage = () => {
  const params = useLocalSearchParams();
  const dispatch = useDispatch();

  const mapRef = useRef<MapView | null>(null);
  const [mapShown, setMapShown] = useState<boolean>(false);
  const [scrollAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (params) {
      mapRef.current?.animateCamera({
        center: {
          latitude: Number(params.lat),
          longitude: Number(params.lon),
        },
      });
    }
  }, [params]);

  return (
    <View style={styles.container}>
      <AnimatedListHeader
        scrollAnimation={scrollAnimation}
        setMapShown={setMapShown}
        mapShown={mapShown}
        location={params ? (params.location as string) : "Find a Location"}
      />
      {mapShown ? (
        <Map
          properties={properties}
          mapRef={mapRef}
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
      )}
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
