import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";

const FlatListHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("newScream")}
      >
        <View style={styles.textBox}>
          <Text style={styles.postText}>Write a post...!</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("newScream")}
      >
        <View style={styles.iconBody}>
          <Entypo
            name={"new-message"}
            size={20}
            color={"#999999"}
            style={{ alignContent: "center", textAlign: "center" }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FlatListHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 3,
    backgroundColor: "#FFF",
    padding: 5,
    paddingVertical: 8,
    position: "relative",
  },
  textBox: {
    flex: 9,
  },
  postText: {
    fontSize: 18,
    fontFamily: "nunito-regular",
    paddingLeft: 10,
    color: "#999999",
  },
  iconBody: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 5,
    borderLeftWidth: 1,
    borderColor: "#999999",
  },
});
