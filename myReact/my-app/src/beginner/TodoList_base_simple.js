import React, { Component,Fragment } from 'react';
import {Input,Button,List} from 'antd';
import store from '../store/index';
import { CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DEL_TODO_ITEM } from '../store/actionTypes'
import 'antd/dist/antd.css'

class TodoList extends Component {
  constructor(props) {
    super(props);
    // console.log(this)
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    // this.delItem = this.delItem.bind(this);
    store.subscribe(this.handleChange);//监听数据变化，数据更新，页面更新  
  }
  render() {
    return (
      <Fragment>
       <div style={{marginBottom:'15px'}}>
       <Input onChange={this.handleInputChange} placeholder="todo" value={this.state.inputVal} style={{width: '300px',marginRight:'15px'}}></Input>
        <Button type="primary" onClick={this.handleAdd}>提交</Button>
       </div>
        <List
        style={{width: '300px'}}
        bordered
        dataSource={this.state.list}
        renderItem={(item,index) => (<List.Item onClick={this.delItem.bind(this,index)}>{item}</List.Item>)}
        />
      </Fragment>
    );
  }
  delItem(index){
    // console.log(index)
    const action = {
      type: DEL_TODO_ITEM,
      value: index
    }
    store.dispatch(action)
  }
  handleAdd(){
    const action={
      type: ADD_TODO_ITEM
    }
    store.dispatch(action)
  }
  handleInputChange(e){
    const action={
      type: CHANGE_INPUT_VALUE,
      value: e.target.value
    }
    store.dispatch(action)
  }
  handleChange(){
    this.setState(store.getState())
  }
 
}

export default TodoList;
