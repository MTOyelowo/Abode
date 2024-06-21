import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, Text } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import ModalHeader from "../../components/ModalHeader";

const ForgotPasswordScreen = () => {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  return (
    <KeyboardAwareScrollView bounces={false} style={styles.container}>
      <View>
        <ModalHeader text="Abode" xShown />
        {emailSent ? (
          <>
            <Text category="h5" style={styles.header}>
              Email Sent!
            </Text>
            <Text>
              An email containing instructions on how to change your password
              has been sent to you. Please check your junk mail or span section
              if you do not see an email.
            </Text>
          </>
        ) : (
          <>
            <Text category="h5" style={styles.header}>
              Forgot Password{" "}
            </Text>
            <Text>
              Please enter your email, and we'll send you a link to change your
              password
            </Text>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={yup.object().shape({
                email: yup.string().email().required("Your email is required"),
              })}
              onSubmit={(values) => {
                console.log("Login passing values to server", values);
                setEmailSent(true);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldTouched,
                setFieldValue,
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
                      status={
                        touched.email && errors.email ? "danger" : "basic"
                      }
                    />
                    <Button
                      style={styles.continueButton}
                      onPress={() => handleSubmit()}
                    >
                      Continue
                    </Button>
                  </>
                );
              }}
            </Formik>
          </>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPasswordScreen;

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
  continueButton: {
    marginTop: 20,
  },
});
