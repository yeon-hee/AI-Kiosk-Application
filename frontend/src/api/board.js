import axios from "axios";

const API_URL = "https://k3a508.p.ssafy.io/web";

function getBoardList(success, fail) {
  axios.get(API_URL+'/board/boardList')
    .then(success)
    .catch(fail);
}

function registBoard(title, content, success, fail) {4
    const body = {
        title: title,
        content: content,
    };

    axios.post(API_URL+'/board/registBoard', body)
      .then(success)
      .catch(fail);
}

export { getBoardList, registBoard};