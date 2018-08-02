import axios from 'axios'
function uploadPic(url, data) {
  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data);
  });
}

export default uploadPic;
