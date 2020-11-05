import axios from "axios";

const API_URL = "http://localhost:8081/web";

function getLogList(email, placeName, success, fail) {
  axios.get(API_URL+'/log/getLogList', {
    params: {
        email: email,
        placeName: placeName
    }
  })
    .then(success)
    .catch(fail);
}

function getLogPeriod(email, placeName, startDate, endDate, success, fail) {
    axios.get(API_URL+'/log/getLogPeriod', {
      params: {
          email: email,
          placeName: placeName,
          startDate: startDate,
          endDate: endDate
      }
    })
      .then(success)
      .catch(fail);
}

export { getLogList,getLogPeriod };