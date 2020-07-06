import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import Scream from "./scream";
import { getAllScreams, refreshTrue } from "../actions/screamActions";
import FlatListItemSeparator from "./flatListComponents/itemSeperator";
import FlatListHeader from "./flatListComponents/flatListHeader";

const Home = (props) => {
  const {
    screams: { screams, refreshingHome },
    dispatch,
    user,
    navigation,
  } = props;

  const [refresh, setRefresh] = useState(false);

  const getScreams = () => {
    setRefresh(true);
    dispatch(getAllScreams());
    setTimeout(() => {
      setRefresh(false);
    }, 3000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "hsl(0, 0%, 90%)" }}>
      {/* <View style={{ flex: 1 }}>
        <FlatListHeader user={user} />
      </View> */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={screams ? screams : null}
          renderItem={({ item }) => <Scream scream={item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={FlatListItemSeparator}
          refreshing={refresh}
          onRefresh={getScreams}
          ListHeaderComponent={() => (
            <FlatListHeader user={user} navigation={navigation} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    screams: state.screams,
    user: state.users.userCredential,
  };
};

export default connect(mapStateToProps)(Home);
