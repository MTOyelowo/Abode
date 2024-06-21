import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Text } from "@ui-kitten/components";
import ModalHeader from "../../components/ModalHeader";
import * as yup from "yup";
import { Formik } from "formik";
import PasswordInput from "../../components/PasswordInput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "ResetPassword">;

const ResetPasswordScreen: FC<Props> = (token) => {
  const { navigate } = useNavigation();
  return (
    <KeyboardAwareScrollView bounces={false} style={styles.container}>
      <View>
        <ModalHeader text="Abode" xShown />
        <Text category="h5" style={styles.header}>
          Reset Password
        </Text>
        <Formik
          initialValues={{
            password: "",
            passwordRepeat: "",
          }}
          validationSchema={yup.object().shape({
            password: yup
              .string()
              .required("A password is required")
              .matches(
                /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                "Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character."
              ),
            passwordRepeat: yup
              .string()
              .oneOf([yup.ref("password")], "Passwords don't match")
              .required("Confirm your password"),
          })}
          onSubmit={(values) => {
            console.log("Reset Password", values);
            navigate("SignIn");
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
                <PasswordInput
                  style={styles.input}
                  value={values.passwordRepeat}
                  onChangeText={handleChange("passwordRepeat")}
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  onBlur={() => setFieldTouched("passwordRepeat")}
                  caption={
                    touched.passwordRepeat && errors.passwordRepeat
                      ? errors.passwordRepeat
                      : undefined
                  }
                  status={
                    touched.passwordRepeat && errors.passwordRepeat
                      ? "danger"
                      : "basic"
                  }
                />

                <Button style={styles.button} onPress={() => handleSubmit()}>
                  Reset Password
                </Button>
              </>
            );
          }}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ResetPasswordScreen;

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
  button: {
    marginTop: 20,
  },
});
