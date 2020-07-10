import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import moment from "moment";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  likeScream,
  unLikeScream,
  likeScreamAction,
  unLikeScreamAction,
} from "../../actions/screamActions";
// import { Api } from "../actions/Api";
import AddCommentHeader from "./addCommentHeader";

const CommentScream = ({
  likes,
  like,
  dispatch,
  handleAddComment,
  likeCount,
  commentCount,
  ...props
}) => {
  const [userLiked, setUserLiked] = useState(false);
  const [query, setQuery] = useState("");
  const { scream } = props;

  useEffect(() => {
    const isLiked = like.length ? like[0].screamId : null;
    if (isLiked) {
      setUserLiked(true);
    } else {
      setUserLiked(false);
    }
  }, [likes, like]);

  const onLikeButtonPress = () => {
    if (userLiked) {
      dispatch(unLikeScream(scream.id));
      dispatch(unLikeScreamAction(scream.id));
    } else {
      let user = { screamId: scream.id, userHandle: scream.userHandle };
      dispatch(likeScream(user));
      dispatch(likeScreamAction(user));
    }
  };

  console.log(commentCount);
  return (
    // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" >
          <View style={styles.paddingContainer}>
            <View style={styles.itemRow}>
              <Image
                source={{ uri: `${scream.userImage}` }}
                style={styles.userImage}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.userName}>{scream.userHandle}</Text>
                <View style={styles.timeSection}>
                  <MaterialCommunityIcons
                    name="earth"
                    size={13}
                    color={"#b3b3b3"}
                  />
                  <Text
                    style={{
                      color: "#bfbfbf",
                      marginLeft: 3,
                      fontSize: 13,
                      fontFamily: "nunito-regular",
                    }}
                  >
                    {moment(scream.createdAt).format("MMM Do, YYYY")}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.screamBody}>
              <Text style={styles.bodyText}>{scream.body}</Text>
            </View>

            <View style={styles.footerIcons}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                {userLiked ? (
                  <TouchableOpacity>
                    <Ionicons
                      name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
                      size={28}
                      color={"red"}
                      onPress={onLikeButtonPress}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity>
                    <Ionicons
                      name={
                        Platform.OS === "ios"
                          ? "ios-heart-empty"
                          : "md-heart-empty"
                      }
                      size={28}
                      onPress={onLikeButtonPress}
                    />
                  </TouchableOpacity>
                )}

                <TouchableOpacity>
                  <FontAwesome
                    name="comment-o"
                    size={26}
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "baseline",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {scream.likeCount ? (
                    <>
                      <Text
                        style={{ fontSize: 17, fontFamily: "nunito-semibold" }}
                      >
                        {likeCount}
                      </Text>
                      <TouchableOpacity>
                        <Ionicons
                          name={
                            Platform.OS === "ios" ? "ios-heart" : "md-heart"
                          }
                          size={16}
                        />
                      </TouchableOpacity>
                    </>
                  ) : null}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 8,
                  }}
                >
                  {commentCount ? (
                    <>
                      <Text
                        style={{ fontSize: 17, fontFamily: "nunito-semibold" }}
                      >
                        {commentCount}
                      </Text>
                      <TouchableOpacity>
                        <FontAwesome name="comment" size={15} />
                      </TouchableOpacity>
                    </>
                  ) : null}
                </View>
              </View>
            </View>
          </View>

          <KeyboardAvoidingView behavior="padding">
            <AddCommentHeader handleAddComment={handleAddComment} />
          </KeyboardAvoidingView>
          </KeyboardAvoidingView>
        </View>
        {/* </KeyboardAvoidingView> */}
      </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  let screamId = ownProps.scream.id;
  let likeCount;
  let commentCount;
  const likeArray = state.screams.screams.map((scream) => {
    if (scream.id === screamId) {
      likeCount = scream.likeCount;
      commentCount = scream.commentCount;
    }
  });

  return {
    like: state.users.likes.filter((scream) => scream.screamId === screamId),
    likes: state.users.likes,
    likeCount,
    commentCount,
  };
};

export default connect(mapStateToProps)(CommentScream);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
  },
  paddingContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFF",
  },
  itemRow: {
    flexDirection: "row",
    // flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  timeSection: {
    marginLeft: 10,
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 0,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  userName: {
    fontSize: 23,
    fontFamily: "nunito-bold",
    textTransform: "capitalize",
    marginLeft: 10,
    padding: 0,
    margin: 0,
  },
  screamBody: {
    marginTop: 7,
    paddingVertical: 10,
  },
  bodyText: {
    fontSize: 16,
    fontFamily: "nunito-regular",
  },
  footerIcons: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },
});
