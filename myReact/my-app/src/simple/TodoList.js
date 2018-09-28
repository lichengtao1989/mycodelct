import React, { Component,Fragment } from 'react';
import TodoItem from './TodoItem';
import CssTest from './CssTest';
// import './App.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    console.log(this)
    this.state = {
      inputValue: '',
      list: []
    };
    this.changeHandle= this.changeHandle.bind(this);
  }
  render() {
    return (
      <Fragment>
      <div className="App">
        {/* todolist */}
        <label htmlFor="insetarea">输入内容</label>
        <input id="insetarea" value={this.state.inputValue} onChange={this.changeHandle} />
        <button onClick={this.clickHandle.bind(this)}>提交</button>
        <ul>
          {this.getTodoItem()}
        </ul>

      </div>
      <CssTest />
      </Fragment>
    );
  }
  getTodoItem(){
    return this.state.list.map((item, index) => {
      return (
      <TodoItem  key={index} content={item} index={index} deleteItem={this.deleteHandle.bind(this)}/>
      // <TodoItem test={'dd'} key={index} content={item} index={index} deleteItem={this.deleteHandle.bind(this)}/>

      );
    })
  }
  changeHandle(e) {
    // this.setState({
    //   inputValue: e.target.value
    // });
    const value=e.target.value;
    this.setState(()=>({
      inputValue: value
    }));
  }
  clickHandle() {
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // });
    this.setState((preState)=>({
      list:[...preState.list,preState.inputValue],
      inputValue:''
    }));
  }
  deleteHandle(idx) {
    // let list = [...this.state.list];
    // list.splice(idx,1);
    // this.setState({ list: list });
    this.setState((preState)=>{
      const list=[...preState.list];
      list.splice(idx,1);
      return {list}
    })
  }
}

export default TodoList;
