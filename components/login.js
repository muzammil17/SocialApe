import React, { useState } from "react";
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
} from "react-native";
import { connect } from "react-redux";
import {
  userLoginAction,
  removeError,
  loadingIndicatorAction,
} from "../actions/userAuthed";
import Loader from "./loader";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [errorState, setErrorState] = useState(false);

  const { credentialError, dispatch, navigation } = props;

  const handleSubmit = () => {
    console.log("login", props);
    if (email !== "" && password !== "") {
      props.dispatch(userLoginAction({ email, password }));
      dispatch(loadingIndicatorAction());
      console.log(email, password);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: "#FFF" }}
      >
        <Loader />

        <View style={{ flex: 1 }}></View>
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
              if (credentialError.length > 0) {
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
              if (credentialError.length > 0) {
                dispatch(removeError());
              }
            }}
            placeholder="password..."
            secureTextEntry
            clearButtonMode="always"
          />

          {credentialError.length ? (
            <Text
              style={{
                color: "red",
                fontFamily: "nunito-semibold",
                padding: 5,
              }}
            >
              *{credentialError}
            </Text>
          ) : null}

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text
              style={{
                fontFamily: "nunito-bold",
                textAlign: "center",
                color: "#FFF",
                fontSize: 16,
              }}
            >
              Login
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
            Don't have an account?
          </Text>
          <Text
            style={{
              fontFamily: "nunito-semibold",
              fontSize: 16,
              marginTop: 5,
              color: "#0099e6",
            }}
            onPress={() => {
              navigation.navigate("Signup");
              if (credentialError.length > 0) {
                dispatch(removeError());
              }
            }}
          >
            Signup
          </Text>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={[styles.submitButton, {marginTop: "auto"}]}
          >
            <Text
              style={{
                fontFamily: "nunito-bold",
                textAlign: "center",
                color: "#FFF",
              }}
            >
              Signup
            </Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        style={{ borderWidth: 2, marginTop: 100 }}
      >
        <Text>Signup</Text>
      </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => {
  return {
    credentialError: state.users.credentialError,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputElements: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#cccccc",
    backgroundColor: "hsl(0, 0%, 97%)",
    padding: 10,
    paddingRight: 30,
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

export default connect(mapStateToProps)(Login);
