import axios from "axios";
import { Url } from "./url";

function Api(method, url, data) {
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
        },
      },
    });
  }
}

export { Api };
