import { CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DEL_TODO_ITEM } from '../store/actionTypes'
export const getInputChangeAction=(value)=>({
  type: CHANGE_INPUT_VALUE,
  value
});
export const doAddHandle=()=>({
  type: ADD_TODO_ITEM
});
export const doDelHandle=(index)=>({
  type: DEL_TODO_ITEM,
  index
});