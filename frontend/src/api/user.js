import axios from "axios";

const API_URL = "http://localhost:8081";

function login(email, password, success, fail) {
    axios.get(API_URL+'/account/login', {
        params: {
            email: email,
            password: password
        }
      })
      .then(success)
      .catch(fail);
}

function addUser(email, name, phone, authority, photo, place, success, fail) {
    const body = {
        email: email,
        name: name,
        phone: phone,
        authority: authority,
        photo: photo,
        place: place
    };
  
    axios.post(API_URL+"/account/registAccount", body)
      .then(success)
      .catch(fail);
}

export { addUser, login };