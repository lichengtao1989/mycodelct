
import axios from 'axios'

function info (url,data){
   return axios
     .get(url, { params: data })
     .then(res => {
       return Promise.resolve(res.data);
     });
};

export default info;
