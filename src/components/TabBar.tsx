import { FC, useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import Row from "./core/Row";
import { theme } from "../../theme";
import { Text } from "@ui-kitten/components";

type TabItem = {
  title: string;
  onPress: () => any;
};

interface Props {
  tabs: TabItem[];
  style?: ViewStyle | ViewStyle[];
}

const TabBar: FC<Props> = ({ tabs, style }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePress = (index: number, func: () => any) => {
    setActiveIndex(index);
    func();
  };

  return (
    <Row style={style}>
      {tabs.map((item, index) => (
        <TouchableOpacity
          onPress={() => handlePress(index, item.onPress)}
          style={[
            styles.marginRight,
            {
              borderTopColor:
                activeIndex === index ? theme["color-primary-500"] : "",
              borderTopWidth: activeIndex === index ? 3 : 0,
              paddingTop: activeIndex === index ? 0 : 3,
            },
          ]}
          key={item.title}
        >
          <Text
            category="c2"
            appearance={activeIndex === index ? "default" : "hint"}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </Row>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {},
  marginRight: {
    marginRight: 15,
  },
});
