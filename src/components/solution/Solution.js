import React from 'react';
import NoteGuess from './NoteGuess/NoteGuess';
import classNames from 'classnames';
import './Solution.css';


var distances = [2];

class Solution extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeComponent: 0
    }
  }

  handleClick = (event) => {
    if (parseInt(event.path[0].id) < 9 && parseInt(event.path[0].id) >= 0){
      this.setState({
          activeComponent : parseInt(event.path[0].id)
        });
    }
    
  }

  handleKeyPress = (event) => {
    if (event.key == 'ArrowLeft') {
      if (this.state.activeComponent > 0){
        this.setState({
          activeComponent : this.state.activeComponent - 1
        });
      }
    }
    else if (event.key == 'ArrowRight') {
      if (this.state.activeComponent < this.props.song.length-1){
        this.setState({
          activeComponent : this.state.activeComponent + 1
        });
      }
    };
  } 

  componentDidMount(){
    window.addEventListener("keydown", this.handleKeyPress);
    window.addEventListener("click", this.handleClick);
  }


  componentWillUnmount(){
    window.removeEventListener("keydown", this.handleKeyPress);
    window.removeEventListener("click", this.handleClick);
  }

  arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

  render() {
    var notes = [];
    this.props.song.map((item) => {
      notes.push(item[0]);
    });
    var dist = [];
    for (var i = 0; i < notes.length - 1; i++) {
      if ((-notes[i]+notes[i+1])%12==0) {
        if (-notes[i]+notes[i+1]>0){
          dist.push(12)
        } else {
          dist.push(-12)
        }
        
      } else {
        dist.push((-notes[i]+notes[i+1])%12)
      }
    }
    console.log(dist)
    if (!this.arraysEqual(distances,dist)) {
      distances = dist;
      console.log(distances);
    }    

    
    return (
      
      <form id = "solutions" className = "divDisplay">
        {
          dist.map((term,index) => {
            return <NoteGuess 
            id={index}
            key={index}
            selected = { this.state.activeComponent === index ?  1 : 0}
            answer = {term} 
            isPlayng = {this.props.isPlayng}
            />
          })
        }
        
      </form>
      );
  }
}

export default Solution;