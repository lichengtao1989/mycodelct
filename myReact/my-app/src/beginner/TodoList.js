import React, { Component } from 'react';
// import {Input,Button,List} from 'antd';
import TodoListUi from './TodoListUi';
// import axios from 'axios';
import store from '../store/index';
import { getInputChangeAction,doAddHandle,doDelHandle,getInitList } from '../store/actionCreators';//getTodoList  initListAction
import 'antd/dist/antd.css'

class TodoList extends Component {
  constructor(props) {
    super(props);
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
    const action=getInitList();
    store.dispatch(action);
    //store.dispatch 发送一个action到reducer


    //redux-thunk
    // const action=getTodoList();//redux-thunk 业务解耦
    // store.dispatch(action);//如果action是个fnc 会自动传dispatch

    //常规
    // axios.get('/v2/movie/search?q=%E6%88%98%E7%8B%BC&count=2').then((res)=>{
    //   console.log(res)
    //   let data=res.data.subjects;
    //   data=['hello','dear','lee']
    //   const action = initListAction(data);
    //   store.dispatch(action);
    // })
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
