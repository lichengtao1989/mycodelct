import { CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DEL_TODO_ITEM,INIT_LIST_ACTION,GET_INIT_LIST } from '../store/actionTypes';
import axios from 'axios';
export const getInputChangeAction =(value)=>({
  type: CHANGE_INPUT_VALUE,
  value
});
export const doAddHandle =()=>({
  type: ADD_TODO_ITEM
});
export const doDelHandle =(index)=>({
  type: DEL_TODO_ITEM,
  index
});
export const initListAction =(data)=>({
  type: INIT_LIST_ACTION,
  data
})
export const getInitList =(data)=>({
  type: GET_INIT_LIST,
  data
})
export const getTodoList =()=>{
  return (dispatch)=>{
      axios.get('/v2/movie/search?q=%E6%88%98%E7%8B%BC&count=2').then((res)=>{
      let data=res.data.subjects;
      data=['hello','dear','lee'];
      const action = initListAction(data);
      dispatch(action);
    })
  }
}