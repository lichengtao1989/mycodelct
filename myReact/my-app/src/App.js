import React, { Component } from 'react';
// import logo from './logo.svg';
import TodoItem from './simple/TodoItem';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: [111, 222]
    };
  }
  render() {
    return (
      <div className="App">
        {/* todolist */}
        <label htmlFor="insetarea">输入内容</label>
        <input id="insetarea" value={this.state.inputValue} onChange={this.changeHandle.bind(this)} />
        <button onClick={this.clickHandle.bind(this)}>提交</button>
        <ul>
          {this.state.list.map((item, index) => {
            return (
              <li key={index} onClick={this.deleteHandle.bind(this, index)} dangerouslySetInnerHTML={{ __html: item }}>
                {/* {item} */}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  changeHandle(e) {
    this.setState({
      inputValue: e.target.value
    });
  }
  clickHandle() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    });
  }
  deleteHandle(idx) {
    let list = [...this.state.list];
    list.splice(idx);
    console.log(list);
    this.setState({ list: list });
  }
}

export default App;
