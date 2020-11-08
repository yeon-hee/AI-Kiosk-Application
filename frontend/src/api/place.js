import axios from "axios";

const API_URL = "http://k3a508.p.ssafy.io/web";

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

function editPlace(id, name, address, phone, success, fail) {
    const body = {
        id: id,
        name: name,
        address: address,
        phone: phone
    };

    axios.put(API_URL+'/place/update', body)
      .then(success)
      .catch(fail);
}

function getPlace(id, success, fail) {
    axios.get(API_URL+'/place/placeInfo', {
        params: {
            id: id
        }
    })
      .then(success)
      .catch(fail);
}

function getPlaceList(success, fail) {
    axios.get(API_URL+'/place/placeList')
      .then(success)
      .catch(fail);
}

function getPlaceByAuth(email, authority, success, fail) {
    axios.get(API_URL+'/place/placeByAuth', {
        params: {
            email: email,
            authority: authority
        }
    })
      .then(success)
      .catch(fail);
}

function deletePlace(id, success, fail) {
    axios.delete(API_URL+'/place/delete', {
        params: {
            id: id
        }
    })
      .then(success)
      .catch(fail);
}

export { addplace,getPlaceList,getPlace,editPlace,deletePlace,getPlaceByAuth };