import { StyleSheet, View, Animated } from "react-native";
import { useState } from "react";
import Card from "../../../components/card";
import { HEADERHEIGHT, LISTMARGIN } from "../../../../constants";
import AnimatedListHeader from "../../../components/animatedListHeader";
import Map from "../../../components/map";
import { properties } from "../../../../data/properties";

const SearchPage = () => {
  const [mapShown, setMapShown] = useState<boolean>(false);
  const [scrollAnimation] = useState(new Animated.Value(0));

  return (
    <View style={styles.container}>
      <AnimatedListHeader
        scrollAnimation={scrollAnimation}
        setMapShown={setMapShown}
        mapShown={mapShown}
      />
      {mapShown ? (
        <Map properties={properties} />
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
  container: {},
});
