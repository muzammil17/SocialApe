import axios from "axios";
import { Url } from "./url";
import { AsyncStorage } from "react-native";

function Api(method, url, data) {
  // var token;
  // AsyncStorage.getItem("token")
  //   .then((res) => res)
  //   .then((data) => {
  //     token = data;
  //     console.log("Api token", token);
  //   });

  // if (!token) {
  //   console.log("run ");
  //   return axios({
  //     method: method,
  //     data: data,
  //     url: Url + url,
  //     config: {
  //       headers: {
  //         "Content-Type": "Application/json",
  //         // Authorization: `Bearer ${token}`,
  //       },
  //     },
  //   });
  // } else {
  console.log("run 2");
  if (
    method === "get" ||
    method === "Get" ||
    method === "Delete" ||
    method === "delete"
  ) {
    return axios({
      method,
      url: Url + url,
      params: data,
      config: {
        headers: {
          "Content-Type": "Application/json",
          // Authorization: `Bearer ${token}`,
        },
      },
    });
  } else {
    return axios({
      method,
      url: Url + url,
      data: data,

      config: {
        headers: {
          "Content-Type": "Application/json",
          // Authorization: `Bearer ${token}`,
        },
      },
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
  }
}

export { Api };
