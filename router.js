import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, AsyncStorage, Platform } from "react-native";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, useHeaderHeight } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import axios from "axios";
import Constants from "expo-constants";
import jwt_decode from "jwt-decode";
// Fonts
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { PermanentMarker_400Regular } from "@expo-google-fonts/permanent-marker";
import {
  Nunito_700Bold,
  Nunito_400Regular,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";

// utils and actions
import { getToken } from "./utils/helper";
import {
  signOut,
  restoreTokenAction,
  refreshTokenAction,
} from "./actions/userAuthed";

// Components
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import NewScream from "./components/newScream";
import CommentScream from "./components/commentScream";
// code

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AndroidTab = createMaterialTopTabNavigator();

const TabScreens = () => {
  return (
    <>
      {Platform.OS === "ios" ? (
        <Tab.Navigator
          tabBarOptions={{
            style: {
              height: 56,
            },
          }}
        >
          <Tab.Screen component={Home} name="Home" />
        </Tab.Navigator>
      ) : (
        <AndroidTab.Navigator>
          <AndroidTab.Screen component={Home} name="home" />
        </AndroidTab.Navigator>
      )}
    </>
  );
};

function StackScreens(props) {
  const [token, setToken] = useState("");
  const [timeOut, settimeOut] = useState(false);
  // const header_navigation = useHeaderHeight();

  let [fontLoaded] = useFonts({
    "nunito-regular": Nunito_400Regular,
    "nunito-bold": Nunito_700Bold,
    "nunito-semibold": Nunito_600SemiBold,
    "permanent-regular": PermanentMarker_400Regular,
  });

  const {
    users: { isLoading, isSignout, userToken },
    screams: { screams },
    dispatch,
  } = props;

  useEffect(() => {
    getToken().then((data) => {
      if (data) {
        let checkToken = data.split("Bearer ")[1];
        let decodeToken = jwt_decode(checkToken);
        let axiosHeaderToken = axios.defaults.headers["Authorization"];
        let checkExpiry = decodeToken.exp < Date.now() / 1000;

        if (!checkExpiry) {
          if (!axiosHeaderToken) {
            setToken(data);
            axios.defaults.headers["Authorization"] = data;
            if (!userToken) {
              dispatch(restoreTokenAction(data));
            }
          }
        } else {
          console.log("refresh token ran");
          AsyncStorage.getItem("refreshToken")
            .then((res) => res)
            .then((data) => {
              console.log("refresh token", data);
              let reqData = {
                grant_type: "refresh_token",
                refresh_token: data,
              };
              delete axios.defaults.headers["Authorization"];
              console.log(reqData);
              dispatch(refreshTokenAction(reqData));
            });
        }
      } else {
        dispatch(signOut());
      }
    });
  }, [token, userToken, screams]);

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
      <Stack.Navigator
        initialRouteName="home"
      >
        {userToken ? (
          <>
            <Stack.Screen
              component={TabScreens}
              name="home"
              options={{
                title: "SOCIALAPE",
                headerTintColor: "#FFF",
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontFamily: "permanent-regular",
                  fontSize: 20,
                },
                headerStyle: {
                  backgroundColor: "#337ab7",
                },
                headerStatusBarHeight: 0,
              }}
            />

            <Stack.Screen
              name="newScream"
              component={NewScream}
              options={{
                title: "New Scream",
                headerTintColor: "#FFF",
                headerTitleAlign: "center",
                gestureEnabled: false,
                headerTitleStyle: {
                  fontFamily: "permanent-regular",
                  fontSize: 20,
                },
                headerStyle: {
                  backgroundColor: "#337ab7",
                },
                headerLeft: null,
                headerStatusBarHeight: 0,
              }}
            />
            <Stack.Screen
              name="commentScream"
              component={CommentScream}
              options={{
                title: "Add Comment",
                headerTintColor: "#FFF",
                headerTitleAlign: "center",
                gestureEnabled: true,
                headerTitleStyle: {
                  fontFamily: "permanent-regular",
                  fontSize: 20,
                },
                headerStyle: {
                  backgroundColor: "#337ab7",
                },
                headerLeft: null,
                headerStatusBarHeight: 0,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              component={Login}
              name="Login"
              options={{
                headerShown: false,
                headerStyle: {
                  height: 5,
                },
              }}
            />
            <Stack.Screen
              component={Signup}
              name="Signup"
              options={{
                headerShown: false,
                gestureEnabled: false,
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

const Router = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <AppStatusBar background={"#337ab7"} barStyle="light-content" />
      <NavigationContainer>
        <StackScreens {...props} />
      </NavigationContainer>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(Router);
