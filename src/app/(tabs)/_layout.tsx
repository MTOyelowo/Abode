import { useSelector } from "react-redux";
import { RootState } from "../../utils/redux/store";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { theme } from "../../../theme";

export default function TabLayout() {
  const tabShown = useSelector((state: RootState) => state.tab.tabShown);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme["color-primary-500"],
        tabBarStyle: { height: 55 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "Search",
          tabBarStyle: { display: tabShown === true ? "flex" : "none" },
          title: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="magnify" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          tabBarLabel: "Saved",
          title: "Saved",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="heart-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Account",
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="account-circle-outline"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
