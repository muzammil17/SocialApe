import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import {
  userSignupAction,
  removeError,
  loadingIndicatorAction,
} from "../actions/userAuthed";
import Loader from "./loader";
import { Constants } from "expo";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userHandle, setUserHandle] = useState("");

  const { credentialError, dispatch, navigation } = props;

  const handleSubmit = () => {
    console.log("signup", props);
    if (
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      userHandle !== ""
    ) {
      console.log(email, password, confirmPassword, userHandle);
      dispatch(
        userSignupAction({
          email,
          password,
          confirmPassword,
          handle: userHandle,
        })
      );
      dispatch(loadingIndicatorAction());
      //  setErrorState(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: "#FFF" }}
      >
        <Loader />

        {/* <View style={{ flex: 2 }}></View> */}
        <ScrollView>
          <View style={styles.container}>
            <Text
              style={{
                fontFamily: "permanent-regular",
                fontSize: 40,
                fontWeight: "100",
              }}
            >
              SOCIALAPE
            </Text>

            <Image style={styles.logo} source={require("../images/icon.png")} />

            <TextInput
              style={styles.inputElements}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (credentialError) {
                  dispatch(removeError());
                }
              }}
              autoCapitalize={"none"}
              placeholder="email..."
              clearButtonMode="always"
            />
            <TextInput
              style={styles.inputElements}
              value={password}
              onChangeText={(text) => {
                text = text.replace(/\s/g, "");
                setPassword(text);
                if (credentialError) {
                  dispatch(removeError());
                }
              }}
              textContentType="password"
              placeholder="password..."
              secureTextEntry
              clearButtonMode="always"
            />

            <TextInput
              style={styles.inputElements}
              value={confirmPassword}
              secureTextEntry
              textContentType="password"
              placeholder="confirm password..."
              clearButtonMode="always"
              onChangeText={(text) => {
                text = text.replace(/\s/g, "");
                setConfirmPassword(text);
                if (credentialError) {
                  dispatch(removeError());
                }
              }}
            />

            <TextInput
              style={styles.inputElements}
              value={userHandle}
              onChangeText={(text) => {
                setUserHandle(text);
                if (credentialError) {
                  dispatch(removeError());
                }
              }}
              placeholder="username..."
              clearButtonMode="always"
            />

            <View>
              {credentialError
                ? Object.keys(credentialError).map((error) => (
                    <Text
                      key={Math.random()}
                      style={{
                        color: "red",
                        fontFamily: "nunito-semibold",
                        padding: 5,
                      }}
                    >
                      {credentialError[error]}
                    </Text>
                  ))
                : null}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              <Text
                style={{
                  fontFamily: "nunito-bold",
                  textAlign: "center",
                  color: "#FFF",
                  fontSize: 16,
                }}
              >
                Signup
              </Text>
            </TouchableOpacity>

            <View style={[styles.horizontalRow]}>
              <View style={styles.hrLine}></View>
              <Text
                style={{
                  marginHorizontal: 25,
                  fontFamily: "nunito-bold",
                  color: "#bfbfbf",
                  fontSize: 15,
                }}
              >
                OR
              </Text>
              <View style={styles.hrLine}></View>
            </View>

            <Text
              style={{
                marginTop: 10,
                fontFamily: "nunito-semibold",
                fontSize: 16,
              }}
            >
              Already have an account?
            </Text>
            <Text
              style={{
                fontFamily: "nunito-semibold",
                fontSize: 16,
                marginTop: 5,
                color: "#0099e6",
              }}
              onPress={() => {
                navigation.navigate("Login");
                if (credentialError.length > 0) {
                  dispatch(removeError());
                }
              }}
            >
              Login
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => {
  return {
    credentialError: state.credentialError,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  inputElements: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#cccccc",
    backgroundColor: "hsl(0, 0%, 97%)",
    padding: 10,
    marginBottom: 20,
    borderRadius: 3,
    fontFamily: "nunito-regular",
  },
  submitButton: {
    width: "90%",
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 3,
    backgroundColor: "#337ab7",
    borderColor: "#2e6da4",
  },
  logo: {
    margin: 10,
    marginBottom: 20,
    zIndex: 100,
  },
  horizontalRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  hrLine: {
    height: 1,
    backgroundColor: "#d9d9d9",
    width: "35%",
  },
});

export default connect(mapStateToProps)(Signup);
