import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

import { MidiNumbers } from 'react-piano';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';


const intervals = [
{value : "12", label : '8p ' ,isFixed: true},
{value : "11", label : '7+ ' ,isFixed: true},
{value : "10", label : '7- ' ,isFixed: true},
{value : "9" , label : '6+ ' ,isFixed: true},
{value : "8" , label : '6- ' ,isFixed: true},
{value : "7" , label : '5p ' ,isFixed: true},
{value : "6" , label : 'tr ' ,isFixed: true},
{value : "5" , label : '4p ' ,isFixed: true},
{value : "4" , label : '3+ ' ,isFixed: true},
{value : "3" , label : '3- ' ,isFixed: true},
{value : "2" , label : '2+ ' ,isFixed: true},
{value : "1" , label : '2- ' ,isFixed: true},
];

function Label(props) {
  return <small className="mb-1 text-muted">{props.children}</small>;
}

class AutoblurSelect extends React.Component {
  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }

  onChange = (event) => {
    this.props.onChange(event);
    this.selectRef.current.blur();
  };

  render() {
    const { children, onChange, ...otherProps } = this.props;
    return (
      <select {...otherProps} onChange={this.onChange} ref={this.selectRef}>
      {children}
      </select>
      );
  }
}

class PianoConfig extends React.Component {

  state = {
    showInstrument : false,
  }

  intervalsChanged = (newIntervals) => {
    this.props.setConfig({
      intervals : newIntervals
    });
  }

  componentWillReceiveProps (newProps) {
    if( newProps.config !== this.props.config ) {
      this.props.repaint();
    }
  }

  // repaint = (userMin,userMax) => {
  //   let instrumentMin = this.props.minMaxNote[0];
  //   let instrumentMax = this.props.minMaxNote[1];
  //   let min = instrumentMin < userMin ? userMin :instrumentMin
  //   let max = instrumentMax > userMax ? userMax : instrumentMax
  //   // console.log('instrumentMax : ' + instrumentMax ) 
  //   // console.log('instrumentMin : ' + instrumentMin ) 


  //   let tasti = document.getElementsByClassName("ReactPiano__Keyboard")[0].getElementsByClassName("ReactPiano__Key");

  //   // for in the array of tasti
  //   for(let i = 0; i < tasti.length; i++){
  //     // if is a natural key
  //     if(tasti[i].classList.contains("ReactPiano__Key--natural")){

  //     // if is out of register 
  //     if(i< min-24||i>max-24){
  //       tasti[i].style.backgroundColor="rgb(216, 221, 232)";
  //      } else { // if is in the register 
  //       tasti[i].style.backgroundColor="white";
  //     }

  //   // if is an accidental key
  // } else if(tasti[i].classList.contains("ReactPiano__Key--accidental")){
  //       // if is out of register 
  //       if(i< min-24||i>max-24){
  //         tasti[i].style.backgroundColor="rgb(216, 221, 232)";
  //         tasti[i].style.borderColor="#555";
  //       } else { // if is in the register
  //         tasti[i].style.backgroundColor="#555";
  //       }
  //     }

  //   }
  // }  

  onChangeFirstNote = (event) => {

    this.props.setConfig({
      noteRange: {
        first: parseInt(event.target.value, 10),
        last: this.props.config.noteRange.last,
      },
    });

    this.props.repaint();
  };

  onChangeLastNote = (event) => {
    this.props.setConfig({
      noteRange: {
        first: this.props.config.noteRange.first,
        last: parseInt(event.target.value, 10),
      },
    });

    this.props.repaint();
  };

  onChangeOctaves = (event) => {
    this.props.setConfig({
      octaves: event.target.value
    });
  };

  onChangeDuration = (event) => {
    this.props.setConfig({
      duration: event.target.value
    });
  };


  onChangePauseTime = (event) => {
    this.props.setConfig({
      pauseTime: event.target.value
    });
  }

  onChangeInstrument = (event) => {
    this.props.setConfig({
      instrumentName: event.value,
      noteRange: {
        first: event.range['first'],
        last: event.range['last']
      }
    });
  };


  onChangeInstrumentSet = (event) => {  

    //console.log(event.length);

    this.props.setConfig({
      instrumentSet: (event.length>0)?  event.map(value => value['value']) : ["acoustic_grand_piano"]
    }) 
    this.props.repaint();
    // console.log(this.props.config.instrumentSet);
    // NOTIFY
    //this.repaint();  
  };

  showInstrument = (event) => {
    this.setState({
      showInstrument : !this.state.showInstrument
    });
  }

