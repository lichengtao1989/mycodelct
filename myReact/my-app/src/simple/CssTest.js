import React, { Component,Fragment } from 'react';
// import logo from './logo.svg';
import { CSSTransition,TransitionGroup } from 'react-transition-group';
import '../App.css';

class CssTest extends Component {
  constructor(props) {
    super(props);
    this.state={
      show:true,
      list:[]
    }
    this.toggleHandel=this.toggleHandel.bind(this);
    this.handelAddItem=this.handelAddItem.bind(this);

  }
  render() {
    // let {test, content }=this.props;
    return (
 <Fragment>
      {/* <CSSTransition
      in={this.state.show}
      timeout={1000}
      classNames="fade"
      unmountOnExit
      onEntered={(el)=>{el.style.color='red';}}
      appear={true}
      >
      <div>hello</div>
      </CSSTransition> */}
      <TransitionGroup>
      {
        this.state.list.map((item,index)=>{
          return (
            <CSSTransition
            timeout={1000}
            classNames="fade"
            unmountOnExit
            onEntered={(el)=>{el.style.color='red';}}
            appear={true}
            key={index}
            >
            <div>{item}</div>
            </CSSTransition> 
          )
        })
      }
      </TransitionGroup>
      <button onClick={this.handelAddItem}>toggle</button>
      </Fragment>
    );
  }
  toggleHandel(){
    this.setState({
      show:this.state.show?false:true
    })
  }
  handelAddItem(){
    this.setState((prevState)=>{
      return {
        list:[...prevState.list,'item']
      }
    })
  }
}

export default CssTest;
