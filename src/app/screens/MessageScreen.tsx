import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { Image, Platform, Pressable, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../../types";
import { Button, Input, Text } from "@ui-kitten/components";
import { properties } from "../../../data/properties";
import { useAuth } from "../../../hooks/useAuth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Screen from "../../components/Screen";
import ModalHeader from "../../components/ModalHeader";
import Row from "../../components/core/Row";
import { getStateAbbrevation } from "../../utils/getStateAbbrevation";
import { Formik } from "formik";
import * as yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = NativeStackScreenProps<RootStackParamList, "Message">;

const MessageScreen: FC<Props> = ({ route, navigation }) => {
  const { user } = useAuth();
  const { propertyID, tour } = route.params;

  const index = properties.findIndex((index) => index.id === propertyID);
  const property = properties[index];

  const [pickedDate, setPickedDate] = useState<Date>(new Date());
  const [showCalender, setShowCalender] = useState(false);
  console.log(property.images[0]);
  return (
    <KeyboardAwareScrollView>
      <Screen style={styles.container}>
        {Platform.OS === "ios" ? <ModalHeader /> : null}
        <Row>
          <Image style={styles.image} source={{ uri: property.images[0] }} />
          <View style={styles.address}>
            <Text category="s1">{property.name}</Text>
            <Text category="c1">
              {property.street}, {property.city},{" "}
              {getStateAbbrevation(property.state)} {property.zip}
            </Text>
            <Text category="c1">
              {property.rentLow.toLocaleString()} -{" "}
              {property.rentHigh.toLocaleString()} | {property.bedroomLow} -{" "}
              {property.bedroomHigh} Beds
            </Text>
          </View>
        </Row>

        <Formik
          initialValues={{
            firstName: user ? user.firstName : "",
            lastName: user ? user.lastName : "",
            phoneNumber: "",
            email: user ? user.email : "",
            message: tour ? "I would like to schedule a tour." : "",
          }}
          validationSchema={yup.object().shape({
            firstName: yup.string().required("Required field"),
            lastName: yup.string().required("Required field"),
            phoneNumber: yup.string(),
            email: yup.string().email().required("Required field"),
            message: yup.string().required("Required field"),
          })}
          onSubmit={(values) => {
            console.log("send values", values);
            navigation.goBack();
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
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  placeholder="Your first name"
                  label="First Name*"
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
                  placeholder="Your first name"
                  label="First Name*"
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
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  placeholder="Your phone number"
                  label="Phone Number"
                  keyboardType="number-pad"
                />
                <Input
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  placeholder="Your Email Address"
                  keyboardType="email-address"
                  label="Email*"
                  onBlur={() => setFieldTouched("email")}
                  caption={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  status={touched.email && errors.email ? "danger" : "basic"}
                />
                <View style={styles.input}>
                  <Text
                    style={styles.moveInLabel}
                    category="label"
                    appearance="hint"
                  >
                    Move-In Date
                  </Text>
                  <Pressable
                    onPress={() => setShowCalender(true)}
                    style={styles.pickedDate}
                  >
                    <Text style={styles.pickedDateText}>
                      {pickedDate?.toDateString()}
                    </Text>
                  </Pressable>
                </View>

                {showCalender && (
                  <DateTimePicker
                    value={pickedDate}
                    mode="date"
                    onChange={(event: any, selectedDate?: Date) => {
                      if (selectedDate) {
                        setShowCalender(false);
                        setPickedDate(selectedDate);
                      }
                    }}
                  />
                )}

                <Input
                  style={styles.input}
                  value={values.message}
                  onChangeText={handleChange("message")}
                  label="Custom Message"
                  multiline
                  numberOfLines={10}
                  onBlur={() => setFieldTouched("message")}
                  textAlignVertical="top"
                  caption={
                    touched.message && errors.message
                      ? errors.message
                      : undefined
                  }
                  placeholder="Say something nice, or not ..."
                  status={
                    touched.message && errors.message ? "danger" : "basic"
                  }
                />

                <Button
                  style={styles.sendMessageButton}
                  onPress={() => handleSubmit()}
                >
                  Send Message
                </Button>
              </>
            );
          }}
        </Formik>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  row: {
    alignItems: "center",
    paddingVertical: 10,
  },
  address: {
    marginLeft: 10,
  },
  image: {
    height: 50,
    width: 70,
  },
  input: {
    marginTop: 10,
  },
  moveInLabel: {
    paddingVertical: 5,
  },
  pickedDate: {
    borderColor: "#E8E8E8",
    borderRadius: 3,
    borderWidth: 1,
    height: 40,
    paddingLeft: 15,
    backgroundColor: "#F7F9FC",
  },
  pickedDateText: {
    marginTop: 7,
  },
  sendMessageButton: {
    marginVertical: 20,
  },
});
