import { StyleSheet, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, Text } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { useMutation } from "react-query";

import ModalHeader from "../components/ModalHeader";
import GoogleButton from "../components/GoogleButton";
import FacebookButton from "../components/FacebookButton";
import PasswordInput from "../components/PasswordInput";
import AppleButton from "../components/AppleButton";
import TextDivider from "../components/TextDivider";

import { loginUser } from "../../services/user";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../components/Loading";

const SignInScreen = () => {
  const router = useRouter();
  const { login } = useAuth();

  const nativeLogin = useMutation(
    async (values: { email: string; password: string }) => {
      const user = await loginUser(values.email, values.password);
      if (user) {
        login(user);
        router.back();
      }
    }
  );

  if (nativeLogin.isLoading) return <Loading />;

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.container}>
      <View>
        <ModalHeader text="Abode" xShown />
        <Text category="h5" style={styles.header}>
          Sign In{" "}
        </Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={yup.object().shape({
            email: yup.string().email().required("Your email is required"),
            password: yup.string().required("Enter a valid password"),
          })}
          onSubmit={(values) => {
            nativeLogin.mutate(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldTouched,
          }) => {
            return (
              <>
                <Input
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  placeholder="Your Email Address"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoComplete="email"
                  label={"Email"}
                  onBlur={() => setFieldTouched("email")}
                  caption={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  status={touched.email && errors.email ? "danger" : "basic"}
                />
                <PasswordInput
                  style={styles.input}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  placeholder="Your Password"
                  label="Password"
                  onBlur={() => setFieldTouched("password")}
                  caption={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  status={
                    touched.password && errors.password ? "danger" : "basic"
                  }
                />
                <TouchableOpacity
                  style={styles.forgotPasswordContainer}
                  onPress={() => router.navigate("/forgotPassword")}
                >
                  <Text category="c1" status="info">
                    Forgot your password?
                  </Text>
                </TouchableOpacity>

                <Button
                  style={styles.signInButton}
                  onPress={() => handleSubmit()}
                >
                  Sign In
                </Button>

                <TextDivider text="or" style={styles.orContainer} />

                <GoogleButton
                  text="Continue with Google"
                  style={styles.button}
                  onPress={() => console.warn("Google login")}
                />
                <FacebookButton
                  text="Continue with Facebook"
                  style={styles.button}
                  onPress={() => console.warn("Facebook login")}
                />
                <AppleButton
                  type="sign-in"
                  onPress={() => console.warn("Apple login")}
                />

                <TextDivider
                  text="Don't have an account?"
                  style={styles.orContainer}
                />
                <Button
                  style={styles.signUpButton}
                  onPress={() => router.push("/signUp")}
                >
                  Sign Up
                </Button>
              </>
            );
          }}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 10,
  },
  header: {
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    marginTop: 10,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 5,
  },
  signInButton: {
    marginTop: 20,
  },
  signUpButton: {},
  orContainer: {
    marginVertical: 30,
  },
  button: {
    marginBottom: 10,
  },
});
