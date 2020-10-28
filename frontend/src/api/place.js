import axios from "axios";

const API_URL = "http://localhost:8081";

function addplace(name, address, phone, success, fail) {
    const body = {
        name: name,
            address: address,
            phone: phone
    };

    axios.post(API_URL+'/place/registPlace', body)
      .then(success)
      .catch(fail);
}
  
export { addplace };