import axios from 'axios';
import api from './api';
export default (url) => {
  return axios.get(api.GetCropList).then(res => {
    return Promise.resolve(res.data);
  });
}
