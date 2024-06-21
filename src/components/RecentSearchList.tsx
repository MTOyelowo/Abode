import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Button } from "@ui-kitten/components";
import { Location } from "../../types/locationIQ";

import RecentSearchButton from "./RecentSearchButton";
import { getFormattedLocationText } from "../utils/getFormattedLocationText";
import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParamList } from "../../types";

const RecentSearchList = ({
  recentSearches,
  style,
}: {
  recentSearches?: Location[];
  style?: ViewStyle;
}) => {
  const { navigate } = useNavigation<NavigationProp<RootTabParamList>>();

  const [showMore, setShowMore] = useState<boolean>(false);

  const handleButtonPress = () => {
    setShowMore(!showMore);
  };

  const ShowButton = ({ text }: { text: string }) => (
    <Button
      appearance={"ghost"}
      status={"info"}
      style={styles.showButton}
      onPress={handleButtonPress}
    >
      {text}
    </Button>
  );

  const handleRecentSearchButtonPress = (location: Location) => {
    navigate("Search", {
      location: getFormattedLocationText(location),
      lat: location.lat,
      lon: location.lon,
      boundingBox: location.boundingbox,
    });
  };

  const getList = () => {
    if (!recentSearches || recentSearches.length === 0) return;

    if (recentSearches.length > 2 && !showMore)
      return (
        <>
          {recentSearches.map((item, index) =>
            index < 2 ? (
              <RecentSearchButton
                key={item.display_name + index}
                name={getFormattedLocationText(item)}
                style={styles.recentSearchButton}
                onPress={() => handleRecentSearchButtonPress(item)}
              />
            ) : null
          )}
          <ShowButton text="See More" />
        </>
      );

    return (
      <>
        {recentSearches.map((item, index) => (
          <RecentSearchButton
            key={item.display_name + index}
            name={getFormattedLocationText(item)}
            style={styles.recentSearchButton}
            onPress={() => handleRecentSearchButtonPress(item)}
          />
        ))}

        {recentSearches.length > 2 ? <ShowButton text="See Less" /> : null}
      </>
    );
  };

  return <View style={style}>{getList()}</View>;
};

export default RecentSearchList;

const styles = StyleSheet.create({
  recentSearchButton: {
    marginVertical: 5,
  },
  showButton: {
    alignSelf: "flex-start",
  },
});
