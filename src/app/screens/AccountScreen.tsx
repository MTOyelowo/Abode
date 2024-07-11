import {ScrollView, StyleSheet, View} from "react-native";
import React from "react";
import {Button, Text} from "@ui-kitten/components";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../../../hooks/useAuth";
import SignupAndSigninButtons from "../../components/SignupAndSigninButtons";
import ButtonList from "../../components/ButtonList";
import {theme} from "../../../theme";

const AccountScreen = () => {
  const navigation = useNavigation();
  const {user, logout} = useAuth();

  const firstSignedOutButtons = [
    {
      label: "Add a Property",
      onPress: () => navigation.navigate("AddProperty"),
    },
    {
      label: "View My Properties",
      onPress: () => console.log("Navigate to View My Properties"),
    },
  ];

  const supportButtons = [
    {
      label: "Help Center",
      onPress: () => console.log("Navigate to Help Center"),
    },
    {
      label: "Terms and Conditions",
      onPress: () => console.log("Navigate to Terms and Conditions"),
    },
  ];

  const rentingButtons = [
    {
      label: "Favourite Properties",
      onPress: () => navigation.navigate("Root", {screen: "Saved"}),
    },
    {
      label: "Rental Applications",
      onPress: () => console.log("Navigate to Rental Applications"),
    },
    {
      label: "My Residences",
      onPress: () => console.log("Navigate to My Residences"),
    },
    {
      label: "Rent Payments",
      onPress: () => console.log("Rent Payments"),
    },
  ];

  const accountButtons = [
    {
      label: "Account Settings",
      onPress: () => console.log("Navigate to Account Settings"),
    },
    {
      label: "Billing History",
      onPress: () => console.log("Navigate to view Billing History"),
    },
    {
      label: "Banks and Cards",
      onPress: () => console.log("Navigate to view Banks and Card"),
    },
  ];

  const rentalManagementButtons = [
    {
      label: "Add a Property",
      onPress: () => navigation.navigate("AddProperty"),
    },
    {
      label: "Add Apartment to Property",
      onPress: () => console.log("Navigate to Add Apartment to Property"),
    },
    {
      label: "View My Properties",
      onPress: () => console.log("Navigate to View My Properties"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <View>
          {user ? (
            <>
              <Text style={styles.userName} category={"h4"}>
                Welcome {user.firstName ? `, ${user.firstName}` : ""}
              </Text>
              <Text style={styles.email} category={"h6"}>
                {user.email}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.header} category={"h5"}>
                Renting has never been easier
              </Text>
              <SignupAndSigninButtons />
              <View style={styles.middleContainer}>
                <Text style={styles.subHeader} category={"s1"}>
                  Are you a property owner or manager?
                </Text>
                <Text style={styles.bodyText}>
                  Visit our website to access our full suite of rental
                  management tools and start receiving applications in minutes
                </Text>
              </View>
            </>
          )}
        </View>
        {user ? (
          <View style={{gap: 20}}>
            <ButtonList data={rentingButtons} header={"Renting Made Easy"} />
            <ButtonList data={accountButtons} header={"My Account"} />
            <ButtonList
              data={rentalManagementButtons}
              header={"Rental Management Tools"}
            />
            <ButtonList data={supportButtons} header={"Support"} />
            <View
              style={[
                styles.specialMarginVertical,
                styles.specialMarginHorizontal,
              ]}
            >
              <Button appearance="ghost" style={styles.button} onPress={logout}>
                Sign Out
              </Button>
            </View>
          </View>
        ) : (
          <>
            <ButtonList data={firstSignedOutButtons} borderTop />
            <ButtonList data={supportButtons} header="Support" marginTop />
            <Text
              appearance="hint"
              style={[styles.brandText, styles.specialMarginVertical]}
            >
              abode.com Version 1.0.0
            </Text>
          </>
        )}
      </ScrollView>
      {/* {!user ? (
        <View style={{gap: 10}}>
          <Button onPress={() => navigation.navigate("ForgotPassword")}>
            Forgot Password
          </Button>
          <Button
            appearance={"ghost"}
            style={{borderColor: theme["color-primary-500"]}}
            onPress={() =>
              navigation.navigate("ResetPassword", {token: "123456"})
            }
          >
            Reset Password
          </Button>
        </View>
      ) : null} */}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 10,
    flex: 1,
  },
  scrollContainer: {},
  userName: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  email: {
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 20,
  },
  header: {
    textAlign: "center",
    marginVertical: 25,
    marginHorizontal: 70,
    fontWeight: "600",
  },
  middleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 30,
    borderTopColor: theme["color-gray"],
    borderTopWidth: 2,
  },
  subHeader: {
    textAlign: "center",
    paddingHorizontal: 20,
  },
  bodyText: {
    marginTop: 10,
    textAlign: "center",
    marginHorizontal: 15,
  },
  specialMarginVertical: {
    marginTop: 30,
    marginBottom: 20,
  },
  specialMarginHorizontal: {},
  button: {
    marginBottom: 15,
    borderColor: theme["color-primary-500"],
  },
  brandText: {
    textAlign: "center",
  },
});
