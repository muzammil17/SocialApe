import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddCommentHeader = ({ handleAddComment }) => {
  const [query, setQuery] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="add comment"
        value={query}
        onChangeText={(e) => setQuery(e)}
        style={styles.input}
        multiline
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          handleAddComment(query);
          setQuery("");
        }}
      >
        <Ionicons
          name={Platform.OS === "ios" ? "ios-play" : "md-play"}
          size={35}
          color={"#337ab7"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddCommentHeader;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF",
    // marginTop: 4,
    paddingVertical: 4,
    marginBottom: 8,
  },
  input: {
    width: "86%",
    marginLeft: "1%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxHeight: 120,
    backgroundColor: "#ececec",
    margin: 0,
    fontFamily: "nunito-regular",
    fontSize: 15,
    borderRadius: 20,
  },
  icon: {
    alignItems: "center",
    width: "13%",
  },
});
