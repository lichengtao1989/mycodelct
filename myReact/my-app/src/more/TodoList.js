import React from 'react';
// import store from '../store-react-redux/index';
import {connect} from 'react-redux';


const TodoList = (props) =>{

  const {changeHandle,list,inputValue,handleDelete,handleClick} = props;
    return (
     <div>
      <div>
        <input value={inputValue} onChange={changeHandle}/>
        <button onClick={handleClick}>提交</button>
      </div>
      <ul>
       {
         list.map((item,index)=>{
           return  <li onClick={()=>{handleDelete(index)}} key={index}>{item}</li>
         })
       }
      </ul>
     </div>
    );
}
const mapStateToProps = (state) =>{
  return {
      inputValue: state.inputValue,
      list:state.list
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    handleDelete(index){
      const action={
        type: 'delete_item',
        value: index
      };
      dispatch(action);
    },
    changeHandle(e){
      const action={
        type: 'change_input_value',
        value: e.target.value
      };
      dispatch(action);
    },
    handleClick(){
      const action={
        type: 'add_item'
      }
      dispatch(action);
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoList);