  showPitch = (event) => {
    this.setState({
      showPitch : !this.state.showPitch
    });
    this.props.setShow(
      !this.state.showPitch
      );
  }

  render() {
    var style_font_size = {
      fontSize: "200"
    };


    var divStyle = { padding : "5px"};

    const midiNumbersToNotes = MidiNumbers.NATURAL_MIDI_NUMBERS.reduce((obj, midiNumber) => {
      obj[midiNumber] = MidiNumbers.getAttributes(midiNumber).note;
      return obj;
    }, {});
    const { noteRange, instrumentName, duration, pauseTime, octaves } = this.props.config;

    return (
      <div>

   

      <div className="form-row" >

    {/*first Note*/}
    <div className="col-3">
    <Label>set register lowest pitch</Label>
    <AutoblurSelect
    className="form-control"
    onChange={this.onChangeFirstNote}
    value={noteRange.first} >
    {MidiNumbers.NATURAL_MIDI_NUMBERS.map((midiNumber) => (
      <option value={midiNumber} disabled={midiNumber >= noteRange.last-11 || midiNumber < 24} key={midiNumber}>
      {midiNumbersToNotes[midiNumber]}
      </option>
      ))}
    </AutoblurSelect>
    </div>

  {/*Last note*/}
  <div className="col-3">
  <Label>set register highest pitch</Label>
  <AutoblurSelect
  className="form-control"
  onChange={this.onChangeLastNote}
  value={noteRange.last}
  >
  {MidiNumbers.NATURAL_MIDI_NUMBERS.map((midiNumber) => (
    <option 
    value={midiNumber} 
    disabled={midiNumber <= noteRange.first+11 || midiNumber > 107} 
    key={midiNumber}>
    {midiNumbersToNotes[midiNumber]}
    </option>
    ))}
  </AutoblurSelect>
  </div>

{/* Duration */}
<div className="col-3">
<Label>set pitch duration units</Label>
<AutoblurSelect className="form-control" onChange={this.onChangeDuration} value={duration}>
{
  [1,2,3,4,5].map((i,j) => {
   return <option value={j+1}  key={j}>
   {i}
   </option>
 })
}
</AutoblurSelect>
</div>

{/*Time between two notes*/}
<div className="col-3">
<Label>set pause duration units</Label>
<AutoblurSelect
className="form-control" 
onChange={this.onChangePauseTime} 
value={pauseTime}>
{
  [0,1,2,3,4,5,6].map((i,j) => {
   return <option value={j+1}  key={j}>
   {i}
   </option>
 })
}
</AutoblurSelect>
</div>




</div>

<hr/>

<div className="form-row">

{/*Intervals*/}
<div className="col-8">
<Label>set intervals</Label>
<Select
onChange={this.intervalsChanged}
closeMenuOnSelect={false}
components={makeAnimated()}
defaultValue={intervals[5]}
isMulti
name="InstrumentSet"
options={intervals}
className="basic-multi-select"
classNamePrefix="select" />
</div>      


{/*Max distance between two pitches*/}
<div className="col-4">
<Label>set max distance between two pitches</Label>
<AutoblurSelect 
className="form-control" onChange={this.onChangeOctaves} value={octaves} 
>
{
  ["1 octave","2 octaves","3 octaves","4 octaves","5 octaves"].map((i,j) => { 
    // console.log(j+ "i am j")
    // console.log((this.props.config.noteRange.last - this.props.config.noteRange.first)/12+ "i am octaverange")
    if ((this.props.config.noteRange.last - this.props.config.noteRange.first)/12 > j+1 ){
     return <option value={j+1}  key={j} >
     {i}
     </option>
   }
 })
}
</AutoblurSelect>
</div>

</div>

<hr/>

{/*Instrument set*/}
<Label>set instruments</Label>

<Select
onChange={this.onChangeInstrumentSet}
closeMenuOnSelect={false}
components={makeAnimated()}
defaultValue={this.props.instrumentList[1]}
isMulti
name="InstrumentSet"
options={this.props.instrumentList}
className="basic-multi-select"
classNamePrefix="select"
/>

<hr/>

<div className="form-row" id="myCheckBox">
<div className="col-6">
<input type="checkbox" onChange={this.showPitch} />
<Label>{' '} show pitches on the keyboard {' '}</Label>
</div>
<div className="col-6">
<input type="checkbox" onChange={this.showInstrument} />
<Label>{' '} show instrument played {' '}</Label>
{ this.state.showInstrument ? <Label>{this.props.instrumentName}</Label> :  null}
</div>
</div>
</div>
);
  }
}

export default PianoConfig;
