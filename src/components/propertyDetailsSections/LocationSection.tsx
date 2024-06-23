import { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { IProperty } from "../../../types/property";
import MapView from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";

import { getStateAbbrevation } from "../../utils/getStateAbbrevation";
import Row from "../core/Row";
import MapMarker from "../map/childComponents/MapMarker";
import { theme } from "../../../theme";
import ScoreCard from "../ScoreCard";

interface Props {
  property: IProperty;
}

const LocationSection: FC<Props> = ({ property }) => {
  return (
    <>
      <Text category="h5" style={styles.defaultVerticalMargin}>
        Location
      </Text>
      <Row style={styles.mapHeaderContainer}>
        <MaterialCommunityIcons name="map-outline" color="black" size={24} />
        <Text category="h6" style={styles.mapText}>
          Map
        </Text>
      </Row>

      <Text category="c1" appearance="hint">
        {property.street}, {property.city},{" "}
        {getStateAbbrevation(property.state)} {property.zip}
      </Text>

      <View style={styles.mapContainer}>
        <MapView
          provider="google"
          style={styles.map}
          initialRegion={{
            latitude: property.lat,
            longitude: property.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapMarker
            color={theme["color-info-400"]}
            lat={property.lat}
            lng={property.lng}
          />
        </MapView>
      </View>

      {property.scores ? (
        <>
          <FlatList
            data={property.scores}
            style={styles.defaultVerticalMargin}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.type}
            renderItem={({ item }) => (
              <ScoreCard score={item} style={styles.scoreCard} />
            )}
          />
        </>
      ) : null}
    </>
  );
};

export default LocationSection;

const styles = StyleSheet.create({
  defaultVerticalMargin: {
    marginVertical: 10,
  },
  mapHeaderContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  mapText: {
    marginLeft: 10,
  },
  mapContainer: {
    width: "100%",
    height: 250,
    marginVertical: 10,
    overflow: "hidden",
    borderRadius: 5,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  scoreCard: {
    marginRight: 10,
  },
});
