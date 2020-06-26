import React, { Component, useEffect, useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { getToken } from "./utils/helper";
import { restoreToken, signOut } from "./actions/userAuthed";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import App from "./App";
import Constants from "expo-constants";
import { PermanentMarker_400Regular } from "@expo-google-fonts/permanent-marker";
import {
  Nunito_700Bold,
  Nunito_400Regular,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

const Stack = createStackNavigator();

function StackScreens(props) {
  const [token, setToken] = useState("");
  // const [fontsLoaded, setfontsLoaded] = useState(false);
  let [fontLoaded] = useFonts({
    "nunito-regular": Nunito_400Regular,
    "nunito-bold": Nunito_700Bold,
    "nunito-semibold": Nunito_600SemiBold,
    "permanent-regular": PermanentMarker_400Regular,
  });

  //console.log(props);
  const { isLoading, isSignout, userToken, dispatch } = props;

  useEffect(() => {
    getToken().then((data) => {
      setToken(data);
    });
  }, [token]);

  useEffect(() => {
    // console.log("token", token);
    if (token !== null) {
      dispatch(restoreToken(token));
      axios.defaults.headers["Authorization"] = token;
    } else {
      dispatch(signOut());
    }
  }, [token]);

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }
  if (fontLoaded) {
    return (
      <Stack.Navigator initialRouteName="home">
        {userToken ? (
          <Stack.Screen component={Home} name="home" />
        ) : (
          <>
            <Stack.Screen
              component={Login}
              name="Login"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              component={Signup}
              name="Signup"
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    );
  } else {
    return <AppLoading />;
  }
}

const AppStatusBar = ({ background, ...props }) => {
  return (
    <View
      style={{
        backgroundColor: background,
        height: Constants.statusBarHeight,
      }}
    >
      <StatusBar translucent backgroundColor={background} {...props} />
    </View>
  );
};

class Router extends Component {
  render() {
    // console.log(this.props);
    return (
      <View style={{ flex: 1 }}>
        <AppStatusBar background={"#000"} barStyle="light-content" />
        <NavigationContainer>
          <StackScreens {...this.props} />
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(Router);
