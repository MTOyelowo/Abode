import { Text } from "@ui-kitten/components";
import { FC, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  children: string;
  initialLines: number;
}

const TextMoreOrLess: FC<Props> = ({ children, initialLines = 1 }) => {
  const [textShown, setTextShown] = useState<boolean>(false);
  const [lengthMore, setLengthMore] = useState<boolean>(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = (e: { nativeEvent: { lines: any } }) => {
    const { lines } = e.nativeEvent;
    if (lines && Array.isArray(lines) && lines.length > 0) {
      if (lines.length >= initialLines) {
        setLengthMore(true);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : initialLines}
        category="c1"
      >
        {children}
      </Text>

      {lengthMore ? (
        <TouchableOpacity
          style={styles.lengthMoreTextContainer}
          onPress={toggleNumberOfLines}
        >
          <Text category="c1" status="info">
            {textShown ? "Read less" : "Read more"}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default TextMoreOrLess;

const styles = StyleSheet.create({
  container: {},
  lengthMoreTextContainer: {
    paddingVertical: 5,
    zIndex: 30,
  },
});
