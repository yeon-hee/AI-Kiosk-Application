import axios from "axios";

const API_URL = "https://api.maum.ai/insight/app";

const saveFace = (formData,callback,errorCallback) => {
    axios.put(API_URL+'/setFace', formData)
    .then( (res) => callback(res))
    .catch( (res) => errorCallback(res));
}

const getFaceList = (formData,callback,errorCallback) => {
  axios.post(API_URL+'/getFaceList', formData)
  .then( (res) => callback(res))
  .catch( (res) => errorCallback(res));
}

const recogFace = (formData,callback,errorCallback) => {
  axios.post(API_URL+'/recogFace', formData)
  .then( (res) => callback(res))
  .catch( (res) => errorCallback(res));
}

export { saveFace, getFaceList, recogFace };