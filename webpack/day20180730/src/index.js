import axios from 'axios';
import '../static/style/test.scss';
import {
  a
} from './test.js';

axios.get('/SysCorp/GetCorpInfo', {
    params: {
      // ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
console.log(a);