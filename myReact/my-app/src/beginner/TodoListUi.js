// import React, { Component,Fragment } from 'react';
import React, { Fragment } from 'react';
import {Input,Button,List} from 'antd';
import 'antd/dist/antd.css'
//无状态组件 只有render函数  性能比较高，就是一个函数，普通状态组件是一个js中的类，有逻辑，有生命函数  适用于UI组件
const TodoListUi=(props)=>{
  return (
    <Fragment>
    <div style={{marginBottom:'15px'}}>
    <Input onChange={props.handleInputChange} placeholder="todo" value={props.inputVal} style={{width: '300px',marginRight:'15px'}}></Input>
     <Button type="primary" onClick={props.handleAdd}>提交</Button>
    </div>
     <List
     style={{width: '300px'}}
     bordered
     dataSource={props.list}
     renderItem={(item,index) => (<List.Item onClick={(index)=>{props.delItem(index)}}>{item}</List.Item>)}
     />
    </Fragment>
  )
}
// class TodoListUi extends Component {
//   render() {
//     return (
//       <Fragment>
//        <div style={{marginBottom:'15px'}}>
//        <Input onChange={this.props.handleInputChange} placeholder="todo" value={this.props.inputVal} style={{width: '300px',marginRight:'15px'}}></Input>
//         <Button type="primary" onClick={this.props.handleAdd}>提交</Button>
//        </div>
//         <List
//         style={{width: '300px'}}
//         bordered
//         dataSource={this.props.list}
//         renderItem={(item,index) => (<List.Item onClick={(index)=>{this.props.delItem(index)}}>{item}</List.Item>)}
//         />
//      </Fragment>
//     );
//   }
// }

export default TodoListUi;
