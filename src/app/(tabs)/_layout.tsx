import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { theme } from "../../../theme";

export default function TabsLayout() {
  return (
    <ApplicationProvider {...eva} theme={theme}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme["color-primary-500"],
          tabBarStyle: { height: 55 },
        }}
      >
        <Tabs.Screen
          name="search"
          options={{
            tabBarLabel: "Search",
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
    </ApplicationProvider>
  );
}
