import { StyleSheet, View, ViewStyle } from "react-native";

import React from "react";
import { Button } from "@ui-kitten/components";
import { theme } from "../../theme";
import { useRouter } from "expo-router";

const SignupAndSigninButtons = ({ style }: { style?: ViewStyle }) => {
  const router = useRouter();

  return (
    <View style={style}>
      <Button
        style={styles.signInButton}
        onPress={() => router.navigate("/signIn")}
      >
        Sign In
      </Button>
      <Button
        appearance={"ghost"}
        style={styles.signUpButton}
        onPress={() => router.navigate("signUp")}
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
