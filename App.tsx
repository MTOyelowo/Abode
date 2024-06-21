import { QueryClient, QueryClientProvider } from "react-query";
import * as eva from "@eva-design/eva";
import { AuthContext } from "./context";
import * as SecureStore from "expo-secure-store";
import { ApplicationProvider } from "@ui-kitten/components";

import { useEffect, useState } from "react";
import { IUser } from "./types/user";
import { theme } from "./theme";
import Navigation from "./src/app/navigator";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();

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
        <ApplicationProvider {...eva} theme={theme}>
          <Navigation />
          <StatusBar />
        </ApplicationProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
