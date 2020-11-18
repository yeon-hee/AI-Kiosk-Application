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

const findStaff = ( { placeId, names }, callback, errorCallback ) => {
  let URL = BACK_URL + '/account/getAccountInfo?placeId=' + placeId + '&names=' + names;
  axios.get(URL)
  .then( (res) => callback(res) )
  .catch( (res) => console.log(res) );
}

const sendMessageReq = ( accountId, callback, errorCallback ) => {
  let URL = BACK_URL + '/account/SendMessage?accountId=' + accountId;
  axios.get(URL)
  .then( (res) => callback(res) )
  .catch( (res) => console.log(res) );
}

export { writeLog, getPlaceList, findStaff, sendMessageReq };