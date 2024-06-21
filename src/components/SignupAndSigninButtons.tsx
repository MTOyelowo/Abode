import { StyleSheet, View, ViewStyle } from "react-native";

import React from "react";
import { Button } from "@ui-kitten/components";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";

const SignupAndSigninButtons = ({ style }: { style?: ViewStyle }) => {
  const { navigate } = useNavigation();

  return (
    <View style={style}>
      <Button style={styles.signInButton} onPress={() => navigate("SignIn")}>
        Sign In
      </Button>
      <Button
        appearance={"ghost"}
        style={styles.signUpButton}
        onPress={() => navigate("SignUp")}
      >
        Sign Up
      </Button>
    </View>
  );
};

export default SignupAndSigninButtons;

const styles = StyleSheet.create({
  container: {},
  signInButton: {},
  signUpButton: {
    marginVertical: 10,
    borderColor: theme["color-primary-500"],
  },
});
