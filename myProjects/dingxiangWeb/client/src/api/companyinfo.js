
import axios from 'axios'

function companyInfo (url,data){
   return axios
     .get(url, { params: data })
     .then(res => {
       return Promise.resolve(res.data);
     });
};

export default companyInfo;