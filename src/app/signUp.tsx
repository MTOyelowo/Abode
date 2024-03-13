import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, Text } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { useMutation } from "react-query";

import ModalHeader from "../components/ModalHeader";
import PasswordInput from "../components/PasswordInput";
import GoogleButton from "../components/GoogleButton";
import FacebookButton from "../components/FacebookButton";
import AppleButton from "../components/AppleButton";
import TextDivider from "../components/TextDivider";
import { registerUser } from "../../services/user";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../components/Loading";

const SignUpScreen = () => {
  const router = useRouter();

  const { login } = useAuth();

  const nativeRegister = useMutation(
    async (values: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }) => {
      const user = await registerUser(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );
      if (user) {
        login(user);
        router.back();
      }
    }
  );

  if (nativeRegister.isLoading) return <Loading />;

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.container}>
      <View>
        <ModalHeader text="Abode" xShown />
        <Text category="h5" style={styles.header}>
          Sign Up{" "}
        </Text>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={yup.object().shape({
            firstName: yup.string().required("Your first name is required"),
            lastName: yup.string().required("Your last name is required"),
            email: yup.string().email().required("Your email is required"),
            password: yup
              .string()
              .required("A password is required")
              .matches(
                /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                "Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character."
              ),
          })}
          onSubmit={(values) => {
            nativeRegister.mutate(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldTouched,
            setFieldValue,
          }) => {
            return (
              <>
                <Input
                  style={styles.input}
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  placeholder="Your First Name"
                  textContentType="givenName"
                  autoComplete="name"
                  label={"First Name"}
                  onBlur={() => setFieldTouched("firstName")}
                  caption={
                    touched.firstName && errors.firstName
                      ? errors.firstName
                      : undefined
                  }
                  status={
                    touched.firstName && errors.firstName ? "danger" : "basic"
                  }
                />
                <Input
                  style={styles.input}
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  placeholder="Your Last Name"
                  textContentType="familyName"
                  autoComplete="name"
                  label={"Last Name"}
                  onBlur={() => setFieldTouched("lastName")}
                  caption={
                    touched.lastName && errors.lastName
                      ? errors.lastName
                      : undefined
                  }
                  status={
                    touched.lastName && errors.lastName ? "danger" : "basic"
                  }
                />
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

                <Button
                  style={styles.signUpButton}
                  onPress={() => handleSubmit()}
                >
                  Sign Up
                </Button>

                <TextDivider text="or" style={styles.orContainer} />

                <GoogleButton
                  text="Sign up with Google"
                  style={styles.button}
                  onPress={() => console.warn("Google sign up")}
                />
                <FacebookButton
                  text="Sign up with Google"
                  style={styles.button}
                  onPress={() => console.warn("Facebook sign up")}
                />
                <AppleButton
                  type="sign-up"
                  onPress={() => console.warn("Apple sign up")}
                />
              </>
            );
          }}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

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
  signUpButton: {
    marginTop: 20,
  },
  orContainer: {
    marginVertical: 30,
  },
  button: {
    marginBottom: 10,
  },
});
