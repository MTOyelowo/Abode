import {FC} from "react";
import {Text} from "@ui-kitten/components";
import {StyleSheet, View} from "react-native";
import LottieView from "lottie-react-native";
import ModalHeader from "../../components/ModalHeader";
import SignupAndSigninButtons from "../../components/SignupAndSigninButtons";
import Screen from "../../components/Screen";

interface Props {}

const SignUpOrSignInScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <ModalHeader text="Abode" xShown />
      <View style={styles.container}>
        <Text category="h5" style={styles.header}>
          Add Your Properties
        </Text>
        <LottieView
          autoPlay
          style={styles.lottie}
          source={require("../../../assets/lotties/AddProperty.json")}
        />
        <Text category="h6" style={styles.text}>
          Create an Account or Sign In
        </Text>
        <Text appearance="hint" style={[styles.text, styles.bottomText]}>
          To add your properties, you must create an account or sign in
        </Text>
        <SignupAndSigninButtons />
      </View>
    </Screen>
  );
};

export default SignUpOrSignInScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  header: {
    marginVertical: 20,
  },
  lottie: {
    marginBottom: 50,
    width: 250,
    height: 250,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
  },
  bottomText: {
    marginTop: 10,
    marginBottom: 30,
  },
});
