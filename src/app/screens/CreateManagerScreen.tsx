import {FC, useRef, useState} from "react";
import {Text, Input, Button} from "@ui-kitten/components";
import {Image, Pressable, StyleSheet, View} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";

import ModalHeader from "../../components/ModalHeader";
import Screen from "../../components/Screen";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import PhoneInput from "../../components/PhoneInput";
import RNPhoneInput from "react-native-phone-number-input";
import {useMutation} from "react-query";
import axios from "axios";
import {endpoints} from "../../../constants";
import {useAuth} from "../../../hooks/useAuth";
import Loading from "../../components/Loading";

interface Props {
  refetchManagers?: () => void;
}

const CreateManagerScreen: FC<Props> = ({refetchManagers}) => {
  const {user} = useAuth();
  const phoneRef = useRef<RNPhoneInput>(null);

  const [imageURI, setImageURI] = useState<string>("");

  const pickImage = async (
    setBase64Image: (field: string, value: any) => void,
    field: string
  ) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      setBase64Image(field, image.base64 as string);
      setImageURI(image.uri);
    }
  };

  const createManager = useMutation(
    (values: {
      name: string;
      email: string;
      phoneNumber: string;
      website: string;
      image: string;
    }) => {
      return axios.post(endpoints.createManager, {
        userID: user?.ID,
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        website: values.website,
        image: values.image,
      });
    },
    {
      onSuccess(data) {
        setImageURI("");
        if (refetchManagers) refetchManagers();
      },
      onError() {
        alert("Unable to create manager");
      },
    }
  );

  if (createManager.isLoading) return <Loading />;

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen>
        <ModalHeader text="Abode" xShown />
        <View style={styles.container}>
          <Text category="h5" style={styles.header}>
            Create Property Manager Account
          </Text>
          <Text>
            Create this account to list your properties. Users will see this
            information under the contact section of your listings.
          </Text>
          <Formik
            initialValues={{
              name: "",
              email: "",
              phoneNumber: "",
              website: "",
              image: "",
            }}
            validationSchema={yup.object().shape({
              name: yup.string().required("Required"),
              email: yup.string().email().required("Required"),
              phoneNumber: yup.string(),
              website: yup.string(),
              image: yup.string(),
            })}
            onSubmit={(values) => {
              if (
                values.phoneNumber &&
                !phoneRef.current?.isValidNumber(values.phoneNumber)
              )
                return;

              createManager.mutate(values);
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
                    value={values.name}
                    onChangeText={handleChange("name")}
                    placeholder="Management Name"
                    autoCapitalize="none"
                    autoComplete="name"
                    label="Name *"
                    onBlur={() => setFieldTouched("name")}
                    caption={
                      touched.name && errors.name ? errors.name : undefined
                    }
                    status={touched.name && errors.name ? "danger" : "basic"}
                  />
                  <Input
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    placeholder="Email Address"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
                    label="Email *"
                    textContentType="emailAddress"
                    onBlur={() => setFieldTouched("email")}
                    caption={
                      touched.email && errors.email ? errors.email : undefined
                    }
                    status={touched.email && errors.email ? "danger" : "basic"}
                  />
                  <Input
                    style={styles.input}
                    value={values.website}
                    onChangeText={handleChange("website")}
                    placeholder="Your Website"
                    autoCapitalize="none"
                    keyboardType="url"
                    label="Website"
                    textContentType="URL"
                    onBlur={() => setFieldTouched("website")}
                    caption={
                      touched.website && errors.website
                        ? errors.website
                        : undefined
                    }
                    status={
                      touched.website && errors.website ? "danger" : "basic"
                    }
                  />
                  <PhoneInput
                    onChangeText={handleChange("phoneNumber")}
                    phoneNumber={values.phoneNumber}
                    phoneRef={phoneRef}
                    style={styles.input}
                  />
                  {imageURI ? (
                    <Pressable
                      style={styles.imageContainer}
                      onPress={() => pickImage(setFieldValue, "image")}
                    >
                      <Image source={{uri: imageURI}} style={styles.image} />
                      <Button
                        status="info"
                        appearance="ghost"
                        onPress={() => {
                          setImageURI("");
                          setFieldValue("image", "");
                        }}
                      >
                        Clear Image
                      </Button>
                    </Pressable>
                  ) : null}
                  <Button
                    appearance="ghost"
                    style={styles.signInButton}
                    onPress={() => pickImage(setFieldValue, "image")}
                  >
                    {imageURI ? "Update Image" : "Add Image"}
                  </Button>
                  <Button
                    style={styles.signInButton}
                    onPress={() => handleSubmit()}
                  >
                    Create Account
                  </Button>
                </>
              );
            }}
          </Formik>
        </View>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

export default CreateManagerScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  header: {
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    marginTop: 10,
  },
  signInButton: {
    marginTop: 20,
  },
  imageContainer: {
    paddingVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 5,
    alignSelf: "center",
  },
});
