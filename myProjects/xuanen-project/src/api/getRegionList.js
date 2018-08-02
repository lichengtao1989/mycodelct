import axios from 'axios';
import api from './api';
export default (url) => {
  return axios.get(api.GetRegionList).then(res => {
    return Promise.resolve(res.data);
  });
}
