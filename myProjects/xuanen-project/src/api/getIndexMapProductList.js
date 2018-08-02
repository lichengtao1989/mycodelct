import axios from 'axios';
import api from './api';
export default (url, data = {pageSize: 100, pageNum: 1}) => {
  return axios.get(api.product, {params: data}).then(res => {
    return Promise.resolve(res.data);
  });
}
