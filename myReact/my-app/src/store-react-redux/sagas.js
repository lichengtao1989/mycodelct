// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { put,takeEvery } from 'redux-saga/effects';
import { GET_INIT_LIST } from '../store/actionTypes';
import {initListAction} from './actionCreators';
import axios from 'axios';
function* getInitList(){
  try{
    const res= yield axios.get('/v2/movie/search?q=%E6%88%98%E7%8B%BC&count=2');
    let data=res.data.subjects;
    data=['hello','dear','lee'];
    const action = initListAction(data);
    yield put(action);  
  }catch(e) {

  }
 
}
//generator 函数
function* mySage(){
  //监听 action 捕获action
  yield takeEvery(GET_INIT_LIST, getInitList);
  // yield takeLatest("USER_FETCH_REQUESTION",fetchUser)
}
export default mySage;