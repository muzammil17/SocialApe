import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import moment from "moment";
import OptionsMenu from "react-native-options-menu";

const UserComment = ({ comment }) => {

  return (
    <View style={styles.container}>
      <View style={styles.itemRow}>
        <Image
          source={{ uri: `${comment.imageUrl}` }}
          style={styles.userImage}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={styles.userName}>{comment.userHandle}</Text>
          <View style={styles.timeSection}>
            <MaterialCommunityIcons name="earth" size={13} color={"#b3b3b3"} />
            <Text
              style={{
                color: "#bfbfbf",
                marginLeft: 3,
                fontSize: 12,
                fontFamily: "nunito-regular",
              }}
            >
              {moment(comment.createdAt).startOf("minutes").fromNow()}
            </Text>
          </View>
        </View>
        {/* <View style={{ alignSelf: "center", marginRight: 5 }}>
          <OptionsMenu
            customButton={
              <SimpleLineIcons name="options" size={14} color={"#b3b3b3"} />
            }
            destructiveIndex={0}
            options={["Delete", "Cancel"]}
            actions={[deleteComment, closeOption]}
          />
        </View> */}
      </View>

      <View style={styles.screamBody}>
        <Text style={styles.bodyText}>{comment.body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  timeSection: {
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 0,
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  userName: {
    fontSize: 20,
    fontFamily: "nunito-bold",
    textTransform: "capitalize",
    marginLeft: 10,
    padding: 0,
    margin: 0,
  },
  screamBody: {
    marginTop: 2,
    paddingTop: 10,
  },
  bodyText: {
    fontSize: 16,
    fontFamily: "nunito-regular",
  },
});

export default UserComment;
