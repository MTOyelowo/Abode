import { StyleSheet, View, FlatList } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { IProperty } from "../../../types/property";
import Card from "../../components/card";
import SignupAndSigninButtons from "../../components/SignupAndSigninButtons";
import Row from "../../components/core/Row";
import { theme } from "../../../theme";
import { RootStackParamList } from "../../../types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { properties } from "../../../data/properties";

const SavedScreen = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const { user, logout } = useAuth();

  // const likedProperties = undefined;
  const contactedProperties = undefined;
  const applicationProperties = undefined;
  const likedProperties = properties;

  const getButtonAppearance = (buttonIndex: number) => {
    if (activeIndex === buttonIndex) return "filled";
    return "ghost";
  };

  const handleButtonPress = (index: number) => {
    setActiveIndex(index);
  };

  const getBodyText = (heading: string, subHeading: string) => {
    return (
      <View style={styles.textContainer}>
        <Text category={"h6"} style={styles.heading}>
          {heading}
        </Text>
        <Text appearance={"hint"} style={styles.subHeading}>
          {subHeading}
        </Text>
      </View>
    );
  };

  const getPropertiesFlatList = (properties: IProperty[]) => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={properties}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => (
          <Card
            property={item}
            style={styles.card}
            onPress={() =>
              navigate("PropertyDetailsScreen", {
                propertyID: properties[activeIndex].id,
              })
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  const getBody = () => {
    if (activeIndex === 0) {
      if (likedProperties) return getPropertiesFlatList(likedProperties);
      return (
        <>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require("../../../assets/lotties/Favorites.json")}
          />
          {getBodyText(
            "You don't have any favourites saved",
            "Tap the heart icon on the rentals to add favourites"
          )}
          {!user ? (
            <SignupAndSigninButtons
              style={styles.signupAndSigninButtonsContainer}
            />
          ) : null}
        </>
      );
    }
    if (activeIndex === 1) {
      if (contactedProperties)
        return getPropertiesFlatList(contactedProperties);
      return (
        <>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require("../../../assets/lotties/Contacted.json")}
          />
          {getBodyText(
            "You have not contacted any properties yet",
            "Your contacted properties will show here"
          )}
          {!user ? (
            <SignupAndSigninButtons
              style={styles.signupAndSigninButtonsContainer}
            />
          ) : null}
        </>
      );
    }
    if (activeIndex === 2) {
      if (applicationProperties)
        return getPropertiesFlatList(applicationProperties);
      return (
        <>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require("../../../assets/lotties/Applications.json")}
          />
          {getBodyText(
            "Check the status of your rental application here",
            "Any properties that you applied to will show here"
          )}
          {!user ? (
            <SignupAndSigninButtons
              style={styles.signupAndSigninButtonsContainer}
            />
          ) : null}
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Row style={styles.buttonContainer}>
        <Button
          style={[styles.button, styles.favouritesButton]}
          size={"small"}
          appearance={getButtonAppearance(0)}
          onPress={() => handleButtonPress(0)}
        >
          Favourites
        </Button>
        <Button
          style={[styles.button, styles.contactedButton]}
          size={"small"}
          appearance={getButtonAppearance(1)}
          onPress={() => handleButtonPress(1)}
        >
          Contacted
        </Button>
        <Button
          style={[styles.button, styles.applicationButton]}
          size={"small"}
          appearance={getButtonAppearance(2)}
          onPress={() => handleButtonPress(2)}
        >
          Applications
        </Button>
      </Row>
      <View style={styles.contentContainer}>{getBody()}</View>
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 10,
    flex: 1,
  },
  buttonContainer: {
    alignItems: "center",
    borderRadius: 5,
  },
  button: {
    width: "33.3%",
    borderRadius: 0,
    borderColor: theme["color-primary-500"],
  },
  applicationButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  favouritesButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  contactedButton: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  lottie: {
    height: 180,
    width: 180,
    marginBottom: 20,
    alignSelf: "center",
  },
  textContainer: {
    marginVertical: 15,
  },
  heading: {
    textAlign: "center",
  },
  subHeading: {
    marginTop: 10,
  },
  signupAndSigninButtonsContainer: {
    marginTop: 15,
    width: "100%",
  },
  card: {
    marginHorizontal: 0,
    marginVertical: 5,
  },
});
