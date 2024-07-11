import {Text} from "@ui-kitten/components";
import {FC, Ref, useRef, useState} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";
import RNPhoneInput from "react-native-phone-number-input";
import {theme} from "../../theme";

interface Props {
  onChangeText: (text: string) => void | undefined;
  phoneNumber: string;
  phoneRef?: Ref<RNPhoneInput> | null;
  style?: ViewStyle | ViewStyle[];
}

const PhoneInput: FC<Props> = ({
  onChangeText,
  phoneNumber,
  phoneRef,
  style,
}) => {
  const [borderColor, setBorderColor] = useState(theme["color-light-gray"]);
  if (!phoneRef) phoneRef = useRef<RNPhoneInput>(null);
  return (
    <View style={style}>
      <Text appearance="hint" category="c1" style={styles.label}>
        Phone
      </Text>
      <RNPhoneInput
        ref={phoneRef}
        onChangeText={onChangeText}
        defaultCode={"NG"}
        containerStyle={[
          styles.containerStyle,
          styles.input,
          {borderColor: borderColor},
        ]}
        textInputProps={{
          selectionColor: theme["color-success-300"],
          dataDetectorTypes: "phoneNumber",
          onFocus(e) {
            setBorderColor(theme["color-primary-500"]);
          },
          onBlur(e) {
            setBorderColor(theme["color-light-gray"]);
            if (
              !(phoneRef as any).current?.isValidNumber(phoneNumber) &&
              phoneNumber !== ""
            ) {
              setBorderColor(theme["color-danger-500"]);
            }
          },
          style: styles.textInputStyle,
        }}
        layout="second"
        textContainerStyle={styles.textContainer}
      />
      {borderColor === theme["color-danger-500"] ? (
        <Text category="c1" style={styles.errorText}>
          Invalid Phone Number
        </Text>
      ) : null}
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    marginBottom: -5,
  },
  containerStyle: {
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginTop: 0,
    backgroundColor: "#F7F9FC",
  },
  input: {
    marginTop: 10,
  },
  textInputStyle: {
    width: "100%",
    height: 40,
    fontSize: 15,
  },
  textContainer: {
    borderRadius: 5,
  },
  errorText: {color: theme["color-danger-500"]},
});
