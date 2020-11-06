import axios from "axios";
import {BACK_URL, WEB as W} from "../config/index.js";

const writeLog = (data,callback,errorCallback) => {
  axios.post(BACK_URL+'/log/saveLog', data)
  .then( (res) => callback(res))
  .catch( (res) => errorCallback(res));
}

const getPlaceList = (data,callback,errorCallback) => {
  let fullUrl = W.host + W.path.placeList + '?authority=' + W.param.authority + '&email=' + W.param.email;
  axios.get(fullUrl)
  .then( (res) => callback(res))
  .catch( (res) => errorCallback(res));
}

export { writeLog, getPlaceList };