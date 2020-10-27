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

function signup(email, name, password, success, fail) {
    const user = {
      email: email,
      name: name,
      password: password
    };
  
    instance
      .post("/account/users", JSON.stringify(user))
      .then(success)
      .catch(fail);
}
  
export { signup, login };