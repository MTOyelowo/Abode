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
import Loading from "../../components/Loading";
import { endpoints } from "../../../constants";
import { useMutation } from "react-query";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "ResetPassword">;

const ResetPasswordScreen: FC<Props> = ({ route, navigation }) => {
  const { token } = route.params;

  const resetPassword = useMutation(
    async (password: string) => {
      return axios.post(
        endpoints.resetPassword,
        { password },
        {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        }
      );
    },
    {
      onSuccess() {
        navigation.navigate("SignIn");
      },
      onError(error: any) {
        if (error.response.status === 401)
          return alert("Invalid or Expired Token");

        alert("Unable to reset password,");
      },
    }
  );

  if (resetPassword.isLoading) return <Loading />;

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
            resetPassword.mutateAsync(values.password);
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
