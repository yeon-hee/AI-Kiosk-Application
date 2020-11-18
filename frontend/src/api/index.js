var axios = require('axios');

function createInstance() {
  const instance = axios.create({
    headers:{
      "Content-Type": "application/json"
    }
  });
  return instance;
}

export { createInstance };
