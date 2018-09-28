import React, { Component } from 'react';
// import {Input,Button,List} from 'antd';
import TodoListUi from './TodoListUi';
import axios from 'axios';
import store from '../store/index';
import { getInputChangeAction,doAddHandle,doDelHandle } from '../store/actionCreators';
// import { CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DEL_TODO_ITEM } from '../store/actionTypes';

import 'antd/dist/antd.css'

class TodoList extends Component {
  constructor(props) {
    super(props);
    // console.log(this)
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.delItem = this.delItem.bind(this);
    store.subscribe(this.handleChange);//监听数据变化，数据更新，页面更新  
  }
  render() {
    return (
     <TodoListUi 
       inputVal={this.state.inputVal}
       handleInputChange={this.handleInputChange}
       handleAdd={this.handleAdd}
       list={this.state.list}
       delItem={this.delItem}
        />
    );
  }
  componentDidMount(){
    axios.get('/list.json').then((res)=>{
      console.log(res)
    })
  }
  handleChange(){
    this.setState(store.getState())
  }
  
  delItem(index){
    // console.log(index)
    const action = doDelHandle(index);
    store.dispatch(action)
  }
  handleAdd(){
    const action = doAddHandle();
    store.dispatch(action)
  }
  handleInputChange(e){
    // const action={
    //   type: CHANGE_INPUT_VALUE,
    //   value: e.target.value
    // }
    const action = getInputChangeAction(e.target.value);
    store.dispatch(action)
  }
  
 
}

export default TodoList;
