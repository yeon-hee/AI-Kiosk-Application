import axios from "axios";
import {BACK_URL} from "../config/index.js";

const writeLog = (data,callback,errorCallback) => {
  axios.post(BACK_URL+'/log/saveLog', data)
  .then( (res) => callback(res))
  .catch( (res) => errorCallback(res));
}

export { writeLog };