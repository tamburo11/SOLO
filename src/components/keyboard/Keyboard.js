import React from 'react';
import { Piano, MidiNumbers } from 'react-piano';
// import 'react-piano/dist/styles.css';
import classNames from 'classnames';
import DimensionsProvider from './DimensionsProvider';
import SoundfontProvider from './SoundfontProvider';
import PianoConfig from './PianoConfig';

import './Keyboard.css';
import './Keyboard_less.css'; 


const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const instrument_list_r= [
  "oboe", // Bb3 - G6
  "piccolo", // D5 - C8
  ] 
  var instrument_list = [
  { value: 'accordion', label: 'accordion', isFixed: true, range:                           { first: MidiNumbers.fromNote('f2'), last: MidiNumbers.fromNote('a7') } }, // F2 - A6
  { value: 'acoustic_grand_piano', label: 'grand piano', isFixed: true, range:              { first: MidiNumbers.fromNote('a0'), last: MidiNumbers.fromNote('c8') } }, // A0 - C8
  { value: 'acoustic_guitar_nylon', label: 'classical guitar', isFixed: true, range:        { first: MidiNumbers.fromNote('e2'), last: MidiNumbers.fromNote('b6') } }, // E2 - B6
  { value: 'acoustic_guitar_steel', label: 'acoustic guitar', isFixed: true, range:         { first: MidiNumbers.fromNote('e2'), last: MidiNumbers.fromNote('b6') } }, // E2 - B6
  { value: 'alto_sax', label: 'alto_sax', isFixed: true, range:                             { first: MidiNumbers.fromNote('c3#'), last: MidiNumbers.fromNote('g5') } }, // C#3 - G#5 
  { value: 'banjo', label: 'banjo', isFixed: true, range:                                   { first: MidiNumbers.fromNote('c3'), last: MidiNumbers.fromNote('a4') } }, // C3 - A4
  { value: 'baritone_sax', label: 'baritone sax', isFixed: true, range:                     { first: MidiNumbers.fromNote('c2#'), last: MidiNumbers.fromNote('g4') } }, // C#2 - G#4
  { value: 'bassoon', label: 'bassoon', isFixed: true, range:                               { first: MidiNumbers.fromNote('b1'), last: MidiNumbers.fromNote('e5') } },// Bb1 - Eb5 
  { value: 'celesta', label: 'celesta', isFixed: true, range:                               { first: MidiNumbers.fromNote('c3'), last: MidiNumbers.fromNote('b7') } }, // C3 - F8
  { value: 'cello', label: 'cello', isFixed: true, range:                                   { first: MidiNumbers.fromNote('c2'), last: MidiNumbers.fromNote('a5') } }, // C2 - A5   
  { value: 'church_organ', label: 'church organ', isFixed: true, range:                     { first: MidiNumbers.fromNote('c1'), last: MidiNumbers.fromNote('c7') } }, // C1 - C7
  { value: 'clarinet', label: 'clarinet', isFixed: true, range:                             { first: MidiNumbers.fromNote('d3'), last: MidiNumbers.fromNote('b6') } }, // D3 - Bb6
  { value: 'contrabass', label: 'contrabass', isFixed: true, range:                         { first: MidiNumbers.fromNote('e1'), last: MidiNumbers.fromNote('g4') } }, // E1 - G4
  { value: 'distortion_guitar', label: 'distortion guitar', isFixed: true, range:           { first: MidiNumbers.fromNote('e2'), last: MidiNumbers.fromNote('b6') } }, // E2 - B6
  { value: 'electric_guitar_clean', label: 'electric guitar', isFixed: true, range:         { first: MidiNumbers.fromNote('e2'), last: MidiNumbers.fromNote('b6') } }, // E2 - B6
  { value: 'electric_piano_1', label: 'electric piano ', isFixed: true, range:              { first: MidiNumbers.fromNote('a0'), last: MidiNumbers.fromNote('c8') } },
  { value: 'english_horn', label: 'english horn', isFixed: true, range:                     { first: MidiNumbers.fromNote('e3'), last: MidiNumbers.fromNote('b5') } }, // E3 - B5
  { value: 'flute', label: 'flute', isFixed: true, range:                                   { first: MidiNumbers.fromNote('b3'), last: MidiNumbers.fromNote('d7') } }, // B3 - D7
  { value: 'french_horn', label: 'horn', isFixed: true, range:                              { first: MidiNumbers.fromNote('b1'), last: MidiNumbers.fromNote('f5') } }, // B1 - F5
  { value: 'glockenspiel', label: 'glockenspiel', isFixed: true, range:                     { first: MidiNumbers.fromNote('f5'), last: MidiNumbers.fromNote('d8') } }, // F5 - D8
  { value: 'lead_1_square', label: 'lead 1 square', isFixed: true, range:                   { first: MidiNumbers.fromNote('c1'), last: MidiNumbers.fromNote('b7') } },
  { value: 'lead_2_sawtooth', label: 'lead 2 sawtooth', isFixed: true, range:               { first: MidiNumbers.fromNote('c1'), last: MidiNumbers.fromNote('b7') } },
  { value: 'marimba', label: 'marimba', isFixed: true, range:                               { first: MidiNumbers.fromNote('c2'), last: MidiNumbers.fromNote('c7') } }, // C2 - C7
  { value: 'oboe', label: 'oboe', isFixed: true, range:                                     { first: MidiNumbers.fromNote('b3'), last: MidiNumbers.fromNote('g6') } }, // Bb3 - G6
  { value: 'piccolo', label: 'piccolo', isFixed: true, range:                               { first: MidiNumbers.fromNote('d5'), last: MidiNumbers.fromNote('c8') } }, // D5 - C8
  { value: 'recorder', label: 'recorder', isFixed: true, range:                             { first: MidiNumbers.fromNote('f3'), last: MidiNumbers.fromNote('g6') } }, // F3 - G6
  { value: 'soprano_sax', label: 'soprano sax', isFixed: true, range:                       { first: MidiNumbers.fromNote('g3#'), last: MidiNumbers.fromNote('d6#') } }, // G#3 - D6#
  { value: 'tenor_sax', label: 'tenor sax', isFixed: true, range:                           { first: MidiNumbers.fromNote('g2#'), last: MidiNumbers.fromNote('d6#') } }, // G#2 - D#6
  { value: 'timpani', label: 'timpani', isFixed: true, range:                               { first: MidiNumbers.fromNote('b1'), last: MidiNumbers.fromNote('c4') } }, // B1 - C4
  { value: 'trombone', label: 'trombone', isFixed: true, range:                             { first: MidiNumbers.fromNote('e2'), last: MidiNumbers.fromNote('f5') } }, // E2 - F5
  { value: 'trumpet', label: 'trumpet', isFixed: true, range:                               { first: MidiNumbers.fromNote('f3#'), last: MidiNumbers.fromNote('c6') } }, // F#3 - C6
  { value: 'tuba', label: 'tuba', isFixed: true, range:                                     { first: MidiNumbers.fromNote('d1'), last: MidiNumbers.fromNote('g4') } }, // D1 - G4
  { value: 'tubular_bells', label: 'tubular bells', isFixed: true, range:                   { first: MidiNumbers.fromNote('f3'), last: MidiNumbers.fromNote('f5') } }, // F3 - F5
  { value: 'vibraphone', label: 'vibraphone', isFixed: true, range:                         { first: MidiNumbers.fromNote('f3'), last: MidiNumbers.fromNote('f6') } }, // F3 - F6
  { value: 'viola', label: 'viola', isFixed: true, range:                                   { first: MidiNumbers.fromNote('c3'), last: MidiNumbers.fromNote('a6') } }, // C3 - A6
  { value: 'violin', label: 'violin', isFixed: true, range:                                 { first: MidiNumbers.fromNote('g3'), last: MidiNumbers.fromNote('a7') } }, // G3 - A7
  { value: 'xylophone', label: 'xylophone', isFixed: true, range:                           { first: MidiNumbers.fromNote('f4'), last: MidiNumbers.fromNote('c8') } } // F4 - C8
  ]
  var mario = [
  [76], [73], [65],
  [76], [65], [40], [65], [76], [65], [40], [65], [72], [65], [76], [65], [40], [65], [79], [65], [40], [36], [67], [65], [40], [36], [72], [65], [40], [24], [67], [65], [40], [24], [64], [65], [40], [24], [69], [65], [40], [65], [71], [65], [40], [65], [70], [65], [69], [65], [40], [65], [67], [16], [76], [16], [79], [16], [81], [65], [40], [65], [77], [65], [79], [65], [40], [65], [76], [65], [40], [65], [72], [65], [74], [65], [71], [65], [40], [24], [48], [65], [40], [65], [79], [65], [78], [65], [77], [65], [75], [65], [60], [65], [76], [65], [53], [65], [68], [65], [69], [65], [72], [65], [60], [65], [69], [65], [72], [65], [74], [65], [48], [65], [40], [65], [79], [65], [78], [65], [77], [65], [75], [65], [55], [65], [76], [65], [40], [65], [84], [65], [40], [65], [84], [65], [84], [65], [55], [65], [40], [65], [48], [65], [40], [65], [79], [65], [78], [65], [77], [65], [75], [65], [60], [65], [76], [65], [53], [65], [68], [65], [69], [65], [72], [65], [60], [65], [69], [65], [72], [65], [74], [65], [48], [65], [40], [65], [75], [24], [40], [65], [74], [24], [40], [65], [72], [24], [40], [42], [55], [42], [55], [42], [40], [42], [48], [42], [72], [42], [72], [42], [40], [42], [72], [42], [40], [42], [72], [42], [74], [42], [40], [42], [76], [42], [72], [42], [40], [42], [69], [42], [67], [42], [40], [42], [43], [42], [40], [42], [72], [42], [72], [42], [40], [42], [72], [42], [40], [42], [72], [42], [74], [42], [76], [42], [55], [42], [40], [24], [48], [42], [40], [24], [43], [42], [40], [42], [72], [42], [72], [42], [40], [42], [72], [42], [40], [42], [72], [42], [74], [42], [40], [42], [76], [42], [72], [42], [40], [42], [69], [42], [67], [42], [40], [42], [43], [42], [40], [42], [76], [42], [76], [42], [40], [42], [76], [42], [40], [42], [72], [42], [76], [42], [40], [42], [79], [42], [40], [36], [67], [42], [40], [36], [76], [42], [72], [42], [40], [42], [67], [42], [55], [42], [40], [42], [68], [42], [40], [42], [69], [42], [77], [42], [53], [42], [77], [42], [69], [42], [60], [42], [53], [42], [40], [42], [71], [16], [81], [16], [81], [16], [81], [16], [79], [16], [77], [16], [76], [42], [72], [42], [55], [42], [69], [42], [67], [42], [60], [42], [55], [42], [40], [42], [76], [42], [72], [42], [40], [42], [67], [42], [55], [42], [40], [42], [68], [42], [40], [42], [69], [42], [77], [42], [53], [42], [77], [42], [69], [42], [60], [42], [53], [42], [40], [42], [71], [42], [77], [42], [40], [42], [77], [42], [77], [16], [76], [16], [74], [16], [72], [42], [64], [42], [55], [42], [64], [42], [60], [42], [40], [36], [72], [42], [40], [24], [67], [42], [40], [24], [64], [24], [69], [16], [71], [16], [69], [16], [68], [24], [70], [24], [68], [24], [67], [42], [65], [42], [67], [48]
  ];

  class Keyboard extends React.Component {
    state = {
      numberOfNotes : 8,
      songDone:false,
      showPitch:false,
      stopAllNotes: () => console.warn('stopAllNotes not yet loaded'),
      playNote: true,
      timeoutID: null,
      instruments: [],
      nextNote: [],
      activeNotesIndex: -1,
      isPlaying: false,
      config: {
        instrumentSet: ['acoustic_grand_piano'],
        octaves: 1,
        pauseTime: 0,
        duration: 1,
        intervals: [],
        instrumentName: 'acoustic_grand_piano',
        noteRange: {
          first: MidiNumbers.fromNote('c1'),
          last: MidiNumbers.fromNote('b7'),
        },
      },
    };

    constructor(props) {
      super(props);
      this.playbackIntervalFn = null;
    };

    repaint = () => {
      let instrumentMin = this.firstAndLastNote()[0];
      let instrumentMax = this.firstAndLastNote()[1];
      let min = instrumentMin < this.state.config.noteRange.first ? this.state.config.noteRange.first :instrumentMin
      let max = instrumentMax > this.state.config.noteRange.last ? this.state.config.noteRange.last : instrumentMax
      
      //let dup = {this.state.config};
      // console.log(dup)
      // dup.noteRange.first = min;
      // dup.noteRange.last = max;
      // this.setState({config: dup});


    // console.log('instrumentMax : ' + instrumentMax ) 
    // console.log('instrumentMin : ' + instrumentMin ) 


    let tasti = document.getElementsByClassName("ReactPiano__Keyboard")[0].getElementsByClassName("ReactPiano__Key");
    
    // for in the array of tasti
    for(let i = 0; i < tasti.length; i++){
      // if is a natural key
      if(tasti[i].classList.contains("ReactPiano__Key--natural")){

      // if is out of register 
      if(i< min-24||i>max-24){
        tasti[i].style.backgroundColor="rgb(216, 221, 232)";
       } else { // if is in the register 
        tasti[i].style.backgroundColor="white";
      }

    // if is an accidental key
  } else if(tasti[i].classList.contains("ReactPiano__Key--accidental")){
        // if is out of register 
        if(i< min-24||i>max-24){
          tasti[i].style.backgroundColor="rgb(216, 221, 232)";
          tasti[i].style.borderColor="#555";
        } else { // if is in the register
          tasti[i].style.backgroundColor="#555";
        }
      }

    }
  }  

  firstAndLastNote() {
    //if list is empty we use piano
    if (this.state.config.instrumentSet.length == 0) {
      return [MidiNumbers.fromNote('c1'), MidiNumbers.fromNote('b7')]
    }
    let list = instrument_list.filter(value => -1 !== this.state.config.instrumentSet.indexOf(value['value']));

    let min = list.reduce((min, value) => value['range']['first'] < min ? value['range']['first'] : min, list[0]['range']['first']);
    // console.log("min : ", min);

    let max = list.reduce((max, value) => value['range']['last'] > max ? value['range']['last'] : max, list[0]['range']['last']);
    // console.log("max : ", max);

    return [min, max];
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  getInstrumentFromNote(note) {
    let instruments = this.shuffle(this.state.config.instrumentSet);

    for (let instrument of instruments) {
      var instrument_data = instrument_list.filter(obj => {
        return obj.value === instrument
      })
      if (instrument_data[0].range.last >= note && instrument_data[0].range.first <= note) {
        //  console.log("instrument_data",instrument_data);
        //  console.log(instrument_data[0].value)
        // ALWAYS RETURN PIANOOOO
        return instrument_data[0].value
      }
    }

    return instrument_list[1].value;
  }

  generateSong() {
    const newsong = [];
    const instruments = [];

    // //  extract the intervals 
    var keys = Object.keys(this.state.config.intervals)

    // //  extract the note range from instrumentSet
    let range = this.firstAndLastNote();

    // // extract octaves
    let octave = Math.floor(Math.random() * this.state.config.octaves) ;
    let octaveJump = octave*12
    console.log("octaveJump ",octaveJump)


    // // select a random note between the first and the last
    let startingNote = Math.floor(Math.random() * (range[1] - range[0]) + range[0])
    newsong.push([startingNote]);

    // // select an instument to play the note
    instruments.push(this.getInstrumentFromNote(startingNote));

    for (let i = 0; i < this.state.numberOfNotes; i++) {
      // jumping value
      let interval_idx = Math.floor(Math.random() * this.state.config.intervals.length);
      let randomJump = 7;
      if (this.state.config.intervals.length > 0) {
        randomJump = parseInt(this.state.config.intervals[interval_idx].value);
      }

      // randomly add intervarls 
      if (Math.random() > 0.5) {
        if (startingNote - randomJump < range[0]) {
          startingNote += randomJump
          if (startingNote + octaveJump < range[1] ){
            console.log('alzato di ' + octaveJump)
            startingNote += octaveJump
          }
          // console.log("startingNote += randomJump")
        } else {
          startingNote -= randomJump
          if (startingNote - octaveJump > range[0] ){
            console.log('abbassato di ' + octaveJump)
            startingNote -= octaveJump
          }
          // console.log("startingNote -= randomJump")
        }
      }
      else {
        if (startingNote + randomJump > range[1]) {
          startingNote -= randomJump
          if (startingNote - octaveJump > range[0] ){
            console.log('abbassato di ' + octaveJump)
            startingNote -= octaveJump
          }
          // console.log("startingNote -= randomJump")
        } else {
          startingNote += randomJump
          if (startingNote + octaveJump < range[1] ){
            console.log('alzato di ' + octaveJump)
            startingNote += octaveJump
          }
          // console.log("startingNote += randomJump")
        }
      }

      // add octaves


      newsong.push([startingNote]);
      instruments.push(this.getInstrumentFromNote(startingNote));
    }
    // console.log('instruments : ', instruments)
    this.setState({
      instruments: instruments
    })

    // console.log(instruments);
    // console.log(newsong);

    this.props.setSong(newsong);
    this.setState({ activeNotesIndex: -1, nextNote: [] });
  };

 //  static getDerivedStateFromProps(nextProps, prevState){
 //   if(nextProps.someValue!==prevState.someValue){
 //     console.log('aggiornato')
 //   }
 //   else return null;
 // }


 restart() {
  this.setPlaying(true, false);
  this.setState({
    playNote : true,
    songDone: false
  })
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//    funzione abbastanza astrusa e complessa, potrebbe essere rimodellata in una versione futura       // 
//////////////////////////////////////////////////////////////////////////////////////////////////////////

setPlaying = (value, generate = true) => {
  if (value) {
        //clearTimeout(this.state.timeoutID);
        if (generate) {
          this.generateSong();
        }
        // if set playing then setTimeout with callback
        const timeoutCallback = (playNote, nextCallback) => {
          let duration;
          if (playNote) {
                // console.log("note",(new Date()).getSeconds())
                const index = (this.state.activeNotesIndex + 1);

                // label onver current interval
                let lables = document.getElementById("solutions").getElementsByClassName("current");
                for (var i = 0; i < lables.length; i++) {
                  lables[i].style.border = "thick solid #FFFFFF";
                }
                if (index < this.state.numberOfNotes+1 && index > 0){
                  lables[index -1 ].style.border = "thick solid #3877e1";
                }

                if (index < this.props.song.length) {
                    // set state to play note
                    this.setState({
                      activeNotesIndex: index,
                      nextNote: this.props.song[index],
                    })
                    // calculate duration
                    duration = this.state.config.duration * 1000
                  } else {
                    // if (this.state.isPlaying) {
                    //   console.log('cambio di stato')
                    this.props.setPressedPlay(false);
                    // }
                    this.setPlaying(false)
                    this.setState({
                      playNote : false,
                      songDone: true
                    })
                  }
                } else {
                // set state to play pause
                this.setState({
                  nextNote: [-1],
                })
                // calculate duration
                duration = this.state.config.pauseTime * 1000
              }
              if (!this.state.songDone){
                this.setState({
                 timeoutID: setTimeout(() => nextCallback(!playNote, nextCallback), duration)
               });
              } else {
                clearTimeout(this.state.timeoutID);
                this.setState({
                  activeNotesIndex: -1,
                  //isPlaying: false,
                });
              }
            }
            this.setState({
              timeoutID: setTimeout(() => timeoutCallback(true, timeoutCallback), 0)
            });
          } else {
        // at click on start
        clearTimeout(this.state.timeoutID);
        this.state.stopAllNotes();
        this.setState({
          activeNotesIndex: -1,
        });
      }
    // at click on stop
    this.setState({
      isPlaying: value,
      playNote: true
    });
  };

  render() {
    //console.log(this.props.song)
    return (
      <div className={this.state.showPitch ? "show" : ""}>
      <SoundfontProvider
      audioContext={audioContext}
      instrumentName={(this.state.config.instrumentSet.length == 0) ? "acoustic_grand_piano" : this.state.instruments[this.state.activeNotesIndex]}
      hostname={soundfontHostname}
      onLoad={({ stopAllNotes }) => this.setState({ stopAllNotes })}
      render={({ isLoading, playNote, stopNote }) => (
        <div>
        <DimensionsProvider >
        {({ containerWidth }) => (
          <Piano
          activeNotes={
            this.state.isPlaying ? this.state.nextNote : []
          }
          noteRange={{
            first: MidiNumbers.fromNote('c1'),
            last: MidiNumbers.fromNote('b7'),
          }}
          playNote={playNote}
          stopNote={stopNote}
          disabled={isLoading}
          width={containerWidth}
          />
          )}
        </DimensionsProvider>
        <PianoConfig
        repaint={this.repaint}
        config={this.state.config}
        setConfig={(config) => {
          this.setState({
            config: Object.assign({}, this.state.config, config),
          });
        }}
        setShow={(showPitch) => 
          this.setState({
            showPitch 
          })}
          showPitch={this.state.showPitch}
          pauseTime={this.state.config.pauseTime}
          instrumentList={instrument_list}
          instrumentSet={this.state.config.instrumentSet}
          instrumentName={(this.state.config.instrumentSet.length == 0) ? "acoustic_grand_piano" : this.state.instruments[this.state.activeNotesIndex]}
          song={this.props.song}
          activeNotesIndex={this.state.activeNotesIndex}
          duration={this.state.config.duration}
          />
          <br /> 

          <div className="form-row">

          <div className="col-6">
          <button 
          style={{ height: '50px ' }}
          className={classNames('btn-block', {
            'btn-success': !this.state.isPlaying,
            'btn-danger': this.state.isPlaying,
          })}
          onClick={() => {
            if (!this.state.isPlaying) {
              console.log('cambio di stato')
              this.props.setPressedPlay(true);
            } else {
              this.props.setPressedPlay(false);
            }
            
            this.setState({songDone:false});
            this.setPlaying(!this.state.isPlaying)
          }
        }
        >
        {this.state.isPlaying ? 'stop' : 'start'}
        </button>
        </div>

        <div className="col-6">
        <button
        style={{ height: '50px ' }}
        className={classNames('btn-block', {
          'btn-success': !this.state.isPlaying,
          'btn-secondary': this.state.isPlaying,
        })}
        onClick={() => this.restart()}
        disabled={this.state.isPlaying}
        >
        {'restart'}
        </button>
        </div>

        </div>

        </div>
        )}
      />
      </div>
      );

  };

}

export default Keyboard;

