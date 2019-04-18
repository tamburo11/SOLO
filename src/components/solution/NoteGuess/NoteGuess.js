import React from 'react';
import './NoteGuess.css';
import Select from 'react-select';

const options = [

{ value: '12', label: '8p↑' },
{ value: '11', label: '7+↑' },
{ value: '10', label: '7-↑' },
{ value: '9', label: '6+↑'  },
{ value: '8', label: '6-↑'  },
{ value: '7', label: '5p↑'  },
{ value: '6', label: 'tr↑'  },
{ value: '5', label: '4p↑'  },
{ value: '4', label: '3+↑'  },
{ value: '3', label: '3-↑'  },
{ value: '2', label: '2+↑'  },
{ value: '1', label: '2-↑'  },

{ value: '0', label: ' '  },

{ value: '-1', label: '2-↓' },
{ value: '-2', label: '2+↓' },
{ value: '-3', label: '3-↓' },
{ value: '-4', label: '3+↓' },
{ value: '-5', label: '4p↓' },
{ value: '-6', label: 'tr↓' },
{ value: '-7', label: '5p↓' },
{ value: '-8', label: '6-↓' },
{ value: '-9', label: '6+↓' },
{ value: '-10', label: '7-↓'},
{ value: '-11', label: '7+↓'},
{ value: '-12', label: '8p↓'},
];

class NoteGuess extends React.Component {

  constructor(props){
    super(props)
    this.select = React.createRef();
  }

  state = {
    selectedOption: null,
    classNames : `mySelect form-control natural`
  }

  handleChange = (event) => {
    //console.log("changed in :",  event.target.value)
    this.check(event.target.value);
    this.setState({ selectedOption :  event.target.value });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.answer !== this.props.answer) {
  //     this.setState({ classNames : `mySelect form-control natural ` });
  //   }
  // }

  check(toCompare){   
    //console.log(`real answer `,this.props.answer);
    //console.log(`user answer `,this.state.selectedOption);
    // console.log( this.props.answer == toCompare);
    // (this.props.answer == toCompare)? this.setState({ classNames : ` mySelect form-control natural true `}):this.setState({ classNames : `mySelect form-control natural false `}) ;

    if (this.props.answer == toCompare){
     // console.log('entrato true');
     this.setState({ classNames : `mySelect form-control true`})
   } else {
     // console.log('entrato false');
     this.setState({ classNames : `mySelect form-control false`}) ;
   }
 }

 componentWillReceiveProps (newProps) {
  if( newProps.isPlayng !== this.props.isPlayng ) {
    if (newProps.isPlayng){
      this.setState({ classNames : `mySelect form-control natural`}) ;
      document.getElementById("solutions").reset();
    }
  }
}

componentDidUpdate(){
  if (this.props.selected) {
    this.select.focus();
  }
}

render() {

                // 
            // let divs = document.getElementById("solutions").getElementsByTagName("select");

            // for (var i = 0; i < divs.length; i++) {
            //   divs[i].className = "form-control natural mySelect"
            // }
            var divStyle = {
              float : 'left',
            };

    //  console.log('renderizzato')



    return (
      <div >
      <div className="current" id = {this.props.id}>
      </div>
      <select 
      id = {this.props.id}
      ref = {this.props.id}
      style={divStyle} 
      className={this.state.classNames}
      defaultValue={options[12].value}
      onChange={this.handleChange} 
      ref={(selected) => { this.select = selected; }}
      >
      {
        options.map((i,v) => {
          if (v != 12){
           return <option  value={i.value}  key={i.value} >
           {i.label}
           </option>
         } else {
           return <option value={i.value}  key={i.value} disabled >
           {i.label}
           </option>
         }
       })
      }
      </select>
      </div>
      );
  }
}

export default NoteGuess;