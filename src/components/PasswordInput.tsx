import { StyleSheet, View, TextStyle, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Input } from "@ui-kitten/components";
import { EvaStatus } from "@ui-kitten/components/devsupport";
import { useState } from "react";

const PasswordInput = ({
  value,
  style,
  onChangeText,
  placeholder = "Your Password",
  label = "password",
  onBlur,
  caption,
  status,
}: {
  value: string;
  style?: TextStyle;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label: string;
  onBlur?: () => void;
  caption?: string;
  status?: EvaStatus;
}) => {
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);

  const getEyeIcon = () => {
    if (passwordHidden)
      return (
        <MaterialCommunityIcons
          size={24}
          name="eye-off-outline"
          color={"black"}
        />
      );

    return (
      <MaterialCommunityIcons size={24} name="eye-outline" color={"black"} />
    );
  };
  return (
    <Input
      style={style}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      autoComplete="password"
      autoCapitalize="none"
      label={label}
      secureTextEntry={passwordHidden}
      textContentType="password"
      onBlur={onBlur}
      caption={caption}
      status={status}
      accessoryRight={() => (
        <TouchableOpacity
          style={styles.eyeContainer}
          onPress={() => setPasswordHidden(!passwordHidden)}
        >
          {getEyeIcon()}
        </TouchableOpacity>
      )}
    />
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  eyeContainer: {
    paddingHorizontal: 10,
  },
});
