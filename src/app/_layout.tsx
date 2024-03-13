import { Stack } from "expo-router";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

import { Provider } from "react-redux";
import store from "../utils/redux/store";
import { theme } from "../../theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "../../context";
import { IUser } from "../../types/user";

export const unstable_setting = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const queryClient = new QueryClient();

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    async function getUser() {
      const user = await SecureStore.getItemAsync("user");
      if (user) setUser(JSON.parse(user));
    }
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ApplicationProvider {...eva} theme={theme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="findLocations"
                options={{ presentation: "modal", headerShown: false }}
              />
              <Stack.Screen
                name="signIn"
                options={{ presentation: "modal", headerShown: false }}
              />
              <Stack.Screen
                name="signUp"
                options={{ presentation: "modal", headerShown: false }}
              />
              <Stack.Screen
                name="forgotPassword"
                options={{ presentation: "modal", headerShown: false }}
              />
              <Stack.Screen
                name="resetPassword"
                options={{ presentation: "modal", headerShown: false }}
              />
            </Stack>
          </ApplicationProvider>
        </Provider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
