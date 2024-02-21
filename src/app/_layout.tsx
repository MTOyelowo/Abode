import { Stack } from "expo-router";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import { Provider } from "react-redux";
import store from "../utils/redux/store";
import { theme } from "../../theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const unstable_setting = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ApplicationProvider {...eva} theme={theme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="findLocations"
              options={{ presentation: "modal", headerShown: false }}
            />
          </Stack>
        </ApplicationProvider>
      </Provider>
    </QueryClientProvider>
  );
}
