import React, { useLayoutEffect, useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { addScreamAction } from "../actions/screamActions";

const NewScream = ({ user, navigation, dispatch }) => {
  const [text, setText] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.header}>
          <Feather
            name="x"
            size={28}
            style={styles.icon}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerText}>NEW SCREAM</Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.post}>Post</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, text]);

  const handleSubmit = () => {
    if (text !== "") {
      dispatch(addScreamAction({ body: text }));
      setText("");
      navigation.navigate("home");
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.imageRow}>
            <Image
              source={{ uri: `${user.imageUrl}` }}
              style={styles.userImage}
            />
            <Text style={styles.userName}>{user.handle}</Text>
          </View>
          <View style={{ alignItems: "stretch" }}>
            <TextInput
              multiline
              value={text}
              placeholder={"Say what you want..."}
              onChangeText={(e) => setText(e)}
              textAlignVertical={"top"}
              autoFocus={true}
              style={styles.textInput}
            />
          </View>
        </>
      ) : (
        <Text>image not found</Text>
      )}

      {/* */}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.userCredential,
  };
};

export default connect(mapStateToProps)(NewScream);

const styles = StyleSheet.create({
  header: {
    flex: 3,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
    color: "#FFF",
    fontFamily: "permanent-regular",
  },
  icon: {
    marginLeft: 20,
    color: "#FFF",
  },
  post: {
    marginRight: 20,
    color: "#FFF",
    fontFamily: "nunito-bold",
    fontSize: 18,
  },
  // view

  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  imageRow: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  userName: {
    fontSize: 26,
    fontFamily: "nunito-bold",
    marginLeft: 5,
    textTransform: "capitalize",
  },
  textInput: {
    fontSize: 16,
    fontFamily: "nunito-regular",
    height: 200,
  },
});
