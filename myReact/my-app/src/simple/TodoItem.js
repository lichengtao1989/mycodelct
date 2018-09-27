import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
import PropTypes from 'prop-types';
class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.deleteItem=this.deleteItem.bind(this);
  }
  render() {
    let {test, content }=this.props;
    return (
 
     <div onClick={this.deleteItem}>
      {test} - {content}
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
  deleteItem(idx) {
    // console.log(this.props.index);
    this.props.deleteItem(this.props.index);//调用父组件的方法的写法 react 的父子组件通讯都是通过props
  }

}
TodoItem.propTypes={
  test:PropTypes.string.isRequired,
  content:PropTypes.string.isRequired,
  // content:PropTypes.arrayOf(PropTypes.number),
  // optionalUnion: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  //   PropTypes.instanceOf(Message)
  // ]),
  deleteItem:PropTypes.func,
  index:PropTypes.number
}
TodoItem.defaultProps={
  test:'hello world'
}
export default TodoItem;
