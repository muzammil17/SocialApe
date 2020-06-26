import React from "react";
import { View, Modal, Text, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

const Loader = ({ loading }) => {
  console.log("loading", loading);

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      onRequestClose={() => console.log("close modal")}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} style={{paddingBottom: 10}} />
          <Text>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return{
    loading: state.loadingIndicator
  }
}

export default connect(mapStateToProps)(Loader);
