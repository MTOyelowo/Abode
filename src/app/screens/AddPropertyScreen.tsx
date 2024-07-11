import {FC} from "react";
import {View, StyleSheet, Image} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Text} from "@ui-kitten/components";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

import Screen from "../../components/Screen";
import ModalHeader from "../../components/ModalHeader";
import {useAuth} from "../../../hooks/useAuth";
import {RootStackParamList} from "../../../types";
import SignUpOrSignInScreen from "./SignUpOrSignInScreen";
import CreateManagerScreen from "./CreateManagerScreen";
import {useQuery} from "react-query";
import axios from "axios";
import {endpoints} from "../../../constants";
import Loading from "../../components/Loading";

type Props = NativeStackScreenProps<RootStackParamList, "AddProperty">;

const AddPropertyScreen: FC<Props> = ({route}) => {
  const {user} = useAuth();
  const managerQuery = useQuery(
    "manager",
    () => {
      if (user) return axios.get(endpoints.getManagersByUserID + user.ID);
    },
    {
      cacheTime: 24 * 60 * 60 * 1000,
    }
  );

  if (!user) return <SignUpOrSignInScreen />;

  if (managerQuery.isLoading) return <Loading />;

  if (managerQuery.data?.data.managers.length === 0 || !managerQuery.data)
    return <CreateManagerScreen refetchManagers={managerQuery.refetch} />;
  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen>
        <ModalHeader text="Abode" xShown />
        <View style={styles.container}>
          <Text category="h5" style={styles.header}>
            Add a property
          </Text>
          <Image
            source={{uri: managerQuery.data.data.managers[0].image}}
            style={{height: 250, width: 250}}
          />
        </View>
      </Screen>
    </KeyboardAwareScrollView>
  );
};

export default AddPropertyScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  header: {
    marginVertical: 20,
  },
});
