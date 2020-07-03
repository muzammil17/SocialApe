import React, { Component, useEffect, useState } from "react";
import { View, Text, StatusBar, AsyncStorage, Image } from "react-native";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import { Api } from "./actions/Api";

// code

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabScreens = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen component={Home} name="Home" />
    </Tab.Navigator>
  );
};

function StackScreens(props) {
  const [token, setToken] = useState("");
  const [timeOut, settimeOut] = useState(false);

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
      <Stack.Navigator initialRouteName="home">
        {userToken ? (
          <Stack.Screen
            component={TabScreens}
            name="home"
            options={{
              headerTitle: () => (
                <View style={{flex: 1, flexDirection: "row",justifyContent:"center", alignItems: "center"}}>
                  <Text
                    style={{ color: "#FFF", fontFamily: "permanent-regular", fontSize: 20 }}
                  >
                    SOCIALAPE
                  </Text>
                  {/* <Image source={require("./images/icon.png")} style={{height: 5,}} /> */}
                </View>
              ),
              title: "Social APe",
              headerStyle: {
                backgroundColor: "#337ab7",
              },
              headerTintColor: "#FFF",
              headerTitleStyle: {
                fontFamily: "permanent-regular",
                fontSize: 40,
              },
              headerTitleAlign: "center",
            }}
          />
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

class Router extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <AppStatusBar background={"#337ab7"} barStyle="light-content" />
        <NavigationContainer>
          <StackScreens {...this.props} />
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(Router);
