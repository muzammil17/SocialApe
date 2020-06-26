import { AsyncStorage } from "react-native";

export const getToken = async () => {
  return await AsyncStorage.getItem("token").then((res) => {
    return res;
  });
};
