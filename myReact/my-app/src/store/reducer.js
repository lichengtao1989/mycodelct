//管理数据
import { CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DEL_TODO_ITEM } from './actionTypes'
const defaultState = {
  inputVal: '',
  list: []
}
//纯函数，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
//reducer可以接受state，但是绝对不能修改state
export default (state=defaultState,action)=>{
  // console.log(state,action)
  if(action.type === CHANGE_INPUT_VALUE){
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputVal = action.value;
    return newState;
  }
  if(action.type === ADD_TODO_ITEM){
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputVal)
    newState.inputVal = '';
    return newState; //一定要return 
  }
  if(action.type === DEL_TODO_ITEM){
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index,1);
    return newState; 
  }
  return state;
}