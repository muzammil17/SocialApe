import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import Router from "./router";

// const getFonts = () => {
//   return Font.loadAsync({
//     "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
//     "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
//     "nunito-semibold": require("./assets/fonts/Nunito-SemiBold.ttf"),
//     // "permanent-regular": require("./assets/fonts/PermanentMarker-Regular.ttf"),
//   });
// };

export default function App() {
  // const [fontsLoaded, setfontsLoaded] = useState(false);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
