import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { theme } from "../../../theme";
import { Provider } from "react-redux";
import store, { RootState } from "../../utils/redux/store";
import { useSelector } from "react-redux";
import TabsLayoutComponent from "./TabsLayoutComponent";

export default function TabsLayout() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={theme}>
        <TabsLayoutComponent />
      </ApplicationProvider>
    </Provider>
  );
}
