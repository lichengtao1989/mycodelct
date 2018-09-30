//管理数据
// import { CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DEL_TODO_ITEM,INIT_LIST_ACTION} from './actionTypes'
const defaultState = {
  inputValue: '',
  list: []
}
//纯函数，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用
//reducer可以接受state，但是绝对不能修改state
export default (state=defaultState,action)=>{

  if(action.type === 'change_input_value'){
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }
  if(action.type === 'add_item'){
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = '';
    return newState;
  }
  if(action.type === 'delete_item'){
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.value,1);
    return newState;
  }
 
  return state;
}