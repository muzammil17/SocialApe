import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  KeyboardAvoidingView,
  Text,
} from "react-native";
// import KeyboardSpacer from 'react-native-keyboard-spacer'
import { connect } from "react-redux";
import { Api } from "../actions/Api";
import UserComment from "./flatListComponents/userComment";
import ItemSeparator from "./flatListComponents/itemSeperator";
import CommentHeader from "./flatListComponents/commentHeader";
import { v4 as uuid } from "uuid";
import { addCommentCount } from "../actions/screamActions";

const CommentScream = ({
  likes,
  like,
  dispatch,
  credentials,
  screamId,
  ...props
}) => {
  const [comments, setComments] = useState([]);
  const { scream } = props.route.params;
  console.log("scream", scream);

  useEffect(() => {
    Api("get", `/screams/${scream.id}`)
      .then((res) => {
        // console.log(res);
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [scream]);

  const handleAddComment = (comment) => {
    Api("post", `/screams/${screamId}/comments`, { body: comment })
      .then((res) => {
        console.log(res);
        setComments([res.data.newComment, ...comments]);
        dispatch(addCommentCount(scream.id));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, backgroundColor: "hsl(0,0%,90%)" }}>
          <FlatList
            data={comments}
            renderItem={({ item }) => <UserComment comment={item} />}
            ListHeaderComponent={() => (
              <CommentHeader
                scream={scream}
                handleAddComment={handleAddComment}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <Text>empty</Text>}
            scrollEnabled
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={() => uuid()}
          />
          {/* <KeyboardSpacer /> */}
        </View>
      </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  let screamId = ownProps.route.params.scream.id;
  return {
    credentials: state.users.userCredential,
    screamId,
  };
};

export default connect(mapStateToProps)(CommentScream);
