import React, { useEffect, useState } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { signOut, getUserDetail } from "../actions/userAuthed";
import { connect } from "react-redux";
import { getToken } from "../utils/helper";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Api } from "../actions/Api";

const Home = (props) => {
  const [token, settoken] = useState("");
  const { dispatch } = props;
  console.log(props);

  useEffect(() => {
    dispatch(getUserDetail());
    console.log(axios.defaults.headers)
  });

  useEffect(() => {
    let tokenn = "";
    let decoded = "";
    getToken().then((data) => {
      // console.log(data);
      let initial = data ? data.split("Bearer ")[1] : null;
      decoded = jwt_decode(initial);
      // console.log(decoded);
      let userId = decoded.user_id;
    });
  });

  return (
    <View>
      <TouchableOpacity onPress={() => dispatch(signOut())}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default connect()(Home);
